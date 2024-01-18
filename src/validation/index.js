import { ResponseError } from "../errors/response-error.js"

const validate = (schema, req) => {
    const result = schema.validate(req)
    if (result.error) {
        throw new ResponseError(400, result.error.message)
    } else {
        return result.value
    }
}

export {
    validate
}