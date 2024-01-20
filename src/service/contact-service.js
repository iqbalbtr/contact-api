import { prisma } from "../../prisma/index.js"
import { ResponseError } from "../errors/response-error.js"
import { createContactValidation, getContactValidation, updateContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/index.js"

const create = async (userData, req) => {

    const contact = validate(createContactValidation, req)
    contact.userId = userData.userId
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

const get = async (userData, contactId) => {

    const validateId = validate(getContactValidation, contactId)

    const queryContact = await prisma.contact.findFirst({
        where: {
            id: validateId,
            userId: userData.userId
        }
    })

    if (!queryContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return queryContact
}

const update = async (userData, req) => {
    const contact = validate(updateContactValidation, req)

    const updateContact = await prisma.contact.update({
        where: {
            id: contact.id,
            userId: userData.userId
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

const remove = async (userData, req) => {
    const contactId = validate(getContactValidation, req)

    const deleteContact = await prisma.contact.delete({
        where: {
            id: contactId,
            userId: userData.userId
        }
    })

    if (!deleteContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return "OK"
}

const search = async (userData, req) => {

    const page = req.page ? req.page : 1
    const itemsPage = req.itemPage ? req.itemPage : 5
    const skip = (page - 1) * itemsPage

    const filters = [
        {
            userId: userData.userId
        }
    ]

    if (req.name) {
        filters.push({
            OR: [
                {
                    first_name: req.name
                },
                {
                    last_name: req.name
                }
            ]
        })
    }

    if (req.email) {
        filters.push({
            email: req.email
        })
    }

    if (req.phone) {
        filters.push({
            phone: req.phone
        })
    }

    const queryContact = await prisma.user.findFirst({
        where: {
            id: userData.userId
        },
        select: {
            name: true,
            username: true,
            Contact: {
                where: {
                    AND: filters,
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true,
                    phone: true
                },
                take: itemsPage,
                skip: skip
            }
        }
    })

    const countContact = await prisma.contact.count({
        where: {
            userId: userData.userId
        }
    })

    if (!queryContact) {
        throw new ResponseError(404, "Contact is not found")
    }

    return {
        result: queryContact,
        pagging: {
            page: +page,
            total_item: countContact,
            total_page: Math.ceil(parseFloat(countContact / itemsPage))
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}