require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const app = express();
const { PORT } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');
const routerUsers = require('./src/routers/users');
const routerTransactions = require('./src/routers/transactions.js');
const routerPhoneNumber = require('./src/routers/phoneNumber');

// membuat middleware
// const mymiddleware = (req, res, next) =>{
//     console.log('menjalan my middleware')
//     // res.send('mymiddleware')
//     next()
// }

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// add morgan
app.use(morgan('dev'));  
app.use('/src/upload', express.static('./src/upload'))

// add mymiddleware
// app.use(mymiddleware)

// menenggukan router
app.use('/users', routerUsers);
app.use('/transactions', routerTransactions);
app.use('/phone-number', routerPhoneNumber);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`server is running port ${PORT}`));
