module.exports = {
    response: (res, result, status, err) => {
      
        const resultPrint = {

      status : 'success',
      statusCode : status,
      result : result,
      err : err
      }
      res.status(status)
      res.json(resultPrint)
    }
  }