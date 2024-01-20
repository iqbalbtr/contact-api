import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { createAddresValidation } from "../validation/address-validation.js"
import { validate } from "../validation/index.js"

const create = async(userData, contactId, req) => {
    
    const address = validate(createAddresValidation, req)

    const countContact = await prisma.contact.count({
        where: {
            id: contactId,
            userId: userData.userId
        }
    })

    if (countContact < 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    address.postal_code = +address.postal_code
    address.contactId = contactId 

    const createContact = await prisma.adress.create({
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