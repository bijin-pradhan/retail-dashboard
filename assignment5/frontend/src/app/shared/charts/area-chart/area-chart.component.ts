import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { ChartData } from 'src/app/interfaces/chart.interfaces';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss']
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() chartData!: ChartData;
  @Input() animated = false;
  _chartOption: EChartsOption = {};

  constructor() { }

  ngOnInit() {
    this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart();
  }

  private loadChart(): void {
    var xAxisData = [];
    var values: number[][] = [];
    var names: string[] = [];

    if (this.chartData) {
      let data = this.chartData;
      xAxisData = data.xAxisData;
      values = data.values;
      names = data.names;

      const s: SeriesOption[] = [];
      for (let i = 0; i < values.length; i++) {
        s.push({
          name: names[i],
          type: 'line',
          data: values[i],
          areaStyle: {},
          animationDelay: (idx: number) => {
            if (this.animated)
              return idx * 10 + i
            else
              return 0;
          }
        })
      }

      // only select the first key
      // rest are hidden
      let selected: { [id: string]: boolean } = {};
      for (let name of names) {
        selected[name] = false
      }

      selected[names[0]] = true

      this._chartOption = {
        legend: {
          data: names,
          selected: selected,
          align: 'left',
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: s,
        animationEasing: 'elasticOut',
        animationDelayUpdate: (idx: number) => {
          if (this.animated)
            return idx * 5
          else
            return 0;
        },
      };
    }
  }
}
