import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result.updateToken,
            accessToken: result.token
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const result = await userService.get(req.userData)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const reqUpdate = req.body
        const result = await userService.update(req.userData, reqUpdate)
        res.status(200).json({
            data: result
        })
    } catch(e) {
        next(e)
    }
}

const logout = async(req, res, next) => {
    try {
        const result = await userService.logout(req.userData)
        res.status(200).json({
            data: result,
            message: "OK"
        })
    } catch(e) {
        next(e)
    }
}

export default {
    register,
    login,
    get,
    update,
    logout
}