// used by area/bar charts
export interface ChartData {
    xAxisData: string[],
    names: string[],
    values: number[][],
}

export interface HeatmapData {
    xAxisData: string[],
    yAxisData: string[],
    seriesData: number[],
}

export interface TreemapData {
    names: string[],
    values: number[],
}

export interface NameValuePair {
    value: number,
    name: string,
}

export interface ScatterPlotData {
    xAxis: {
        type: "value" | "category" | "time" | "log" | undefined,
        name: string,
        nameLocation: "start" | "middle" | "end" | undefined,
        axisFormatter: string,
        min: number,
    },
    yAxis: {
        type: "value" | "category" | "time" | "log" | undefined,
        name: string,
        nameLocation: "start" | "middle" | "end" | undefined,
        axisFormatter: string,
        min: number,
    }
    values: number[][],
}