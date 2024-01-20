import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { createAddresValidation } from "../validation/address-validation.js"
import { getContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/index.js"

const existingContact = async(userData, req) => {
    const contactId = validate(getContactValidation, req)

    const queryContact = await prisma.contact.findFirst({
        where: {
            id: contactId,
            userId: userData.userId
        }
    })

    if (!queryContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return queryContact
}

const create = async(userData, contactId, req) => {
    
    const address = validate(createAddresValidation, req)
    const contact = await existingContact(userData, contactId)

    address.postal_code = +address.postal_code
    address.contactId = contact.id

    const createContact = await prisma.address.create({
        data: address,
        select: {
            city: true,
            province: true,
            postal_code: true,
            street: true,
            country: true,
            id: true
        }
    })


    return createContact
}


export default {
    create
}