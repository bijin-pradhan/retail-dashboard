import jwt
from flask import Flask, make_response, render_template, request
from flask_restful import Api, Resource

from security import authenticate

app = Flask(__name__, template_folder='.')
app.secret_key = 'bijin'
api = Api(app)

class TotalSales(Resource):
    def get(self):
        return {'Total Sales': 12345}

class PerCustomer(Resource):
    def get(self):
        return {'Sales per customer': 111}

class Unique(Resource):
    def get(self):
        return {'Number of Unique Customers': 9876}

class Daily(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('sales_table.html'), 200, headers)

class Login(Resource):
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('login.html'), 200, headers)
    

    def post(self):
        username = request.form['username']
        password = request.form['password']
        user = authenticate(username, password)
        if user is not None:
            token = jwt.encode({"id": user.id}, app.secret_key, 'HS256').decode('utf-8')
            return make_response({"result":"success", "token": token}, 200, {"Authorization": f'JWT {token}'})

api.add_resource(TotalSales, "/total_sales")
api.add_resource(Unique, "/unique")
api.add_resource(PerCustomer, "/per_customer")
api.add_resource(Daily, '/daily')
api.add_resource(Login, '/login')

app.run(debug=True)
