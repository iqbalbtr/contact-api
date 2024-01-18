import { prisma } from "../../prisma/index.js"
import { logger } from "../application/logging.js"
import { ResponseError } from "../errors/response-error.js"
import { validate } from "../validation/index.js"
import { registerUserValidation } from "../validation/user-validation.js"
import bcrypt from 'bcrypt'

const register = async (req) => {

    const user = validate(registerUserValidation, req)
    
    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exist")
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

export default {
    register
}