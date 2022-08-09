import pandas as pd
from sqlalchemy import create_engine

from app import db
from models import InternetData


def avg_speed():
    return db.session.query(db.func.avg(InternetData.avg_speed)).scalar()

def avg_prices():
    return {
        'avg_22': db.session.query(db.func.avg(InternetData.avg_1gb_22)).scalar(),
        'avg_21': db.session.query(db.func.avg(InternetData.avg_1gb_21)).scalar(),
        'avg_20': db.session.query(db.func.avg(InternetData.avg_1gb_20)).scalar(),
    }

def change_in_price():
    prices = avg_prices()
    return {
        'change_20_21': prices['avg_20'] - prices['avg_21'],
        'change_21_22': prices['avg_21'] - prices['avg_22']
    }

def most_expensive(n=1, avg=""):
    if avg=="22":
        criteria = InternetData.avg_1gb_22
    elif avg=="21":
        criteria = InternetData.avg_1gb_21
    elif avg=="20":
        criteria = InternetData.avg_1gb_20
    else:
        criteria = InternetData.expensive_1gb
    rows = (
        db.session.query(InternetData.country, criteria)
        .order_by(criteria.desc())
        .limit(n)
        .all()
    )
    return [{
        "country": name, 
        "value": price
        } for name, price in rows]

def least_expensive(n=1, avg=""):
    if avg=="22":
        criteria = InternetData.avg_1gb_22
    elif avg=="21":
        criteria = InternetData.avg_1gb_21
    elif avg=="20":
        criteria = InternetData.avg_1gb_20
    else:
        criteria = InternetData.cheapest_1gb
    rows = (
        db.session.query(InternetData.country, criteria)
        .order_by(criteria)
        .filter(criteria!=None)
        .limit(n)
        .all()
    )
    return [{
        "country": name, 
        "value": price
        } for name, price in rows]


def top_speed(n=1):
    rows = (
        db.session.query(InternetData.country, InternetData.avg_speed)
        .order_by(InternetData.avg_speed.desc())
        .limit(n)
        .all()
    )
    return [{
        "country": name, 
        "value": speed
        } for name, speed in rows]

def most_plans(n):
    rows = (
        db.session.query(InternetData.country, InternetData.plans, 
            InternetData.avg_1gb_22, InternetData.avg_speed)
        .order_by(InternetData.plans.desc())
        .filter(InternetData.avg_1gb_22 != None, InternetData.avg_speed != None)
        .limit(n)
        .all()
        )
    return [{
        'country': name, 
        'data': {
        'no_of_plans': plans, 
        'avg_price_1gb': price, 
        'avg_speed': speed}} for name, plans, price, speed in rows]

def group_by_region():
    rows = (
        db.session.query(
            InternetData.continental_region, 
            db.func.count(InternetData.country),
            db.func.avg(InternetData.avg_speed),
            db.func.avg(InternetData.avg_1gb_22),
            db.func.avg(InternetData.plans),
            db.func.max(InternetData.expensive_1gb),
            db.func.min(InternetData.cheapest_1gb),
            db.func.sum(InternetData.internet_users),
            db.func.sum(InternetData.population)
            )
        .group_by(InternetData.continental_region)
        .all()
    )
    return [{
        'region': name,
        'data':{
        'num_countries': countries,
        'avg_speed': speed,
        'avg_price': price,
        'avg_plans': plans,
        'expensive': exp,
        'cheapest': cheap,
        'internet_users': users,
        'population': pop
    }}for name, countries, speed, price, plans, exp, cheap, users, pop in rows]


def corr_heatmap():
    engine = create_engine("sqlite:///data/cleaned/data.db?charset=utf8")
    df = pd.read_sql_table("internet_data", engine)
    corr = df.corr()
    values = []
    for i, row in enumerate(corr.to_numpy()):
        for j, col in enumerate(row):
            values.append([i, j, col])
    return {
        'xAxisData': list(corr.columns),
        'yAxisData': list(corr.columns),
        'seriesData': values, 
    }
