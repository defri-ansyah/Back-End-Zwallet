const express = require('express');
const {uploadMulter} = require('../middlewares/upload')
const router = express.Router();
const usersController = require('../controllers/users');
const {verifyAccess} = require('../middlewares/auth');
const { getDetailUser} = require('../middlewares/redis');

router
  .get('/', usersController.getUsers)
  .get('/refresh-token', verifyAccess, usersController.refreshToken)
  .get('/:id', verifyAccess, getDetailUser, usersController.detailUser)
  .post('/login', usersController.login)
  .post('/signup', uploadMulter.single('image'), usersController.signUp)
  .post('/insert-pin', usersController.insertPin)
  .post('/forgot-password/request', usersController.reqForgotPassword)
  .patch('/forgot-password/new-password', usersController.forgotPassword)
  .get('/email-verif/:token', usersController.emailVerif)
  .patch('/update-image', uploadMulter.single('image'), usersController.updateImage)
  .delete('/:id', verifyAccess, usersController.deleteUser)

module.exports = router;
