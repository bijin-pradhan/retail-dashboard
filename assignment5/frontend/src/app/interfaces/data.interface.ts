import { HeatmapData } from "./chart.interfaces"

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
        names: string[],
        regions: string[],
        values: number[][],
        internet_users: number[],
        population: number[],

    }
}

export interface CorrData {
    corr: HeatmapData,
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
