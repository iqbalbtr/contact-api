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

const update = async(req, res, next) => {
    try {
        const reqUpdate = req.body
        const contactId = req.params.contactId
        reqUpdate.id = req.params.addressId
        const result = await addressService.update(req.userData, contactId, reqUpdate)
        res.status(200).json({
            data: result
        })
    } catch(e) {
        next(e)
    }
} 

const remove = async(req, res, next) => {
    try {
        const addressId = req.params.addressId
        const contactId = req.params.contactId
        await addressService.remove(req.userData ,contactId, addressId)
        res.status(200).json({
            message: "OK"
        })
    } catch(e) {
        next(e)
    }
}

const list = async(req, res, next) => {
    try {
        const contactId = req.params.contactId
        const result = await addressService.list(contactId)
        res.status(200).json({
            data: result
        })
    } catch(e) {
        next(e)
    }
}

export default {
    create,
    update,
    remove,
    list
}