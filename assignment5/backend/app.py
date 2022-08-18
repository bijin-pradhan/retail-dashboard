from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data/cleaned/data.db?charset=utf8"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config['JWT_SECRET_KEY'] = 'bijin'  # Change this!
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_CSRF_CHECK_FORM'] = True
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['JSON_AS_ASCII'] = False

api = Api(app)
jwt = JWTManager(app)
db = SQLAlchemy()
