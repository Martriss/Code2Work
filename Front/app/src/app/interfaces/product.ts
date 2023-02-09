export interface Product {
    id: number,
    name: string,
    price: number,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
    sellerId?: number
}
