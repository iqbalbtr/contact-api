import { ResponseError } from "../errors/response-error.js"

const validate = (schema, req) => {
    const result = schema.validate(req, {
        abortEarly: false, //pengecekan secara kesulurahan
        allowUnknown: false //auto reject jila ada field tambahan
    })
    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export {
    validate
}