const { Router } = require('express')
const express = require('express')
const router = express.Router()
const transactionsController = require('../controllers/transactions')
router
    .post('/transfer', transactionsController.transfer)
    .get('/req-transfer', transactionsController.checkBalance)
    .get('/history', transactionsController.history)
module.exports = router