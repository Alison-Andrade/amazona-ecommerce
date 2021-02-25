// declare module 'react-redux'

interface Window {
    paypal: any
}

interface Props {
    id: string
}

interface SellerInterface {
    // _id: string
    name: string
    logo: string
    description: string
    rating?: number
    numReviews?: number
}

interface ProductInterface {
    _id: string
    name: string
    seller?: {
        _id: string
        seller: SellerInterface
    }
    category: string
    image: string
    price: number
    brand: string
    rating?: number | 0
    numReviews?: number
    description: string
    countInStock: number
}

// Type product list
type ProductListState = {
    loading: boolean
    error?: string
    products?: ProductInterface[]
}

// Type product
type ProductState = {
    loading?: boolean
    success?: boolean
    error?: string
    product?: ProductInterface
}

// Type Cart
interface ProductCartInterface {
    name: string
    seller: SellerInterface
    image: string
    price: number
    countInStock: number
    product: string
    qty: number
}

interface AdressInterface {
    fullName: string
    address: string
    city: string
    postalCode: string
    country: string
}

type CartState = {
    cartItems: ProductCartInterface[]
    shippingAddress: AdressInterface
    paymentMethod: string
    itemsPrice?: number
    shippingPrice?: number
    taxPrice?: number
    totalPrice?: number
}

type OrderState = {
    success?: boolean
    order?: Order
    loading?: boolean
    error?: string
}

type OrderListState = {
    orders?: Order[]
    loading?: boolean
    error?: string
}

interface Order {
    _id?: string
    user?: User
    shippingAddress?: AdressInterface
    isPaid?: boolean
    isDelivered?: boolean
    orderItems?: ProductCartInterface[]
    paymentMethod?: string
    itemsPrice?: number
    shippingPrice?: number
    taxPrice?: number
    totalPrice?: number
    deliveredAt?: string
    paidAt?: string
    paymentResult?: PaymentResult
    createdAt?: string
}

interface PaymentResult {
    id: string
    status: string
    update_time: string
    email_address: string
}

type PaymentState = {
    paymentResult?: PaymentResult
    loading?: boolean
    success?: boolean
    error?: string
}

interface UserInterface {
    _id: string
    name: string
    email: string
    password: string
    isSeller?: boolean
    isAdmin?: boolean
    token?: string
    seller?: SellerInterface
}

interface UserUpdateInterface {
    _id: string
    name?: string
    email?: string
    password?: string
    isSeller?: boolean
    isAdmin?: boolean
    seller?: SellerInterface
}

type UserState = {
    loading?: boolean
    error?: string
    success?: boolean
    userInfo?: UserInterface
}

type UserListState = {
    loading?: boolean
    error?: string
    success?: boolean
    users?: UserInterface[]
}
