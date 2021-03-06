import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Order from '../models/orderModel'
import {
    isAdmin,
    isAuth,
    isSellerOrAdmin,
    mailgun,
    payOrderEmailTemplate,
} from '../utils'

const orderRouter = express.Router()

orderRouter.get(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const seller = String(req.query.seller) || ''
        const sellerFilter = seller ? { seller } : {}
        const orders = await Order.find({ ...sellerFilter }).populate('user', 'name')
        res.json(orders)
    })
)

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({
            user: req.user._id,
        })
        res.json(orders)
    })
)

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: 'Cart is empty' })
        } else {
            const order = new Order({
                seller: req.body.orderItems[0].seller,
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
            })
            const createdOrder = await order.save()
            res.status(201).json({
                message: 'New Order Created',
                order: createdOrder,
            })
        }
    })
)

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.json(order)
        } else {
            res.json({ message: 'Order Not Found' })
        }
    })
)

orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'email name')
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.params.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save()
            mailgun()
                .messages()
                .send(
                    {
                        from: 'Amazona <amazona@mg.amazona.com>',
                        to: `${order.user.name} <${order.user.email}>`,
                        subject: `New order ${order._id}`,
                        html: payOrderEmailTemplate(order),
                    },
                    (error, body) => {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log(body)
                        }
                    }
                )
            res.json({ message: 'Order Paid', updatedOrder })
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    })
)

orderRouter.put(
    '/:id/deliver',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isDelivered = true
            order.deliveredAt = Date.now()
            const updatedOrder = await order.save()
            res.json({ message: 'Order Delivered', updatedOrder })
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    })
)

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id)
        if (order) {
            const deleteOrder = await order.remove()
            res.json({ message: 'Order deleted', order: deleteOrder })
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    })
)

export default orderRouter
