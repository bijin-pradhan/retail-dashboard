import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSales: number = 0;
  numCust: number = 0;
  avgSpend: number = 0;
  httpOptions = {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${sessionStorage.getItem('accessToken')}`
    })
  }
  @Output() reloginEvent = new EventEmitter<boolean>();
  productsList: Product[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getMetrics();
    this.getProducts();
  }

  getMetrics(): void {
    this.httpClient.get("http://127.0.0.1:5000/metrics", this.httpOptions)
      .subscribe(data => {
        this.totalSales = Math.round(data['totalSales'] * 100) / 100
        this.numCust = data['numCust']
        this.avgSpend = Math.round(data['avgSpend'] * 100) / 100
      },
        error => {
          sessionStorage.removeItem('accessToken');
          this.reloginEvent.emit(true);
        })
  }

  getProducts(): void {
    this.httpClient.get("http://127.0.0.1:5000/daily", this.httpOptions).subscribe(data => {
      for (let k in data) {
        let d = data[k] as Product
        this.productsList.push(d)
      }
    })
  }
}


interface Product {
  productID: number;
  productName: string;
  customerName: string;
  sales: number;
  profitPct: number;
}