from hashlib import sha256

from app import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))

    def __init__(self, username, password):
        self.username = username
        self.password = sha256(password.encode()).digest()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()


class Sales(db.Model):
    __tablename__="sales_table"
    __mapper_args__ = {
        'include_properties': ['index', 'PRODUCTNAME', 'CUSTOMERNAME', 'SALES']
    }
    id = db.Column("index", db.Integer, primary_key=True)
    product_name = db.Column("PRODUCTCODE", db.String(80))
    customer_name = db.Column("CUSTOMERNAME", db.String(80))
    sales = db.Column("SALES", db.Float)
    profit_pct = db.Column("PROFIT", db.Float)

    def json(self):
        return {
            'Product ID': self.id,
            'Product Name': self.product_name,
            'Customer Name': self.customer_name,
            'Sales': self.sales,
            'Profit Percent': self.profit_pct / self.sales
        }
    
    @classmethod
    def find_by_id(self, id):
        return self.query.filter_by(id=id).first()
