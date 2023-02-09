export interface User {
    id: number,
    username: string,
    email: string,
    role?: string
    createdAt?: Date,
    modifiedAt?: Date
}
