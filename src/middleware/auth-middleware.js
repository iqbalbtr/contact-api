import { prisma } from "../../prisma/index.js"
import jwt from 'jsonwebtoken'

export const authMiddleware = async(req, res, next) => {
    const token = req.get("authorization")

    if (!token) {
        res.status(401).json({
            message: "Access denied"
        }).end()
    } else {
        const queryToken = await prisma.user.findFirst({
            where: {
                token: token
            }
        })
        if (!queryToken) {
            res.status(401).json({
                message: "Access denied"
            }).end()
        }

        try {
            const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY) 
            req.userData = verifyToken
            next()
        } catch(e) {
            res.status(401).json({
                message: "Token expired"
            }).end()
        }
    }
}