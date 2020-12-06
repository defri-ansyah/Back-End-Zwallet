const modelUsers = require('../models/users');
const helpers = require('../helpers/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require("redis");
const client = redis.createClient(6379);
const {sendEmail} = require('../helpers/email')

const users = {
  getUsers: (req, res) => {
    const { search } = req.query;
    modelUsers.getUsers(`%${search}%`)
      .then((result) => {
        const resultUsers = result;
        helpers.response(res, resultUsers, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  detailUser: (req, res) => {
    const { id } = req.params;
    modelUsers.detailUsers(id)
      .then((result) => {
        const resultUsers = result[0];
        client.setex("user"+id, 60 * 60, JSON.stringify(resultUsers))
        helpers.response(res, resultUsers, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    modelUsers.login(email)
      .then((user) => {
        bcrypt.compare(password, user.password, function (err, resCheck) {
        let status = 200;
        if (user.length === 0 && !resCheck) status = 404;
        const data = user[0];
        jwt.sign({ userID: data.id, email: data.email, roleID: data.role_id }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          // return res.send(token);
          data.token = token
          helpers.response(res, data, status);
        })
        })
      })
      .catch((err) => {
        console.log(err);
      });
  },
  signUp: (req, res) => {
    const { username, email, password } = req.body;
    modelUsers.cekEmail(email)
      .then((checkEmail) => {
        if (checkEmail.length !== 0) {
          const status = 409;
          helpers.response(res, checkEmail, status);
        } else {
          const image = `${req.get('host')}/upload/${req.file.filename}`;    
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                modelUsers.createAccount(username, email, hash, image)
                  .then((createAccount) => {
                    let status = 200;
                    if (createAccount === 0) status = 400;
                    jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
                      const message = `${process.env.BASE_URL}users/email-verif/${token}`;
                      sendEmail(email, message)
                        .then(()=>{
                          helpers.response(res, createAccount, status);
                        })
                        .catch(()=>{
                          return helpers.response(res, null, 500, {
                            message: 'error send email'
                          })
                        })
                    })
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                });
              });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  insertPin: (req, res) => {
    const { id, pin } = req.body;
    modelUsers.insertPin(id, pin)
      .then((result) => {
        const resultUsers = result;
        let status = 200;
        if (resultUsers.length === 0) status = 404;
        helpers.response(res, resultUsers, status);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  reqForgotPassword: (req, res) => {
    const { email } = req.body;
    modelUsers.cekEmail(email)
      .then((result) => {
        const resultUsers = result;
        let status = 200;
        if (resultUsers.length === 0) status = 404;
        helpers.response(res, resultUsers, status);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  forgotPassword: (req, res) => {
    const { id, password, repeat_password } = req.body;
    if (password !== repeat_password) {
      helpers.response(res, null, 400);
    }
    modelUsers.updatePassword(id, password)
      .then((result) => {
        const resultUsers = result;
        let status = 200;
        if (resultUsers.length === 0) status = 404;
        helpers.response(res, resultUsers, status);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  emailVerif: (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if(err){
        if (err.name === 'JsonWebTokenError'){
          return helpers.response(res, null, 401, {
            message: 'invalid token'
          })
        } else if (err.name === 'TokenExpiredError') {
          return helpers.response(res, null,401, {
            message: 'token expired'
          })
        }
      }
      console.log(decoded);
    modelUsers.cekEmail(decoded.email)
      .then((user) => {
        let status = 200;
        if (user.length === 0) status = 404;
        modelUsers.emailVerif(decoded.email)
        .then((user) => {
          helpers.response(res, user, status);
        })
        })
        .catch((err) => {
          console.log(err);
        });
      })
  },
  updateImage: (req, res) => {
    const { id } = req.body;
    const image = `${process.env.BASE_URL}/upload/${req.file.filename}`;    
    modelUsers.updateImage(id, image)
      .then((result) => {
        const resultUsers = result;
        let status = 200;
        if (resultUsers.length === 0) status = 404;
        helpers.response(res, resultUsers, status);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    const {roleID} = req
    if (roleID !== 1){
      helpers.response(res, null, 401, {message: 'Hanya admin yang memiliki akses'});
    } else {
    modelUsers.deleteUser(id)
      .then((result) => {
        const resultUsers = result;
        let status = 200;
        if (resultUsers.length === 0) { status = 404; }
        helpers.response(res, resultUsers, status);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  refreshToken: (req, res) => {
        const data = {
          userID: req.userID, 
          email: req.email, 
          roleID: req.roleID 
        };
        jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '24h' }, function (err, token) {
          console.log(token);
          helpers.response(res, {token:token}, 200);
        })
  },
};

module.exports = users;
