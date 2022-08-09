import database
import resources
from app import api, app, db


@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(resources.Data, '/')
api.add_resource(resources.SignIn, '/signin')
api.add_resource(resources.SignUp, '/signup')

if __name__=="__main__":
    db.init_app(app)
    app.run(debug=True)
