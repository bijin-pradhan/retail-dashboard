import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Averages, Changes, CorrData, RegionGroups } from 'src/app/interfaces/data.interface'
import { HeatmapData } from 'src/app/interfaces/chart.interfaces';

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

  changes(): Observable<Changes> {
    const req = JSON.stringify({
      'changes': [],
    })

    return this.http.post<Changes>(this.url, req, this.httpOptions);
  }

  regionGroups(): Observable<RegionGroups> {
    const req = JSON.stringify({
      'grouped': []
    })

    return this.http.post<RegionGroups>(this.url, req, this.httpOptions)
  }

  corrHeatMap(): Observable<CorrData> {
    const req = JSON.stringify({
      'corr': []
    })
    return this.http.post<CorrData>(this.url, req, this.httpOptions)
  }
}