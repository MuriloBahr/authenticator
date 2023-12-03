from sqlalchemy import text
from .db import db

def insert_user(username, password):
    sql = text("INSERT INTO login (user_login, password_login) VALUES (:username, :password)")
    db.session.execute(sql, {'username': username, 'password': password})
    db.session.commit()

def get_all_users():
    sql = text("SELECT * FROM login")
    result = db.session.execute(sql)
    return result.fetchall()
