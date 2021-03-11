import { Document } from 'mongoose'

/* User definition */
interface User {
    _id: string
    name: string
    email: string
    password: string
    isAdmin: boolean
    isSeller: boolean
    seller: {
        name: string
        logo: string
        description: string
    }
}

interface UserModel extends Document, User {}

/* Order definition */

interface Order {
    orderItems: [
        {
            name: string
            qty: number
            image: string
            price: number
            product: string
        }
    ]
    shippingAddress: {
        fullName: string
        address: string
        city: string
        postalCode: string
        country: string
    }
    createdAt: number
    paymentMethod: string
    itemsPrice: number
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    user: any
    isPaid: boolean
    paidAt: number
    isDelivered: boolean
    deliveredAt: number
    paymentResult: {
        id: string
        status: string
        update_time: string
        email_address: string
    }
}

interface OrderModel extends Document, Order {}
