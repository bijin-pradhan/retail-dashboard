import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { ChartData } from 'src/app/interfaces/data.interface';

@Component({
  selector: 'app-area-chart-animated',
  templateUrl: './area-chart-animated.component.html',
  styleUrls: ['./area-chart-animated.component.scss']
})
export class AreaChartAnimatedComponent implements OnInit, OnChanges {
  @Input() chartUrl: any;
  _chartOption: EChartsOption = {};

  constructor() {
  }

  ngOnInit(): void {
    this.loadChart()
  }

  private loadChart(): void {
    var xAxisData = [];
    var values: number[][] = [];
    var names: string[] = [];

    if (this.chartUrl) {
      let data = this.chartUrl as ChartData;
      xAxisData = data.xAxisData;
      values = data.values;
      names = data.names;

      const s: SeriesOption[] = [];
      for (let i = 0; i < values.length; i++) {
        s.push({
          name: names[i],
          type: 'bar',
          data: values[i],
          animationDelay: (idx: number) => idx * 10 + i,
          barMinHeight: 1,
        })
      }
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
        animationDelayUpdate: (idx: number) => idx * 5,
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadChart()
  }
}

