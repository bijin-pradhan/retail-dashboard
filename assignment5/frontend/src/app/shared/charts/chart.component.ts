import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-charts',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit {
  @Input() chartData: any = null;
  @Input() chartType: any = '';
  constructor() { }

  ngOnInit() {
  }
}
