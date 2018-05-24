from api_helper import Response, internal_server_error, successful, not_found, not_correct_password
from db_helper import Session, User
from config import image_format, image_host, stub_image
from time import gmtime, strftime
import os
import uuid
import bcrypt

def new_user(email, name, password_encrypted, token):
    session = Session()
    try:
        user = User(email, name, password_encrypted, token)
        session.add(user)
        session.commit()
        return successful({
            'id': user.id,
            'email': user.email,
            'password_encrypted': user.password_encrypted,
            'token': user.token,
        })
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def get_user(email):
    session = Session()
    try:
        user = session.query(User).filter(User.email==email).scalar()
        if user == None:
            return not_found
        else:
            return successful({
                'id': user.id,
                'email': user.email,
                'password_encrypted': user.password_encrypted,
                'token': user.token,
            })
    except:
        return internal_server_error
    finally:
        session.close()


def login_user(email, password):
    user = get_user(email)

    if user['error']['code'] != 0: return not_found

    password_encrypted = user['result']['password_encrypted']
    del user['result']['password_encrypted']

    if bcrypt.checkpw(password.encode('utf-8'), password_encrypted):
        return user
    else:
        return not_correct_password

def register_user(email, name, password):
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt(14))
    token = uuid.uuid4().hex[:8]
    user = new_user(email, name, hashed, token)
    if user['error']['code'] != 0: return not_found
    del user['result']['password_encrypted']
    return user
