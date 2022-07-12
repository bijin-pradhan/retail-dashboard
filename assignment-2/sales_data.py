from db import db


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
