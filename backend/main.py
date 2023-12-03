from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

#O BRA
app = Flask(__name__)
CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})

users = {'ada': 'adad', 'ada': 'ads'}

load_dotenv()
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print('Received request data:', data)
        if 'username' not in data or 'password' not in data:
            return jsonify({'error': 'Campos obrigatórios ausentes'}), 400

        if data['username'] in users and data['password'] == users[data['username']]:
            return jsonify({'message': 'Login bem-sucedido'}), 200
        else:
            return jsonify({'error': 'Credenciais inválidas'}), 401

    except Exception as e:
        return jsonify({'error': f'Erro no servidor: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=int(os.getenv('PORT')))