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
        const sellerFilter = seller ? { seller } : {}
        const products = await Product.find({ ...sellerFilter }).populate(
            'seller',
            'seller.name seller.logo'
        )
        res.json(products)
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
    isAdmin,
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
