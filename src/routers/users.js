const { Router } = require('express')
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users')
router
    .get('/', usersController.getUsers)
    .get('/:id', usersController.detailUser)
    .post('/login', usersController.login)
    .post('/signup', usersController.signUp)
    .post('/insert-pin', usersController.insertPin)
    .post('/forgot-password/request', usersController.reqForgotPassword)
    .patch('/forgot-password/new-password', usersController.forgotPassword)
    // .delete('/:iduser', productController.deleteProduct)
module.exports = router