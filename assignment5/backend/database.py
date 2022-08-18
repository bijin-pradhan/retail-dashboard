from collections import defaultdict

import pandas as pd
from sqlalchemy import create_engine

from app import db
from models import InternetData


def avg_speed():
    return round(db.session.query(db.func.avg(InternetData.avg_speed)).scalar(), 2)

def avg_prices():
    return {
        '2022': round(db.session.query(db.func.avg(InternetData.avg_1gb_22)).scalar(), 2),
        '2021': round(db.session.query(db.func.avg(InternetData.avg_1gb_21)).scalar(), 2),
        '2020': round(db.session.query(db.func.avg(InternetData.avg_1gb_20)).scalar(), 2),
    }

def change_in_price():
    prices = avg_prices()
    return {
        'change_20_21': round(prices['2020'] - prices['2021'], 2),
        'change_21_22': round(prices['2021'] - prices['2022'], 2)
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

    names = [
        'Number of Countries',
        'Average Speed',
        'Average Price of 1GB',
        'Average Number of Plans',
        'Most Expensive 1GB',
        'Cheapest 1GB',
        r'% of Population that uses Internet'
    ]
    
    regions = []
    values = [[] for _ in names]
    internet_users = []
    population = []
    for name, countries, speed, price, plans, exp, cheap, users, pop in rows:
        regions.append(name)
        values[0].append(countries)
        values[1].append(speed)
        values[2].append(price)
        values[3].append(plans)
        values[4].append(exp)
        values[5].append(cheap)
        values[6].append((users/pop) * 100 if users and pop else 0)
        internet_users.append(users)
        population.append(pop)
        
    return {
        'names': names,
        'regions': regions,
        'values': values,
        'internet_users': internet_users,
        'population': population
    }

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
