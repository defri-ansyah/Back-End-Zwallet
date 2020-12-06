/* eslint-disable camelcase */
const connection = require('../configs/db');

const phoneNumber = {
  phoneNumber: (user_id) => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users_phone WHERE user_id = ?', user_id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  addPhoneNumber: (user_id, phone_number) => new Promise((resolve, reject) => {
    connection.query('INSERT INTO users_phone (user_id, phone_number) VALUES (?, ?)', [user_id, phone_number], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  deletePhoneNumber: (id) => new Promise((resolve, reject) => {
    connection.query('DELETE FROM `users_phone` WHERE id = ?', id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
};
module.exports = phoneNumber;
