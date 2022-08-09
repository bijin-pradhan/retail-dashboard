import { Component, Input, OnInit } from '@angular/core';
import {  EChartsOption } from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  
  @Input() chartUrl = '';
    _chartOption:EChartsOption = {};
  private showLegend:boolean = true;
  
  constructor() { 

  }

  ngOnInit() {
    let data = [820, 932, 901, 934, 1290, 1330, 1320];
    if (this.chartUrl === 'first') {
      data = [820, 932, 901, 934, 990, 930, 920];
      this.showLegend = false;
    }
    if (this.chartUrl === 'second') {
      data = [20, 32, 41, 34, 50, 30, 20];
      this.showLegend = false;
    }
    if (this.chartUrl === 'third') {
      data = [1820, 1932, 1901, 1934, 1990, 1930, 1920];
      this.showLegend = false;
    }
    console.log(this.chartUrl, this.showLegend);
    this.loadChart(data);
  }

  
  private loadChart(data:any): void {
        
    this._chartOption = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        //show: this.showLegend
      },
      yAxis: {
        type: 'value',
        //show: this.showLegend
      },
      series: [
        {
          data: [820, 932, 901, 934, 990, 930, 920],
          type: 'bar'
        }
      ]
    };
  }
}
