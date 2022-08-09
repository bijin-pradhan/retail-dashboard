import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExploreService } from '../../explore.service';

@Component({
  selector: 'app-clustered-bar',
  templateUrl: './clustered-bar.component.html',
  styleUrls: ['../bar-chart/bar-chart.component.scss'],
})
export class ClusteredBarComponent implements OnInit, OnDestroy {
  loader: boolean = true;
  responseData: any = {};
  constructor(private exportService: ExploreService) {}
  @Input() params: any;
  @Input() chartId!: string;
  @Input() reportId!: string;
  chartData: any;
  chartName: any;
  sub!: Subscription;
  param: any;
  ngOnInit(): void {
    this.sub = this.params.subscribe((res: any) => {
      this.param = res;
      this.getChartData();
    });
  }
  getChartData() {
    this.loader = true;
    this.param['chart_id'] = this.chartId;
    this.param['report_id'] = this.reportId;
    this.chartData = [];
    let series: any = [];
    this.exportService.getReportData(this.param).subscribe({
      next: (res: any) => {
        this.responseData = res;
        if (res.data !== null) {
          this.loader = false;
          let newObj = {};
          this.chartData = [];
          res.data[0].report_data.forEach((ele: any, i: any) => {
            let index = i + 1;
            this.chartName = ele.title;
            series = [];
            newObj = {
              legend: {
                align: 'left',
                bottom: '0px',
                textStyle: {
                  fontSize: '10px',
                  fontWeight: 'normal',
                },
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
              },
              title: {
                mainType: 'title',
                subtext: 'Plot ' + index + '- ' + ele.sub_title,
                textAlign: 'left',
                subtextStyle: { fontWeight: 'lighter' },
              },
              grid: {
                top: '30px',
                bottom: '30px',
                containLabel: true,
              },
              xAxis: {
                type: 'value',
                axisLabel: {
                  fontSize: '10px',
                },
              },
              yAxis: {
                type: 'category',
                data: ['values'],
                axisLabel: {
                  fontSize: '10px',
                },
              },
            };
            ele.category.forEach((values: any, i: any) => {
              let obj = {};
              obj = {
                name: values,
                type: 'bar',
                stack: 'total',
                emphasis: {
                  focus: 'series',
                },
                data: [ele.data[i]],
              };
              series.push(obj);
            });

            newObj['series'] = series;
            this.chartData.push(newObj);
          });
        }
      },
      error: (error: any) => {},
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
