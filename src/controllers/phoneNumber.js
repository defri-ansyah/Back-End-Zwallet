const { throws } = require('assert')
const modelPhoneNumber = require('../models/phoneNumber')
const helpers = require('../helpers/helpers')
const { search } = require('../routers/phoneNumber')
const phoneNumbers = {
    phoneNumber:(req, res)=>{
        const {user_id} = req.params
        modelPhoneNumber.phoneNumber(user_id)
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
    },
    addPhoneNumber:(req, res)=>{
        const {user_id, phone_number} = req.body
        modelPhoneNumber.addPhoneNumber(user_id, phone_number)
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
    },
    deletePhoneNumber:(req, res)=>{
        const {id} = req.params
        modelPhoneNumber.deletePhoneNumber(id)
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
module.exports = phoneNumbers