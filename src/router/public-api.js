import express from 'express'
import userController from '../controller/user-controller.js'

export const router = new express.Router()

router.post("/api/users", userController.register)
router.post("/api/users/login", userController.login)