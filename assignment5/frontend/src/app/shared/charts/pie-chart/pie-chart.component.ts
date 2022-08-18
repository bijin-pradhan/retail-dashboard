import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NameValuePair } from 'src/app/interfaces/chart.interfaces';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() chartData!: NameValuePair[];
  @Input() animated = false;
  _chartOption: EChartsOption = {};

  constructor() {

  }

  ngOnInit() {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  private loadChart(): void {
    if (this.chartData) {
      // TODO: fix this jank setup
      // directly passing data from analytics component breaks chart
      let d = []
      for (let item of this.chartData) {
        d.push({ value: item.value, name: item.name })
      }
      this._chartOption = {
        legend: {
          orient: 'vertical',
          left: 'left',
          // fix the font color too
          backgroundColor: 'white'
        },
        series: [
          {
            name: 'Pie chart',
            type: 'pie',
            radius: '50%',
            data: d,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            animationDelay: (idx: number) => {
              if (this.animated)
                return idx * 10;
              else
                return 0;
            }
          }
        ]
      }
    }
  }
}
