import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Averages, HeatmapData, RegionGroups } from 'src/app/interfaces/data.interface'

import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "http://localhost:5000/"
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
  }
  constructor(private http: HttpClient,
  ) { }

  averages(): Observable<Averages> {
    const req = JSON.stringify({
      'avg_speed': [],
      'avg_prices': []
    })

    return this.http.post<Averages>(this.url, req, this.httpOptions)
  }

  regionGroups(): Observable<RegionGroups> {
    const req = JSON.stringify({
      'grouped': []
    })

    return this.http.post<RegionGroups>(this.url, req, this.httpOptions)
  }

  corrHeatMap(): Observable<HeatmapData> {
    const req = JSON.stringify({
      'corr': []
    })
    return this.http.post<HeatmapData>(this.url, req, this.httpOptions)
  }
}