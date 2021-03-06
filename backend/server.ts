import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cors from 'cors'

import userRouter from './routers/userRouter'
import productRouter from './routers/productRouter'
import orderRouter from './routers/orderRouter'
import uploadRouter from './routers/uploadRouter'
import path from 'path'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/uploads', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '')
})

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'))
})

// app.get('/', (req, res) => {
//     res.send('Server is ready')
// })

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
})
