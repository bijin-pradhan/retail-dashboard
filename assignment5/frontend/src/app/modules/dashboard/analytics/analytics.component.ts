import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { Averages, HeatmapData, RegionGroups } from 'src/app/interfaces/data.interface';
@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit, OnDestroy {
    animatedChartData: any;

    averagesData: any;

    curAvg: number = 0;
    yearOptions = [2022, 2021, 2020];
    avgPriceYear = 2022;

    curChange = 0;
    changeOptions = ['2020 to 2021', '2021 to 2022'];
    changeYear = this.changeOptions[0];

    heatmapData: any;

    treemapData: any;
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
        this.getAverages();
        this.getCorrData();
    }

    getRegionData() {
        this._dataService.regionGroups().subscribe((response: RegionGroups) => {
            let names = [
                'Number of Countries',
                'Average Price of 1GB',
                'Average Speed',
                'Average Num of Plans',
                'Cheapest 1GB',
                'Most Expensive 1GB',
                '% of Population that uses Internet'
            ];
            let values: number[][] = [[], [], [], [], [], [], []]
            let xAxisData = [];
            for (let regionGroup of response.grouped) {
                xAxisData.push(regionGroup.region)
                values[0].push(regionGroup.data.num_countries)
                values[1].push(regionGroup.data.avg_price)
                values[2].push(regionGroup.data.avg_speed)
                values[3].push(regionGroup.data.avg_plans)
                values[4].push(regionGroup.data.cheapest)
                values[5].push(regionGroup.data.expensive)
                this.internet_users.push(regionGroup.data.internet_users)
                this.population.push(regionGroup.data.population)
                let ratio = regionGroup.data.internet_users / regionGroup.data.population;
                ratio = Math.round(ratio * 10000) / 100;
                values[6].push(ratio);
            }
            this.animatedChartData = {
                xAxisData: xAxisData,
                names: names,
                values: values,
            };
            this.treemapData = {
                names: xAxisData,
                values: this.population,
            }
            this.cd.detectChanges();
        })
    }

    getAverages() {
        this._dataService.averages().subscribe((response: Averages) => {
            this.averagesData = response as Averages;
            this.averagesData.avg_speed = Math.round(response.avg_speed * 100) / 100;
            this.averagesData.avg_prices.avg_22 = Math.round(response.avg_prices.avg_22 * 100) / 100;
            this.averagesData.avg_prices.avg_21 = Math.round(response.avg_prices.avg_21 * 100) / 100;
            this.averagesData.avg_prices.avg_20 = Math.round(response.avg_prices.avg_20 * 100) / 100;
            this.curAvg = this.averagesData.avg_prices.avg_22;
            this.curChange = response.avg_prices.avg_21 - response.avg_prices.avg_20;
            this.curChange = Math.round(this.curChange * 100) / 100;
            this.cd.detectChanges();
        })
    }

    getCorrData() {
        this._dataService.corrHeatMap().subscribe((response: HeatmapData) => {
            this.heatmapData = response;
            this.cd.detectChanges();
        })
    }

    onClickAvgPrice(option: number) {
        this.avgPriceYear = option;
        switch (option) {
            case 2022:
                this.curAvg = this.averagesData.avg_prices.avg_22;
                break;
            case 2021:
                this.curAvg = this.averagesData.avg_prices.avg_21;
                break;
            case 2020:
                this.curAvg = this.averagesData.avg_prices.avg_20;
                break;
            default:
                this.curAvg = 0;
        }
    }

    onClickChanges(option: string) {
        this.changeYear = option;
        switch (option) {
            case this.changeOptions[0]:
                this.curChange = this.averagesData.avg_prices.avg_21 - this.averagesData.avg_prices.avg_20;
                break;
            case this.changeOptions[1]:
                this.curChange = this.averagesData.avg_prices.avg_22 - this.averagesData.avg_prices.avg_21;
                break;
        }
        this.curChange = Math.round(this.curChange * 100) / 100;
    }

    onClickDemo(option: string) {
        this.demographicsOption = option;
        switch (option) {
            case 'Population':
                this.treemapData = {
                    values: this.population,
                    names: this.animatedChartData.xAxisData
                }
                break;
            case 'Internet Users':
                this.treemapData = {
                    values: this.internet_users,
                    names: this.animatedChartData.xAxisData
                }
                break;
        }
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