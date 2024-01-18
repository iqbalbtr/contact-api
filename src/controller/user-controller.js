import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        console.log("controller user :", req.body)
        const result = await userService.register(req.body)
        res.status(200).json({
            data: result
        })
    } catch(e) {
        next(e)
    }
}

export default {
    register
}