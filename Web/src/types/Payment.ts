import { typeService } from "../utils/data"

export type Payment = {
    uid: string,
    jobID: string,
    userID: string,
    amount: number,
    serviceType: keyof typeof typeService,
    createdAt: string
}