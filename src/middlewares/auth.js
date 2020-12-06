const jwt = require('jsonwebtoken')
const helper = require('../helpers/helpers')

exports.verifyAccess = (req, res, next) =>{
  const authorization = req.headers.authorization
  if (!authorization){
    return helper.response(res, null, 401, {
      message: 'Server, Need Token'
    })
  }

  let token = authorization.split(" ")
  token = token[1]
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err){
      if (err.name === 'JsonWebTokenError'){
        return helper.response(res, null, 401, {
          message: 'invalid token'
        })
      } else if (err.name === 'TokenExpiredError') {
        return helper.response(res, null,401, {
          message: 'token expired'
        })
      }
    }
    console.log('isi decode', decoded.userID)
    req.userID = decoded.userID
    req.email = decoded.email
    req.roleID = decoded.roleID
    next()
  })
}