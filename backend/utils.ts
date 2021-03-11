import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { OrderModel, UserModel } from './@types/types'
import mg from 'mailgun-js'

export const generateToken = (user: UserModel) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        },
        process.env.JWT_SECRET || 'dev',
        {
            expiresIn: '30d',
        }
    )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const autorization = req.headers.autorization

    if (autorization) {
        const token = String(autorization.slice(7, autorization.length)) // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'dev', (err, decode) => {
            if (err) {
                res.status(401).json({ message: 'Invalid Token' })
            } else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).send(401)
    }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send(401)
    }
}

export const isSeller = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401).send(401)
    }
}

export const isSellerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
        next()
    } else {
        res.status(401).send(401)
    }
}

export const mailgun = () =>
    mg({
        apiKey: String(process.env.MAILGUN_API_KEY),
        domain: String(process.env.MAILGUN_DOMAIN),
    })

export const payOrderEmailTemplate = (order: OrderModel) => {
    return `<h1>Thanks for shopping with us</h1>
    <p>
    Hi ${order.user.name},<p>
    <p>We have finished processing your order.</p>
    <h2>[Order ${order._id}] (${order.createdAt?.toString().substring(0, 10)})</h2>
    <table>
        <thead>
            <tr>
                <td><strong>Product</strong></td>
                <td><strong>Quantity</strong></td>
                <td><strong align="right">Price</strong></td>
            </tr>
        </thead>
        <tbody>
            ${order.orderItems
                ?.map(
                    (item) => `
                <tr>
                    <td>${item.name}</td>
                    <td align="center">${item.qty}</td>
                    <td align="right">$${item.price.toFixed(2)}</td>
                </tr>
            `
                )
                .join('\n')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">Items Price:</td>
                <td align="right">$${order.itemsPrice?.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Tax Price:</td>
                <td align="right">$${order.taxPrice?.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Shipping Price:</td>
                <td align="right">$${order.shippingPrice?.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Total Price:</strong></td>
                <td align="right"><strong>$${order.totalPrice?.toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td colspan="2">Payment Method:</td>
                <td align="right">${order.paymentMethod}</td>
            </tr>
        </tfoot>
    </table>
    <h2>Shipping Address</h2>
    <p>
        ${order.shippingAddress?.fullName},<br/>
        ${order.shippingAddress?.address},<br/>
        ${order.shippingAddress?.city},<br/>
        ${order.shippingAddress?.country},<br/>
        ${order.shippingAddress?.postalCode}
    </p>
    <hr />
    <p>Thank you for shopping with us.</p>
    `
}
