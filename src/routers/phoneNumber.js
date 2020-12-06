const express = require('express');

const router = express.Router();
const phoneNumberController = require('../controllers/phoneNumber');

router
  .get('/:user_id', phoneNumberController.phoneNumber)
  .post('/add', phoneNumberController.addPhoneNumber)
  .delete('/:id', phoneNumberController.deletePhoneNumber);
// .post('/insert-pin', usersController.insertPin)
// .post('/forgot-password/request', usersController.reqForgotPassword)
// .patch('/forgot-password/new-password', usersController.forgotPassword)
// // .delete('/:iduser', productController.deleteProduct)
module.exports = router;
