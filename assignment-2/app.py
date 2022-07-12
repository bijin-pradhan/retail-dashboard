from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT
from flask_restful import Api

import resources
from security import authenticate, identity

app = Flask(__name__, template_folder='.')
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.secret_key = 'bijin'
api = Api(app)

@app.before_first_request
def create_tables():
    db.create_all()

jwt = JWT(app, authenticate, identity)

api.add_resource(resources.Metrics, '/metrics')
api.add_resource(resources.Login, '/login')


if __name__=="__main__":
    from db import db
    db.init_app(app)
    app.run(debug=True)
