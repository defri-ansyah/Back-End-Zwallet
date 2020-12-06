const express = require('express');

const router = express.Router();
const transactionsController = require('../controllers/transactions');
const { getAllHistory} = require('../middlewares/redis');

router
  .post('/transfer', transactionsController.transfer)
  .get('/req-transfer', transactionsController.checkBalance)
  .get('/history', getAllHistory, transactionsController.history);
module.exports = router;
