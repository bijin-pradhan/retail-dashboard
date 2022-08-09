from hashlib import sha256

from app import db


class InternetData(db.Model):
    __tablename__="internet_data"
    id = db.Column("index", db.Integer, primary_key=True)
    country_code = db.Column("country_code", db.String(2))
    country = db.Column("country", db.String(45))
    continental_region = db.Column("continental_region", db.String(20))
    plans = db.Column("no_of_internet_plans", db.Float)
    avg_1gb_22 = db.Column("average_price_of_1gb_usd_", db.Float)
    cheapest_1gb = db.Column("cheapest_1gb_for_30_days_usd_", db.Float)
    expensive_1gb = db.Column("most_expensive_1gb_usd_", db.Float)
    avg_1gb_21 = db.Column("average_price_of_1gb_usd_at_the_start_of_2021_", db.Float)
    avg_1gb_20 = db.Column("average_price_of_1gb_usd_at_start_of_2020_", db.Float)
    population = db.Column("population", db.Float)
    internet_users = db.Column("internet_users", db.Float)
    avg_speed = db.Column("avg_internet_speed", db.Float)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))
    is_admin = db.Column(db.Boolean)

    def __init__(self, fullname, email, password):
        self.fullname = fullname
        self.email = email
        self.password = sha256(password.encode()).digest()
        self.is_admin = True

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
    
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
