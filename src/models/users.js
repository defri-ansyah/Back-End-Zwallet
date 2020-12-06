const connection = require('../configs/db');

const users = {
  getUsers: (search) => new Promise((resolve, reject) => {
    connection.query('SELECT users.* FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ?', [search, search, search], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  detailUsers: (id) => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE users.id = ?', id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  login: (email) => new Promise((resolve, reject) => {
    connection.query('SELECT id, password, email, role_id FROM users WHERE email = ?', [email], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  cekEmail: (email) => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  createAccount: (username, email, password, image) => new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (email, password, username, image, role_id) VALUES (?, ?, ?, ?, 2)', [email, password, username, image], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  insertPin: (id, pin) => new Promise((resolve, reject) => {
    connection.query('UPDATE users SET pin = ? WHERE id = ?', [pin, id], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  updatePassword: (id, password) => new Promise((resolve, reject) => {
    connection.query('UPDATE users SET password = ? WHERE id = ?', [password, id], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  cekPin: (id, pin) => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ? AND pin = ?', [id, pin], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  checkBalance: (id) => new Promise((resolve, reject) => {
    connection.query('SELECT balance FROM users WHERE id = ?', id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  updateBalance: (id, balance) => new Promise((resolve, reject) => {
    connection.query('UPDATE users SET balance = ? WHERE id = ?', [balance, id], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  getUserById: (id) => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE id = ?', id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  emailVerif: (email) => new Promise((resolve, reject) => {
    connection.query('UPDATE users SET is_email_verif = 1 WHERE email = ?', [email], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  updateImage: (id, image) => new Promise((resolve, reject) => {
    connection.query('UPDATE users SET image = ? WHERE id = ?', [image, id], (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
  deleteUser: (id) => new Promise((resolve, reject) => {
    connection.query('DELETE FROM `users` WHERE id = ?', id, (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  }),
};

module.exports = users;
