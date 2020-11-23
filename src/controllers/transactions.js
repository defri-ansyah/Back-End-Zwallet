const { throws } = require('assert')
const modelTransactions = require('../models/transactions')
const modelUsers = require('../models/users')
const helpers = require('../helpers/helpers')
const { checkBalance } = require('../models/users')
const transactions = {
  transfer: (req, res) => {
    const { receiver_id, sender_id, amount, notes, pin } = req.body
    modelUsers.cekPin(sender_id, pin)
      .then(data => {
        if (data.length === 0) {
          status = 400
          helpers.response(res, null, status)
        } else {
          modelTransactions.transfer(receiver_id, sender_id, amount, notes)
            .then(result => {
              const resultUsers = result
              let status = 200
              if (resultUsers.length === 0)
                status = 400
              //proses update balance
              const newbalance = data[0].balance - amount
              console.log(newbalance);
              modelUsers.updateBalance(sender_id, newbalance)
              .then(result => {
              helpers.response(res, resultUsers, status)
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  checkBalance:(req, res)=>{
    const {id, amount} = req.query
    modelUsers.checkBalance(id)
    .then(data=>{
        if(data[0].balance < amount){
            status= 400
        helpers.response(res, 'balance tidak cukup', status)
        }
        else {
        helpers.response(res, 'balance cukup', 200)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
  },
  history:(req, res)=>{
    const {id, page} = req.query
    const perPage = 2
    const offset = perPage * (page - 1) + 1
    modelTransactions.history(id, offset, perPage)
    .then(result=>{
        const resultUsers = result
        // res.send(resultProdcut)
        helpers.response(res, resultUsers, 200)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
}
module.exports = transactions