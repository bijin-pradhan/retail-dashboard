import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HeatmapData } from 'src/app/interfaces/chart.interfaces';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit, OnChanges {
  @Input() chartData: any;
  _chartOption: EChartsOption = {};

  constructor() { }

  ngOnInit(): void {
    this.loadChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  loadChart(): void {
    if (this.chartData) {
      this.chartData = this.chartData as HeatmapData
      this._chartOption = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '70%',
          top: '5%',
          width: '60%',
          left: '30%'
        },
        xAxis: {
          type: 'category',
          data: this.chartData.xAxisData,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: this.chartData.yAxisData,
          axisLabel: {
            show: true,
            rotate: 45,
          },
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: -1,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '5%',
          color: ['#FF8000', '#FFFFFF']

        },
        series: [
          {
            name: 'Correlation',
            type: 'heatmap',
            data: this.chartData.seriesData,
            label: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
