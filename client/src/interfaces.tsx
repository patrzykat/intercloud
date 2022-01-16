export interface ResultType {
    provider: string,
    serviceName: string,
    price: number,
    configName?: string,
    rating?: number,
}

export interface CompleteResultType {
    provider: string,
    serviceName: string,
    price: number,
    rating: number,
    configName?: string,
}
