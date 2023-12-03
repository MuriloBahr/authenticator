from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from db.db import db
import os

app = Flask(__name__)
CORS(app)

load_dotenv()
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')
PORT = os.getenv('PORT')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

if __name__ == '__main__':
    app.run(debug=True, port=int(PORT), use_reloader=False)