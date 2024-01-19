import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { createContactValidation, getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/index.js"

const create = async(req) => {

    const contact = validate(createContactValidation, req.body)
    contact.userId = req.userData.userId
    contact.phone = +contact.phone

    const countPhone = await prisma.contact.count({
        where: {
            phone: contact.phone
        }
    })

    if (countPhone >= 1) {
        throw new ResponseError(400, "Phone already exist")
    } 

    const createContact = await prisma.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            phone: true,
            email: true
        }
    })

    return createContact
}

const get = async(contactId, req) => {
    
    const validateId = validate(getContactValidation, contactId)

    const queryContact = await prisma.contact.findFirst({
        where: {
            id: validateId,
            userId: req.userData.userId
        }
    })

    if (!queryContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return queryContact
}

export default {
    create,
    get
}