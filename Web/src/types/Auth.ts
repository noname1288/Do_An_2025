export type Login = {
    email: string,
    password: string
}

export type Register = {
    email: string,
    password: string,
    confirmPassword: string,
    role: 'user' | 'worker' | 'admin'
}

export type ForgotPassword = {
    email: string,
    code: string,
    codeEnter: string,
    newPassword: string,
    confirmPassword: string
}