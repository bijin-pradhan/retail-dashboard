import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TreemapData } from 'src/app/interfaces/chart.interfaces';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  _chartOption: EChartsOption = {};

  constructor() { }

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  loadChart() {
    if (this.chartData) {
      this.chartData = this.chartData as TreemapData
      let d = []
      for (let i = 0; i < this.chartData.names.length; i++) {
        d.push({
          name: this.chartData.names[i],
          value: this.chartData.values[i]
        })
      }
      this._chartOption = {
        series: [{
          type: 'treemap',
          data: d,
        }]
      }
    }
  }
}
