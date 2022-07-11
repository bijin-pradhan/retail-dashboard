import pandas as pd
from sqlalchemy import create_engine

df = pd.read_csv('./sales_data_sample.csv', encoding='latin-1')
engine = create_engine("sqlite:///data.db")

df['PROFIT'] = df['SALES'] - (df['MSRP'] * df['QUANTITYORDERED'])
df.to_sql("sales_table", engine)
