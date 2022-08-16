export interface Averages {
    avg_speed: number,
    avg_prices: {
        2022: number,
        2021: number,
        2020: number,
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

export interface Changes {
    changes: {
        change_20_21: number,
        change_21_22: number,
    }
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
