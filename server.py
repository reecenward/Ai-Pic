from flask import Flask, request, jsonify
import os
import base64
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
import openai

# Set up OpenAI API credentials
openai.api_key = ""

# Define prompts to send to GPT-3
prompts = {
    'summarize': 'Summarize this text: ',
    'meaning': 'What does this mean: ',
    'translate': 'Translate this to Spanish: '
}

app = Flask(__name__)

@app.route('/', methods=['POST'])
def handle_photo():
    # Get the base64-encoded image data from the request
    print(request.json.get('option'))
    photo_base64 = request.json.get('image')
    if not photo_base64:
        return jsonify({'error': 'No photo data provided'}), 400

    # Convert the base64-encoded data to bytes
    try:
        photo_bytes = base64.b64decode(photo_base64.split(',')[1])
    except:
        return jsonify({'error': 'Invalid image data'}), 400

    # Get the prompt type from the request
    prompt_type = request.json.get('prompt_type', request.json.get('option'))

    # Get the prompt to use based on the prompt type
    prompt = prompts.get(prompt_type, prompts['summarize'])

    # Initialize the Google Cloud Vision API client
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'/Users/me/Desktop/another/myenv/key.json'
    client = vision_v1.ImageAnnotatorClient()

    # Open the image using Pillow and convert to a Google Cloud Vision-compatible format
    try:
        image = types.Image(content=photo_bytes)
    except:
        return jsonify({'error': 'Error opening image data'}), 400

    # Perform text recognition using Google Cloud Vision API
    try:
        response = client.text_detection(image=image)
        text = response.full_text_annotation.text
    except Exception as e:
        return jsonify({'error': f'Error extracting text: {e}'}), 400

    # Send the recognized text to the OpenAI API and get the response
    try:
        prompt_with_text = prompt + text
        openai_response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt_with_text,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.5,
        )
        result = openai_response.choices[0].text.strip()
    except Exception as e:
        return jsonify({'error': f'Error processing request: {e}'}), 400

    # Return a JSON response with the result
    return jsonify({'result': result})


if __name__ == '__main__':
    # Set the Flask app settings
    app.config['JSON_SORT_KEYS'] = False
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
    app.run(debug=True)

