type Time = {
    uid: string,
    workingHour: number,
    fee: number,
}

export type Shift = Time

export type Duration = Time & {
    description: string
}