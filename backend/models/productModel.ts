import mongoose, { Document } from 'mongoose'

interface Product {
    name: string
    seller?: any
    category: string
    image: string
    price: number
    brand: string
    rating: number
    numReviews: number
    description: string
    countInStock: number
}

interface ProductModel extends Document, Product {}

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        description: { type: String, required: true },
        countInStock: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model<ProductModel>('Product', productSchema)

export default Product
