export interface ResultType {
    provider: string,
    serviceName: string,
    price: string,
    configName?: string,
    rating?: number,
}

export interface CompleteResultType {
    provider: string,
    serviceName: string,
    price: string,
    rating: number,
    configName?: string,
}
