import { ServiceKey, StatusKey } from "../types/Other"

export const typeStatus: Record<StatusKey, { name: string, color: string}> = {
    Waiting: {
        name: 'Chờ xác nhận',
        color: 'yellow',
    },
    Accepted: {
        name: 'Chấp nhận',
        color: 'green',
    },
    Rejected: {
        name: 'Từ chối',
        color: 'red',
    },
    Processing: {
        name: 'Đang xử lý',
        color: 'orange',
    },
    Completed: {
        name: 'Hoàn thành',
        color: 'brown'
    },
    Cancel: {
        name: 'Hủy',
        color: 'red'
    }
}

export const typeService: Record<ServiceKey, { name: string, color: string }> = {
    CLEANING: {
        name: 'Dọn dẹp vệ sinh',
        color: 'red'
    },
    HEALTHCARE: {
        name: 'Chăm sóc sức khỏe',
        color: 'green'
    },
    MAINTENANCE: {
        name: 'Bảo trì thiết bị',
        color: 'orange'
    }
}

export const clientType = {
    user: 'Khách hàng',
    worker: 'Người làm',
    admin: 'Quản trị viên'
}

export const tranlateClientType: Record<string, 'user' | 'worker' | 'admin'> = {
    'Khách hàng': 'user',
    'Người làm': 'worker',
    'Quản trị viên': 'admin'
}