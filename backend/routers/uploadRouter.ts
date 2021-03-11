import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import { isAdmin, isAuth } from '../utils'
import config from '../config'

const uploadRouter = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    },
})

const upload = multer({ storage })

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`)
})

aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
})

const s3 = new aws.S3()
const storageS3 = multerS3({
    s3,
    bucket: 'amazona-ecommerce-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
        cb(null, `${Date.now()}` + file.originalname)
    },
})

const uploadS3 = multer({ storage: storageS3 })
uploadRouter.post('/s3', uploadS3.single('image'), (req: any, res) => {
    res.send(req.file.location)
})

export default uploadRouter
