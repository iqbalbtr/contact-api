import express from "express"
import { router } from "../router/public-api.js"
import { errorMiddleware } from "../middleware/error-midlleware.js"

export const web = express()

web.use(express.json())
web.use(router)
web.use(errorMiddleware)
