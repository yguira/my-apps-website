from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='.', static_url_path='')

# Serve index.html at root
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Optional: catch-all route to serve other static files
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)

from flask import jsonify

@app.route('/api/hello')
def hello():
    return jsonify({"message": "Hello from Flask!"})
