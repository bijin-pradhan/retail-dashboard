from flask import make_response, redirect, render_template, request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from app import app, jwt
from models import User
from query_db import per_customer, products, total_sales, unique_customer
from security import assign_access_refresh_tokens, authenticate


class Login(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('login.html'), 200, headers)
    
    def post(self):
        data = request.get_json()
        user = authenticate(data['username'], data['password'])
        if user:
            access_token, refresh_token = assign_access_refresh_tokens(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 201
        
        else:
            return {"error": "Username and Password combination not found."}, 401


class Register(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('register.html'), 200, headers)
    
    def post(self):
        data = request.get_json()
        if not User.find_by_username(data['username']):
            user = User(data['username'], data['password'])
            user.save_to_db()
            access_token, refresh_token = assign_access_refresh_tokens(user.id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 201
        return {"error": "User already exists"}, 409
    
class Metrics(Resource):
    @jwt_required()
    def get(self):
        return {
            'Total Sales': total_sales(),
            'Number of Unique Customers': unique_customer(),
            'Sales per customer': per_customer(),
            }

    @jwt.unauthorized_loader
    def unauthorized_loader_callback(self):
        return {"error": "Unauthorized access."}, 401

class Daily(Resource):
    @jwt_required()
    def get(self):
        return products()

class Home(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'), 200, headers)
