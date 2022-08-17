import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ClusteredBarComponent } from './clustered-bar/clustered-bar.component';
import { ClusteredHistogramComponent } from './clustered-histogram/clustered-histogram.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { TreemapComponent } from './treemap/treemap.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [ChartComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AreaChartComponent,
    BarChartComponent,
    ClusteredBarComponent,
    ClusteredHistogramComponent,
    ChartComponent,
    HeatmapComponent,
    PieChartComponent,
    ScatterPlotComponent,
    TreemapComponent,
  ]
})
export class ChartModule {
  constructor() {
    //translate.use(window.localStorage.getItem('prefLanguage') || 'en')
  }
}
