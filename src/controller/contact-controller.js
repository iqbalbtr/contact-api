import contactService from "../service/contact-service.js"

const create = async(req, res, next) => {
    try {
        const result = await contactService.create(req)
        res.status(200).json({
            data: result
        }) 
    } catch(e) {
        next(e)
    }
}

export default {
    create
}