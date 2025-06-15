from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": os.getenv('FRONTEND_URL', 'https://nouvo.dev')}})

# Configure OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/api/generate', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        return '', 204

    try:
        data = request.get_json()
        user_input = data.get('userInput')

        if not user_input:
            return jsonify({'error': 'User input is required'}), 400

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

        if not response.choices or not response.choices[0].message.content:
            return jsonify({'error': 'Invalid response from AI service'}), 500

        return jsonify({'suggestion': response.choices[0].message.content})

    except Exception as e:
        print(f"Error in generate route: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000))) 