import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { createContactValidation, getContactValidation, updateContactValidation } from "../validation/contact-validation.js"
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

const update = async(req, userId) => {
    const contact = validate(updateContactValidation, req)

    const updateContact = await prisma.contact.update({
        where: {
            id: contact.id,
            userId: userId
        },
        data: {
            first_name: contact.first_name,
            last_name: contact.last_name || null,
            email: contact.email || null,
            phone: +contact.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            phone: true,
            email: true,
            userId: true
        }
    })
    
    if (!updateContact) {
        throw new ResponseError(404, "Contact not found")
    }

    return updateContact
}

const remove = async(reqContact, userId) => {
    const contactId = validate(getContactValidation, reqContact)

    const deleteContact = await prisma.contact.delete({
        where: {
            id: contactId,
            userId: userId
        }
    })

    if (!deleteContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return "OK"
}

const getAll = async(req) => {
    const queryContact = await prisma.user.findFirst({
        where: {
            id: req
        },
        select: {
            name: true,
            username: true,
            Contact: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    phone: true
                }
            }
        }
    })

    if (!queryContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return queryContact
}

export default {
    create,
    get,
    update,
    remove,
    getAll
}