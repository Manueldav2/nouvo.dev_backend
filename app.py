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

app = Flask(__name__)

# Define allowed origins
ALLOWED_ORIGINS = [
    'https://nouvo.dev',
    'https://nouvo-dev.web.app',
    'http://localhost:3000'
]

# Configure CORS with more specific settings
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

# Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get('Origin')
    
    if origin in ALLOWED_ORIGINS:
        response.headers.add('Access-Control-Allow-Origin', origin)
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Accept')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
    
    return response

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    logger.error("OpenAI API key is not set in environment variables")

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
        return '', 204
    if request.method == 'POST':
        return redirect('/api/generate', code=307)
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return '', 204

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
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
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
            return jsonify({
                'error': 'Our AI service is temporarily unavailable. Please try again in a few minutes.',
                'details': str(e) if app.debug else None
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000))) 