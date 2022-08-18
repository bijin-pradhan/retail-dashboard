import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ScatterPlotData } from 'src/app/interfaces/chart.interfaces';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['../bar-chart/bar-chart.component.scss'],
})
export class ScatterPlotComponent implements OnInit, OnChanges {
  @Input() chartData!: ScatterPlotData;
  @Input() animated = false;
  _chartOption: EChartsOption = {};

  constructor() { }

  ngOnInit(): void {
    this.loadChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  private loadChart() {
    if (this.chartData) {
      this._chartOption = {
        xAxis: {
          type: this.chartData.xAxis.type,
          name: this.chartData.xAxis.name,
          nameLocation: this.chartData.xAxis.nameLocation,
          min: this.chartData.xAxis.min,
          nameGap: 30,
        },
        yAxis: {
          type: this.chartData.yAxis.type,
          name: this.chartData.yAxis.name,
          nameLocation: this.chartData.yAxis.nameLocation,
          min: this.chartData.yAxis.min,
          nameGap: 70,
        },
        tooltip: {
          position: 'top'
        },
        series: [
          {
            symbolSize: 20,
            data: this.chartData.values,
            encode: { tooltip: [0, 1] },
            type: 'scatter',
            animationDelay: (idx: number) => {
              if (this.animated)
                return idx * 10;
              else
                return 0;
            }
          }
        ]
      };
    }
  }
}
