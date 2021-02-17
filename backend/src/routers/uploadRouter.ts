import express from 'express'
import multer from 'multer'
import { isAdmin, isAuth } from '../utils';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`)
    }
})

const upload = multer({ storage })

uploadRouter.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    console.log(req.file.path)
    res.send(`/${req.file.path}`)
})

export default uploadRouter