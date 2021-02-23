import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { UserModel } from "./@types/types"

export const generateToken = (user: UserModel) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        },
        process.env.JWT_SECRET || "dev",
        {
            expiresIn: "30d",
        }
    )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const autorization = req.headers.autorization

    if (autorization) {
        const token = String(autorization.slice(7, autorization.length)) // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || "dev", (err, decode) => {
            if (err) {
                res.status(401).json({ message: "Invalid Token" })
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

export const isSellerOrAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
        next()
    } else {
        res.status(401).send(401)
    }
}
