from db import db
from sales_data import Sales


def total_sales():
    return db.session.query(db.func.sum(Sales.sales)).scalar()

def unique_customer():
    return db.session.query(db.func.count(db.distinct(Sales.customer_name))).scalar()

def per_customer():
    return total_sales()/unique_customer()
