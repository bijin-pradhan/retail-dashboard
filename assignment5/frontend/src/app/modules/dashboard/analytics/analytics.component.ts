import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/core/services/data.service';
import { Averages, Changes, HeatmapData, RegionGroups } from 'src/app/interfaces/data.interface';
@Component({
    selector: 'analytics',
    templateUrl: './analytics.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsComponent implements OnInit, OnDestroy {
    animatedChartData: any;

    averagesData: Observable<Averages> = new Observable<Averages>();
    curAvg: number = 0;
    avgPriceYear = 2022;

    changesData: Observable<Changes> = new Observable<Changes>();
    curChange = 0;
    changeYear = '2020 to 2021';

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
        this.averagesData = this._dataService.averages();
        this.changesData = this._dataService.changes();
        this.heatmapData = this._dataService.corrHeatMap();
    }

    getRegionData() {
        this._dataService.regionGroups().subscribe((response: RegionGroups) => {
            console.log(response)
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
            this.cd.detectChanges();
        })
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