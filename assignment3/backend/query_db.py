from math import prod

from app import db
from models import Sales


def total_sales():
    return db.session.query(db.func.sum(Sales.sales)).scalar()

def unique_customer():
    return db.session.query(db.func.count(db.distinct(Sales.customer_name))).scalar()

def per_customer():
    return total_sales()/unique_customer()

def products():
    prods = db.session.query(Sales).limit(10).all()
    product_list = []
    for idx, p in enumerate(prods):
        product_list.append(p.json())
    return product_list
