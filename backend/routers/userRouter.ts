import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import data from '../data'
import User from '../models/userModel'
import { generateToken, isAdmin, isAuth } from '../utils'

const userRouter = express.Router()

userRouter.get(
    '/top-sellers',
    expressAsyncHandler(async (req, res) => {
        const topSellers = await User.find({ isSeller: true })
            .sort({ 'seller.rating': -1 })
            .limit(3)
        res.json(topSellers)
    })
)

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await User.remove({})
        const createdUsers = await User.insertMany(data.users)
        res.json(createdUsers)
    })
)

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(user),
                })
                return
            }
            res.status(401).json({ message: 'Invalid email or password' })
        }
    })
)

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        const createdUser = await user.save()
        res.json({
            _id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: createdUser.isSeller,
            token: generateToken(createdUser),
        })
    })
)

userRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (user) {
            res.json(user)
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    })
)

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (user.isSeller) {
                if (user) {
                    user.seller.name = req.body.seller.name || user.seller?.name
                    user.seller.logo = req.body.seller.logo || user.seller?.logo
                    user.seller.description =
                        req.body.seller.description || user.seller?.description
                }
            }
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }
            const updatedUser = await user.save()
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                isSeller: updatedUser.isSeller,
                token: generateToken(updatedUser),
            })
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    })
)

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({})
        res.json(users)
    })
)

userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (user) {
            if (user.isAdmin) {
                res.status(400).json({ message: 'Can Not Delete Admin User' })
                return
            }
            const deletedUser = await user.remove()
            res.json({ message: 'User Deleted', user: deletedUser })
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    })
)

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id)
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.isAdmin = Boolean(req.body.isAdmin)
            user.isSeller = Boolean(req.body.isSeller)
            const updatedUser = await user.save()
            res.json({ message: 'User Updated', user: updatedUser })
        } else {
            res.status(404).json({ message: 'User Not Found' })
        }
    })
)

export default userRouter
