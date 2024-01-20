import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { validate } from "../validation/index.js"
import { getUserValidaion, loginUserValidation, registerUserValidation, updatUserValidation } from "../validation/user-validation.js"
import bcrypt from 'bcrypt'
import { v4 as uuid } from "uuid"
import jwt from "jsonwebtoken"

const register = async (req) => {

    const user = validate(registerUserValidation, req)

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(401, "Username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    const result = await prisma.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })

    return result
}

const login = async (req) => {

    const user = validate(loginUserValidation, req)

    const queryUser = await prisma.user.findFirst({
        where: {
            username: user.username
        }
    })

    if (!queryUser) {
        throw new ResponseError(401, "Username not found")
    }

    const isCompare = await bcrypt.compare(user.password, queryUser.password)

    if (!isCompare) {
        throw new ResponseError(401, "Username or password wrong!")
    }

    const payload = {
        name: queryUser.name,
        username: user.username
    }
    const expiresIn = 1 * 60 * 60 * 1000

    const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
        expiresIn: expiresIn
    })

    const updateToken = await prisma.user.update({
        data: {
            token: token
        },
        where: {
            username: queryUser.username
        },
        select: {
            name: true,
            username: true,
        }
    })

    return { updateToken, token }

}

const get = async (req) => {

    const user = validate(getUserValidaion, req.username)

    const queryUser = await prisma.user.findUnique({
        where: {
            username: user.username
        },
        select: {
            username: true,
            name: true
        }
    })

    if (!queryUser) {
        throw new ResponseError(401, "Username not found")
    }

    return queryUser
}

const update = async (userData, req) => {

    const data = {}
    data.username = userData.username

    if (req.name) {
        data.name = req.name
    }
    if (req.password) {
        const password = await bcrypt.hash(req.password, 10)
        data.password = password
    }

    return prisma.user.update({
        where: {
            username: data.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

const logout = async (req) => {
    const result = await prisma.user.update({
        where: {
            username: req.username
        },
        data: {
            token: null
        }, select: {
            username: true
        }
    })

    return result
}

export default {
    register,
    login,
    get,
    update,
    logout
}