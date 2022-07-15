from hashlib import sha256
from hmac import compare_digest

from flask import make_response, redirect
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

from models import User


def authenticate(username, password):
    user = User.find_by_username(username)
    password = sha256(password.encode()).digest()
    if user and compare_digest(user.password, password):
        return user
    

def assign_access_refresh_tokens(user_id, url=None):
    access_token = create_access_token(identity=user_id)
    refresh_token = create_refresh_token(identity=str(user_id))
    if url:
        resp = make_response(redirect(url, 302))
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp
    return access_token, refresh_token
