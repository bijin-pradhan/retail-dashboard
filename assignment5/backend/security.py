from hashlib import sha256
from hmac import compare_digest

from flask_jwt_extended import create_access_token

from models import User


def authenticate(email, password):
    user = User.find_by_email(email)
    password = sha256(password.encode()).digest()
    if user and compare_digest(user.password, password):
        return user
    

def assign_access_tokens(user_id):
    access_token = create_access_token(identity=user_id)
    return access_token
