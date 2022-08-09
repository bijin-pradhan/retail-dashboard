import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TreemapData } from 'src/app/interfaces/data.interface';

@Component({
  selector: 'app-treemap',
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.scss']
})
export class TreemapComponent implements OnInit, OnChanges {
  @Input() chartUrl: any;
  _chartOption: EChartsOption = {};

  constructor() { }

  ngOnInit(): void {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  loadChart() {
    if (this.chartUrl) {
      this.chartUrl = this.chartUrl as TreemapData
      let d = []
      for (let i = 0; i < this.chartUrl.names.length; i++) {
        d.push({
          name: this.chartUrl.names[i],
          value: this.chartUrl.values[i]
        })
      }
      this._chartOption = {
        series: [{
          type: 'treemap',
          data: d
        }]
      }
    }
  }
}
