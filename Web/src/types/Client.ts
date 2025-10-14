export type Client = {
    uid: string,
    username: string,
    gender: string,
    dob: string,
    avatar: string,
    email: string,
    tel: string,
    location: string,
    role: string,
}

export type User = Client

export type Admin = Client

export type Worker = Client & {
    bankName: string,
    bankNumber: string,
    description: string
}