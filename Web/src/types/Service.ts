import { typeService } from "../utils/data"

type Service = {
    uid: string,
    image: string,
    serviceName: string,
    serviceType: keyof typeof typeService,
}

export type CleaningService = Service & {
    tasks: string[]
}

export type HealthcareService = Service & {
    duties: string[],
    excludedTasks: string[]
}

export type MaintenanceService = Service & {
    powers: string[],
    maintenance: string
}