import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data'
import Product from '../models/productModel'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils'

const productRouter = express.Router()

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const seller = String(req.query.seller) || ''
        const name = String(req.query.name) || ''
        const category = String(req.query.category) || ''
        const order = String(req.query.order) || ''
        const min =
            req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0
        const max =
            req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0
        const rating =
            req.query.rating && Number(req.query.rating) !== 0
                ? Number(req.query.rating)
                : 0

        const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {}
        const sellerFilter = seller ? { seller } : {}
        const categoryFilter = category ? { category } : {}
        const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {}
        const ratingFilter = rating ? { rating: { $gte: rating } } : {}
        const sortOrder =
            order === 'lowest'
                ? { price: 1 }
                : order === 'highest'
                ? { price: -1 }
                : order === 'toprated'
                ? { rating: -1 }
                : { _id: -1 }

        const products = await Product.find({
            ...sellerFilter,
            ...nameFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .populate('seller', 'seller.name seller.logo')
            .sort(sortOrder)
        res.json(products)
    })
)

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category')
        res.json(categories)
    })
)

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Product.remove({})
        const createdProducts = await Product.insertMany(data.products)
        res.json(createdProducts)
    })
)

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate(
            'seller',
            'seller.name seller.logo seller.rating seller.numReviews'
        )
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    })
)

productRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'Sample name' + Date.now(),
            seller: req.user._id,
            image: '/images/p1.jpg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'Sample description',
        })
        const createdProduct = await product.save()
        res.json({ message: 'Product Created', product: createdProduct })
    })
)

productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id
        const product = await Product.findById(productId)

        if (product) {
            product.name = req.body.name
            product.price = req.body.price
            product.image = req.body.image
            product.category = req.body.category
            product.brand = req.body.brand
            product.countInStock = req.body.countInStock
            product.description = req.body.description

            const updatedProduct = await product?.save()
            res.json({ message: 'Product Upadated', product: updatedProduct })
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    })
)

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            const deletedProduct = await product.remove()
            res.json(deletedProduct)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }
    })
)

export default productRouter
