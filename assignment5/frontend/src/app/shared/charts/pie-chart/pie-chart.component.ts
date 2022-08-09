import { Component, OnInit, Input } from '@angular/core';
import {  EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
    @Input() chartUrl = '';
    _chartOption:EChartsOption = {};

    constructor() {
      
   }

    ngOnInit() {
        this.InitPipe()
    }

    private InitPipe(): void {
      var inx = 2;
      if (this.chartUrl === 'first') {
          inx = 3;
      }
      if (this.chartUrl === 'second') {
        inx = 4;
      }
      if (this.chartUrl === 'third') {
        inx = 5;
      }
      
    
        this._chartOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            //selectedMode: false,
            orient: 'vertical',
            //x: 'left',
            data:['elem1','elem2','elem3','elem4','elem5'].slice(0, inx)
            },
            
        xAxis: {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                }
              },
              yAxis: {
                type: 'value'
              },
        series: [
            {
                name:'NOMBRE',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data:[
                    {value:335, name:'elem1'},
                    {value:310, name:'elem2'},
                    {value:234, name:'elem3'},
                    {value:135, name:'elem4'},
                    {value:1548, name:'elem5'}
                ].slice(0, inx)
            }
            ],
        
        grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true  
            },
        
    
        };
  }
}
