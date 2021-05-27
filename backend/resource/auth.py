from sqlalchemy import select
from models import User
import global_func as global_f
import hashlib

def authenticate(username, password):
    session = global_f.connect_db()
    user = session.execute(select(User).where(User.username == username)).first()[0]
    if user and user.password == hashlib.sha256(password.encode()).hexdigest():
       return user
    
def indentity(payload):
    session = global_f.connect_db()
    user_id = payload['identity']
    user = session.execute(select(User).where(User.id == user_id)).first()[0]
    return user