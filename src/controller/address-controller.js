import addressService from "../service/address-service.js"

const create = async(req, res, next) => {
    try {
        const result = await addressService.create(req.userData, req.params.contactId, req.body)
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