import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExploreService } from '../../explore.service';

@Component({
  selector: 'app-clustered-histogram',
  templateUrl: './clustered-histogram.component.html',
  styleUrls: ['../bar-chart/bar-chart.component.scss'],
})
export class ClusteredHistogramComponent implements OnInit, OnDestroy {
  chartName: any;
  responseData: any = {};
  param: any;
  sub!: Subscription;
  constructor(private exportService: ExploreService) {}
  loader: boolean = true;
  @Input() params: any;
  @Input() chartId!: string;
  @Input() reportId!: string;
  chartData: any;
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
    this.exportService.getReportData(this.param).subscribe({
      next: (res: any) => {
        this.responseData = res;
        if (res.data !== null) {
          this.loader = false;
          this.chartData = [];
          let newObj = {};
          res.data[0].report_data.forEach((ele: any, i: any) => {
            let index = i + 1;
            this.chartName = ele.title;
            newObj = {
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
              xAxis: {
                type: 'category',
                data: ele.category,
                name: ele.labelX,
                nameLocation: 'middle',
                nameGap: 50,
                axisLabel: {
                  fontSize: '10px',
                },
              },
              yAxis: {
                type: 'value',
                name: ele.labelY,
                nameLocation: 'middle',
                nameGap: 40,
                axisLabel: {
                  fontSize: '10px',
                },
              },
              series: [
                {
                  data: ele.data,
                  type: 'bar',
                },
              ],
            };
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
