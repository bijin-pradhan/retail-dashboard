from flask import request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

import database
from app import jwt
from models import User
from security import assign_access_tokens, authenticate

mapping = {
    'avg_speed': database.avg_speed,
    'avg_prices': database.avg_prices,
    'grouped': database.group_by_region,
    'corr': database.corr_heatmap,
    'changes': database.change_in_price,
}

class Data(Resource):
    # @jwt_required()
    def get(self):
        return {
            'grouped': database.group_by_region(),
            }
    
    @jwt_required()
    def post(self):
        data = request.get_json()
        return_dict = {
            key: mapping[key](*value) for key, value in data.items()
        }
        return return_dict


class SignIn(Resource):
    @jwt_required()
    def get(self):
        return {"success": "valid token"}, 200
        
    def post(self):
        data = request.get_json()
        user = authenticate(data['email'], data['password'])
        if user:
            access_token = assign_access_tokens(user.id)
            return {
                "access_token": access_token,
                "is_admin": user.is_admin,
                "email": user.email,
                "id": user.id,
                "fullname": user.fullname
            }, 201
        
        else:
            return {"error": "Username and Password combination not found."}, 401

class SignUp(Resource):
    def post(self):
        data = request.get_json()
        if not User.find_by_email(data['email']):
            user = User(data['fullname'], data['email'], data['password'])
            user.save_to_db()
            access_token = assign_access_tokens(user.id)
            return {
                "access_token": access_token, 
                "is_admin": user.is_admin,
                "email": user.email,
                "id": user.id,
                "fullname": user.fullname
                }, 201
        return {"error": "User already exists"}, 409
