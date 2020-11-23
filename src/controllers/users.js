const { throws } = require('assert')
const modelUsers = require('../models/users')
const helpers = require('../helpers/helpers')
const { search } = require('../routers/users')
const users = {
    getUsers:(req, res)=>{
        const {search} = req.query
        modelUsers.getUsers('%'+search+'%')
        .then(result=>{
            const resultUsers = result
            // res.send(resultProdcut)
            helpers.response(res, resultUsers, 200)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    detailUser:(req, res)=>{
        const id = req.params.id
        modelUsers.detailUser(id)
        .then(result=>{
            const resultUsers = result[0]
            // res.send(resultProdcut)
            helpers.response(res, resultUsers, 200)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    login:(req, res)=>{
        const {email, password} = req.body
        modelUsers.login(email, password)
        .then(result=>{
            const resultUsers = result
            let status = 200
            // res.send(resultProdcut)
            if (resultUsers.length === 0)
                status= 404
            helpers.response(res, resultUsers, status)
        
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    signUp:(req, res)=>{
        const {username,email, password} = req.body
        modelUsers.cekEmail(email)
        .then(checkEmail=>{
            if(checkEmail.length !== 0){
                status= 409
            helpers.response(res, checkEmail, status)
            }
            else {
                modelUsers.createAccount(username,email,password)
            .then (createAccount =>{
            let status = 200
            if (createAccount === 0)
                status= 400
            helpers.response(res, createAccount, status)
            })
            .catch((err)=>{
                console.log(err)
            })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    insertPin:(req, res)=>{
        const {id, pin} = req.body
        modelUsers.insertPin(id, pin)
        .then(result=>{
            const resultUsers = result
            let status = 200
            // res.send(resultProdcut)
            if (resultUsers.length === 0)
                status= 404
            helpers.response(res, resultUsers, status)
        
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    reqForgotPassword:(req, res)=>{
        const {email} = req.body
        modelUsers.cekEmail(email)
        .then(result=>{
            const resultUsers = result
            let status = 200
            // res.send(resultProdcut)
            if (resultUsers.length === 0)
                status= 404
            helpers.response(res, resultUsers, status)
        
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    forgotPassword:(req, res)=>{
        const {id, password, repeat_password} = req.body
        if(password !== repeat_password){
            helpers.response(res, null, 400)
        }
        modelUsers.updatePassword(id, password)
        .then(result=>{
            const resultUsers = result
            let status = 200
            if (resultUsers.length === 0)
                status= 404
            helpers.response(res, resultUsers, status)
        
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
}

module.exports = users