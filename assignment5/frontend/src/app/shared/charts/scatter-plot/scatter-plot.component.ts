import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExploreService } from '../../explore.service';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['../bar-chart/bar-chart.component.scss'],
})
export class ScatterPlotComponent implements OnInit, OnDestroy {
  chartData: any;
  responseData: any = {};
  param: any;
  sub!: Subscription;
  constructor(private exportService: ExploreService) {}
  loader: boolean = true;
  @Input() params: any;
  chartName: any;
  @Input() chartId!: string;
  @Input() reportId!: string;
  ngOnInit(): void {
    this.sub = this.params.subscribe((res: any) => {
      this.param = res;
      this.getChartData();
    });
  }

  getChartData() {
    this.loader = true;
    this.chartData = [];
    this.param['chart_id'] = this.chartId;
    this.param['report_id'] = this.reportId;
    this.exportService.getReportData(this.param).subscribe({
      next: (res: any) => {
        this.responseData = res;
        if (res.data !== null) {
          this.loader = false;
          let newObj = {};
          this.chartData = [];
          let series: any;
          let lables: any[] = [];
          let reportData = res.data[0].report_data[0].data;
          this.chartName = res.data[0].report_data[0].title;
          for (const key in reportData) {
            series = [];
            newObj = {
              legend: {
                data: [],
                left: 'center',
                bottom: 10,
              },
              xAxis: [
                {
                  type: 'value',
                  scale: true,

                  splitLine: {
                    show: false,
                  },
                },
              ],
              yAxis: [
                {
                  type: 'value',
                  scale: true,

                  splitLine: {
                    show: false,
                  },
                },
              ],
            };
            let dataArray: any = [];
            if (key === 'labels') {
              reportData[key].forEach((element: any) => {
                if (lables.indexOf(element) === -1) {
                  lables.push(element);
                }
              });
              lables.forEach((e: any) => {
                dataArray = [];
                reportData.labels.forEach((element: string | number, idx: any) => {
                  if (element === e) {
                    dataArray.push([reportData['pc1'][idx], reportData['pc2'][idx]]);
                  }
                });
                newObj['legend'].data.push(e.toString());
                let obj = {};
                obj = {
                  name: e.toString(),
                  type: 'scatter',
                  symbolSize: 2,
                  data: dataArray,
                };
                series.push(obj);
              });
              newObj['series'] = series;
            }
          }
          this.chartData.push(newObj);
        }
      },
      error: (error: any) => {},
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
