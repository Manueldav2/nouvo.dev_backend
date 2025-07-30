from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
import logging
from functools import wraps
import time
import traceback

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Required environment variables
REQUIRED_ENV_VARS = ['OPENAI_API_KEY', 'FRONTEND_URL']
missing_vars = [var for var in REQUIRED_ENV_VARS if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")

# Get allowed origins from environment
DEFAULT_ORIGINS = 'https://nouvo.dev,https://nouvo-dev.web.app,https://nouvo-ai-95cf2190cd12.herokuapp.com'
ALLOWED_ORIGINS = os.getenv('FRONTEND_URL', DEFAULT_ORIGINS).split(',')
logger.info(f"Allowed origins: {ALLOWED_ORIGINS}")

app = Flask(__name__)
CORS(app, 
     resources={r"/*": {
         "origins": ALLOWED_ORIGINS,
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization", "Accept"],
         "expose_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True,
         "max_age": 3600,
         "credentials": True
     }})

# Configure OpenAI with error handling
try:
    openai.api_key = os.getenv('OPENAI_API_KEY')
    if not openai.api_key:
        raise ValueError("OPENAI_API_KEY environment variable is not set")
    # Validate API key format
    if not openai.api_key.startswith('sk-') or len(openai.api_key) < 40:
        raise ValueError("OPENAI_API_KEY appears to be invalid")
except Exception as e:
    logger.critical(f"Failed to configure OpenAI: {str(e)}")
    raise

def retry_on_failure(max_retries=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                    if attempt < max_retries - 1:
                        time.sleep(delay)
            logger.error(f"All {max_retries} attempts failed. Last error: {str(last_error)}")
            raise last_error
        return wrapper
    return decorator

def validate_input(data):
    try:
        if not isinstance(data, dict):
            logger.warning(f"Invalid request format: {type(data)}")
            return False, "Invalid request format"
        
        user_input = data.get('userInput')
        if not user_input:
            logger.warning("Missing userInput in request")
            return False, "User input is required"
        
        if not isinstance(user_input, str):
            logger.warning(f"Invalid userInput type: {type(user_input)}")
            return False, "User input must be a string"
        
        stripped_input = user_input.strip()
        if len(stripped_input) < 10:
            logger.warning(f"Input too short: {len(stripped_input)} characters")
            return False, "Please provide more detailed input (minimum 10 characters)"
        
        return True, stripped_input
    except Exception as e:
        logger.error(f"Error in validate_input: {str(e)}")
        return False, "Error validating input"

@app.route('/', methods=['GET', 'POST', 'OPTIONS'])
def root():
    if request.method == 'OPTIONS':
        # Explicit OPTIONS handling for root route
        response = jsonify({'status': 'ok'})
        response.status_code = 200
        return response
    if request.method == 'POST':
        return redirect('/api/generate', code=307)
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        # Explicit OPTIONS handling with proper response
        response = jsonify({'status': 'ok'})
        response.status_code = 200
        return response

    try:
        logger.info("Received generate request")
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        is_valid, result = validate_input(data)
        if not is_valid:
            logger.warning(f"Invalid input: {result}")
            return jsonify({'error': result}), 400

        user_input = result
        logger.info(f"Processing input: {user_input[:50]}...")

        @retry_on_failure(max_retries=3, delay=1)
        def get_openai_response():
            try:
                logger.info("Attempting OpenAI API call")
                if not openai.api_key:
                    logger.error("OpenAI API key is not configured")
                    raise Exception("OpenAI API key is not configured")
                
                # Log the API key status (first few characters only)
                api_key_preview = openai.api_key[:4] + "..." if openai.api_key else "None"
                logger.info(f"Using OpenAI API key: {api_key_preview}")
                
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {
                            "role": "system",
                            "content": "You are a helpful assistant representing Nouvo, a professional web development company. When providing website suggestions, frame them as if Nouvo has already built similar solutions. Include specific features, design elements, and user engagement strategies that Nouvo has successfully implemented. Always mention that these are solutions Nouvo has experience with and can build for the client."
                        },
                        {
                            "role": "user",
                            "content": user_input
                        }
                    ],
                    temperature=0.7,
                    max_tokens=500
                )
                logger.info("OpenAI API call successful")
                return response
            except openai.error.AuthenticationError as e:
                logger.error(f"OpenAI Authentication Error: {str(e)}")
                raise Exception("OpenAI API key is invalid or expired")
            except openai.error.RateLimitError as e:
                logger.error(f"OpenAI Rate Limit Error: {str(e)}")
                raise Exception("OpenAI API rate limit exceeded")
            except openai.error.APIError as e:
                logger.error(f"OpenAI API Error: {str(e)}")
                raise Exception("OpenAI API is currently experiencing issues")
            except Exception as e:
                logger.error(f"OpenAI API call failed: {str(e)}")
                logger.error(f"Traceback: {traceback.format_exc()}")
                raise

        try:
            response = get_openai_response()
            logger.info("Successfully received OpenAI response")
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            error_message = str(e)
            if "API key" in error_message:
                return jsonify({
                    'error': 'Service configuration error. Please contact support.',
                    'details': 'API key issue' if app.debug else None
                }), 503
            elif "rate limit" in error_message.lower():
                return jsonify({
                    'error': 'Service is busy. Please try again in a few minutes.',
                    'details': 'Rate limit exceeded' if app.debug else None
                }), 503
            else:
                return jsonify({
                    'error': 'Our AI service is temporarily unavailable. Please try again in a few minutes.',
                    'details': error_message if app.debug else None
                }), 503

        if not response.choices or not response.choices[0].message.content:
            logger.error("Empty response from OpenAI API")
            return jsonify({
                'error': 'Unable to generate response. Please try again.',
                'details': 'Empty response from AI service'
            }), 500

        logger.info("Successfully generated response")
        return jsonify({'suggestion': response.choices[0].message.content})

    except Exception as e:
        logger.error(f"Unexpected error in generate route: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        return jsonify({
            'error': 'An unexpected error occurred. Please try again later.',
            'details': str(e) if app.debug else None
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'timestamp': time.time()}), 200

# Add a minimal CORS test endpoint
@app.route('/cors-test', methods=['GET', 'OPTIONS'])
def cors_test():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'ok'})
        response.status_code = 200
        return response
    return jsonify({'message': 'CORS test successful'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000))) 