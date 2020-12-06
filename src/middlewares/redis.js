const redis = require('redis')
const client = redis.createClient(6379)
const {response, pagination} = require('../helpers/helpers')

exports.getDetailUser =(req, res, next) =>{
  const id = req.params.id
  client.get("User"+id, function (err, data) {

    if (data !== null) {
        const result = JSON.parse(data)
      return response(res, result, 200, null)
    } else {
      next()
    }
  });
}

exports.getAllHistory =(req, res, next) =>{
  const { id } = req.query;
  const page = req.query.page || 1;
  client.get("historyId"+id+"page"+page, function (err, data) {
    if (data !== null) {
        const result = JSON.parse(data)
        return pagination(res, req.query, result);
    } else {
      next()
    }
  });
}