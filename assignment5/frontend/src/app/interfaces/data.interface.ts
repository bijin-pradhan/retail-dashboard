export interface Averages {
    avg_speed: number,
    avg_prices: {
        avg_22: number,
        avg_21: number,
        avg_20: number,
    },
}

export interface RegionGroups {
    grouped: {
        region: string,
        data: {
            num_countries: number,
            avg_speed: number,
            avg_price: number,
            avg_plans: number,
            expensive: number,
            cheapest: number,
            internet_users: number,
            population: number
        }
    }[]
}

export interface LoginResponse {
    access_token: string,
    is_admin: boolean,
    email: string,
    id: string,
    fullname: string
}

export interface ChartData {
    xAxisData: string[],
    names: string[],
    values: number[][]
}

export interface HeatmapData {
    corr: {
        xAxisData: string[],
        yAxisData: string[],
        seriesData: number[],
    }
}

export interface TreemapData {
    names: string[],
    values: number[],
}
