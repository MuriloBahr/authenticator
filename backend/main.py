from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from db.query import get_all_users, insert_user
from db.db import db 
import os

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})
    CORS(app, resources={r"/register": {"origins": "http://localhost:3000"}})
    load_dotenv()

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    return app

def configure_database(app):
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
    db.init_app(app)

if __name__ == '__main__':
    app = create_app()
    configure_database(app)

    @app.route('/login', methods=['POST'])
    def login():
        verification_user = None
        verify = False
        try:
            data = request.get_json()
            verification_user = get_all_users()
            usernames = [user[1].upper() for user in verification_user]
            password = [password[2] for password in verification_user]
            if ('username' not in data or 'password' not in data):
                return jsonify({'error': 'Campos obrigatórios ausentes'}), 400
            if usernames and password:
                for users, passwords in zip(usernames, password):
                    if users == data['username'].upper() and passwords == data['password']:
                        verify = True
                        return jsonify({'message': 'Login bem-sucedido'}), 200
                    
                if not verify:
                    return jsonify({'error': 'Credenciais inválidas'}), 401
        except Exception as e:
            print(e)
            return jsonify({'error': f'Erro no servidor: {str(e)}'}), 500
    
    @app.route('/register', methods=['POST'])
    def register():
        try:
            data = request.get_json()
            if 'username' not in data or 'email' not in data or 'password' not in data:
                return jsonify({'error': 'Campos obrigatórios ausentes'}), 400

            username = data['username']
            email = data['email']
            password = data['password']
            
            if username and email and password:
                insert_user(username, password, email)
                return jsonify({'message': 'Registro bem-sucedido'}), 201
            else:
                return jsonify({'error': 'Campos obrigatórios ausentes'}), 401
        except Exception as e:
            print(e)
            return jsonify({'error': f'Erro no servidor: {str(e)}'}), 500
    app.run(debug=True, port=int(os.getenv('PORT')))
