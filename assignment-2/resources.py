from flask import make_response, render_template, request
from flask_jwt import jwt_required
from flask_restful import Resource

from calculate_metrics import per_customer, total_sales, unique_customer
from user import User


class Login(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('login.html'), 200, headers)
    
    def post(self):
        data = request.form

        if User.find_by_username(data["username"]):
            return {"message": "A user with that username already exists"}, 400

        user = User(data["username"], data["password"])
        user.save_to_db()

        return {"message": "User created successfully."}, 201


class Metrics(Resource):
    @jwt_required()
    def get(self):
        return {
            'Total Sales': total_sales(),
            'Number of Unique Customers': unique_customer(),
            'Sales per customer': per_customer(),
            }

class Daily(Resource):
    @jwt_required()
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('sales_table.html'), 200, headers)
