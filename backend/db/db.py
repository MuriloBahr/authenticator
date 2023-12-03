from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

def get_all_users():
    try:
        users = User.query.all()
        return users
    except Exception as e:
        print(f"Erro ao obter usuários: {e}")
        return None