import express from "express"
import { publicRouter } from "../router/public-api.js"
import { errorMiddleware } from "../middleware/error-midlleware.js"
import { router } from "../router/api.js"

export const web = express()
web.use(express.json())

// router
web.use(publicRouter)
web.use(router)

web.use(errorMiddleware)
