import resources
from app import api, app, db, jwt


@app.before_first_request
def create_tables():
    db.create_all()
    
api.add_resource(resources.Register, '/register')
api.add_resource(resources.Login, '/login')
api.add_resource(resources.Metrics, '/metrics')
api.add_resource(resources.Home, '/')
api.add_resource(resources.Daily, '/daily')
if __name__=="__main__":
    db.init_app(app)
    app.run(debug=True)
