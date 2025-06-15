from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
import logging
from functools import wraps
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Simplified CORS configuration
CORS(app, 
     origins=[
         'https://nouvo.dev',
         'https://nouvo-dev.web.app',
         'http://localhost:3000'
     ],
     allow_credentials=True,
     supports_credentials=True)

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

def retry_on_failure(max_retries=3, delay=1):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        logger.error(f"Final attempt failed: {str(e)}")
                        raise
                    logger.warning(f"Attempt {attempt + 1} failed: {str(e)}")
                    time.sleep(delay)
            return None
        return wrapper
    return decorator

def validate_input(data):
    if not isinstance(data, dict):
        return False, "Invalid request format"
    
    user_input = data.get('userInput')
    if not user_input:
        return False, "User input is required"
    
    if not isinstance(user_input, str):
        return False, "User input must be a string"
    
    stripped_input = user_input.strip()
    if len(stripped_input) < 10:
        return False, "Please provide more detailed input (minimum 10 characters)"
    
    return True, stripped_input

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
        data = request.get_json()
        is_valid, result = validate_input(data)
        
        if not is_valid:
            return jsonify({'error': result}), 400

        user_input = result  # This is the validated and stripped input

        @retry_on_failure(max_retries=3, delay=1)
        def get_openai_response():
            return openai.ChatCompletion.create(
                model="gpt-4o-mini",
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

        try:
            response = get_openai_response()
        except Exception as e:
            logger.error(f"OpenAI API error: {str(e)}")
            return jsonify({
                'error': 'Service temporarily unavailable. Please try again later.',
                'details': str(e) if app.debug else None
            }), 503

        if not response.choices or not response.choices[0].message.content:
            logger.error("Invalid response from OpenAI API")
            return jsonify({
                'error': 'Unable to generate response. Please try again.',
                'details': 'Empty response from AI service'
            }), 500

        return jsonify({'suggestion': response.choices[0].message.content})

    except Exception as e:
        logger.error(f"Unexpected error in generate route: {str(e)}")
        return jsonify({
            'error': 'An unexpected error occurred',
            'details': str(e) if app.debug else None
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000))) 