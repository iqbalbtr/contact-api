import contactService from "../service/contact-service.js"

const create = async (req, res, next) => {
    try {
        const result = await contactService.create(req)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const result = await contactService.get(contactId, req)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const reqContact = req.body
        reqContact.id = req.params.contactId
        const result = await contactService.update(reqContact, req.userData.userId)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        await contactService.remove(req.params.contactId, req.userData.userId)
        res.status(200).json({
            data: "OK"
        })
    } catch(e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    remove
}