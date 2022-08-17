import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { ChartData, NameValuePair, ScatterPlotData } from 'src/app/interfaces/chart.interfaces';
import { Averages, Changes, CorrData, RegionGroups } from 'src/app/interfaces/data.interface';

@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit, OnDestroy {
    animatedChartData!: ChartData;

    averagesData!: Observable<Averages>;
    curAvg: number = 0;
    avgPriceYear = 2022;

    changesData!: Observable<Changes>;
    curChange = 0;
    changeYear = '2020 to 2021';

    heatmapData!: Observable<CorrData>;

    treemapData: any;

    piechartData: NameValuePair[] = [];

    scatterPlotData!: ScatterPlotData;
    scatterPlotOption = 'Population';

    internet_users: number[] = [];
    population: number[] = [];
    demographicsOption = 'Population';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _dataService: DataService,
        private cd: ChangeDetectorRef,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit() {
        this.getRegionData();
        this.averagesData = this._dataService.averages();
        this.changesData = this._dataService.changes();
        this.heatmapData = this._dataService.corrHeatMap();
    }

    getRegionData() {
        this._dataService.regionGroups().subscribe((response: RegionGroups) => {
            this.animatedChartData = {
                xAxisData: response.grouped.regions,
                names: response.grouped.names,
                values: response.grouped.values,
            };
            this.population = response.grouped.population;
            this.internet_users = response.grouped.internet_users;
            this.treemapData = {
                names: response.grouped.regions,
                values: this.population,
            }

            let data = []
            for (let i = 0; i < this.population.length; i++) {
                this.piechartData.push({ value: this.population[i], name: response.grouped.regions[i], });
                let row = [this.safeLog(this.population[i]), response.grouped.values[1][i]];
                data.push(row);
            }
            this.scatterPlotData = {
                xAxis: {
                    type: "value",
                    name: 'Log10 of Population',
                    nameLocation: "middle",
                    axisFormatter: '',
                    min: Math.min(...this.population),
                },
                yAxis: {
                    type: "value",
                    name: 'Average Internet Speed in Mb/s',
                    nameLocation: "middle",
                    axisFormatter: '{value} Mb/s',
                    min: this.safeLog(Math.min(...response.grouped.values[1]))
                },
                values: data,
            }
        })
    }


    onClickDemo(option: string) {
        this.demographicsOption = option;
        switch (option) {
            case 'Population':
                this.treemapData = {
                    values: this.population,
                    names: this.animatedChartData!.xAxisData
                }
                break;
            case 'Internet Users':
                this.treemapData = {
                    values: this.internet_users,
                    names: this.animatedChartData!.xAxisData
                }
                break;
        }
    }

    onClickScatter(option: string) {
        this.scatterPlotOption = option;
        switch (option) {
            case 'Population':
                let popdata = []
                for (let i = 0; i < this.population.length; i++) {
                    let row = [this.safeLog(this.population[i]), this.animatedChartData.values[1][i]];
                    popdata.push(row);
                }
                this.scatterPlotData = {
                    xAxis: {
                        type: "value",
                        name: 'Log10 of Population',
                        nameLocation: "middle",
                        axisFormatter: '',
                        min: this.safeLog(Math.min(...this.population))
                    },
                    yAxis: {
                        type: "value",
                        name: 'Average Internet Speed in Mb/s',
                        nameLocation: "middle",
                        axisFormatter: '{value} Mb/s',
                        min: Math.min(...this.animatedChartData.values[1])
                    },
                    values: popdata,
                }
                break;

            case 'Internet Users':
                let data = []
                for (let i = 0; i < this.internet_users.length; i++) {
                    let row = [this.safeLog(this.internet_users[i]), this.animatedChartData.values[1][i]];
                    data.push(row);
                }
                this.scatterPlotData = {
                    xAxis: {
                        type: "value",
                        name: 'Log10 of Internet Uses',
                        nameLocation: "middle",
                        axisFormatter: '',
                        min: this.safeLog(Math.min(...this.internet_users))
                    },
                    yAxis: {
                        type: "value",
                        name: 'Average Internet Speed in Mb/s',
                        nameLocation: "middle",
                        axisFormatter: '{value} Mb/s',
                        min: Math.min(...this.animatedChartData.values[1])
                    },
                    values: data,
                }
                break;
        }
        this.cd.detectChanges();
    }

    safeLog(x: number) {
        if (!isNaN(x) && x > 0) {
            return Math.log10(x);
        }
        return 0;
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */

}

// .subscribe((response: RegionGroups) => {
//     
// })