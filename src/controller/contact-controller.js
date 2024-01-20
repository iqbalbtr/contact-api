import contactService from "../service/contact-service.js"

const create = async (req, res, next) => {
    try {
        const reqCreate = req.body
        const result = await contactService.create(req.userData, reqCreate)
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
        const result = await contactService.get(req.userData, contactId)
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
        const result = await contactService.update(req.userData, reqContact)
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const reqRemove = req.params.contactId
        await contactService.remove(req.userData, reqRemove)
        res.status(200).json({
            data: "OK"
        })
    } catch(e) {
        next(e)
    }
}

const search = async(req, res, next) => {
    try {
        const reqSearch = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            itemPage: req.query.itemPage,
        }
        const result = await contactService.search(req.userData, reqSearch)
        res.status(200).json({
            data: result
        })
    } catch(e) {
        next(e)
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}