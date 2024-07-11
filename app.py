from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import base64
import datetime
import os

app = Flask(__name__)
CORS(app)

# Certifique-se de que as pastas 'captures' e 'videos' existem
if not os.path.exists('captures'):
    os.makedirs('captures')
if not os.path.exists('videos'):
    os.makedirs('videos')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/capture', methods=['POST'])
def capture():
    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image data'}), 400

    image_data = data['image']
    image_data = image_data.split(",")[1]
    image_data = base64.b64decode(image_data)

    filename = f"captures/capture_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
    with open(filename, "wb") as f:
        f.write(image_data)

    return jsonify({'message': f"Image saved as {filename}"}), 200

@app.route('/save_video', methods=['POST'])
def save_video():
    data = request.json
    if 'video' not in data:
        return jsonify({'error': 'No video data'}), 400

    video_data = data['video']
    video_data = video_data.split(",")[1]
    video_data = base64.b64decode(video_data)

    filename = f"videos/video_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.webm"
    with open(filename, "wb") as f:
        f.write(video_data)

    return jsonify({'message': f"Video saved as {filename}"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')