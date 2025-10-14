import { typeService, typeStatus } from "../utils/data"
import { User, Worker } from "./Client"

export type Order = {
    uid: string,
    jobID: string,
    worker: Worker | null,
    user: User | null,
    price: number,
    status: keyof typeof typeStatus,
    isReview: boolean,
    serviceType: keyof typeof typeService,
    createdAt: string
}