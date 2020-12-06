/* eslint-disable camelcase */
const modelTransactions = require('../models/transactions');
const modelUsers = require('../models/users');
const helpers = require('../helpers/helpers');
const redis = require("redis");
const client = redis.createClient(6379);

const transactions = {
  transfer: (req, res) => {
    const {
      receiver_id, sender_id, amount, notes, pin,
    } = req.body;
    modelUsers.cekPin(sender_id, pin)
      .then((data) => {
        if (data.length === 0) {
          const status = 400;
          helpers.response(res, null, status);
        } else {
          modelTransactions.transfer(receiver_id, sender_id, amount, notes)
            .then((result) => {
              const resultUsers = result;
              let status = 200;
              if (resultUsers.length === 0) status = 400;
              // proses update balance
              const newbalance = data[0].balance - amount;
              modelUsers.updateBalance(sender_id, newbalance)
                .then(() => {
                  helpers.response(res, resultUsers, status);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  checkBalance: (req, res) => {
    const { id, amount } = req.query;
    modelUsers.checkBalance(id)
      .then((data) => {
        if (data[0].balance < amount) {
          const status = 400;
          helpers.response(res, 'balance tidak cukup', status);
        } else {
          helpers.response(res, 'balance cukup', 200);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  history: (req, res) => {
    const { id } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = 5;
    const offset = perPage * (page - 1) + 1;
    const path = `http://${req.get('host') + req.baseUrl + req.route.path}?page`;
    modelTransactions.history(id, offset, perPage)
      .then((result) => {
        const resultUsers = result;
        const count = modelTransactions.historyCount(id);
        const paginate = {
          current_page: page,
          offset,
          limit: perPage,
          total_data: count.length,
          per_page: result.length,
          path,
          status: 200,
          message: 'success',
          result: resultUsers,
        };
        
        client.setex("historyId"+id+"page"+page, 60*60, JSON.stringify(paginate))
        helpers.pagination(res, req.query, paginate);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
module.exports = transactions;
