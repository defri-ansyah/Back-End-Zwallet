const connection = require('../configs/db')

const users = {
    getUsers: (search)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT users.*, up.phone_number FROM users JOIN users_phone AS up ON users.id = up.user_id WHERE first_name LIKE ? OR last_name LIKE ? OR up.phone_number LIKE ?", [search, search, search], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    detailUsers: (id)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM users WHERE id = ?", id, (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    login: (email, password)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT count(*) FROM users WHERE email = ? AND password = ?", [email, password], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    cekEmail: (email)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM users WHERE email = ?", email, (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    createAccount: (username, email, password)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO users (email, password, username) VALUES (?, ?, ?)", [email, password, username], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    insertPin: (id, pin)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE users SET pin = ? WHERE id = ?", [pin, id], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    updatePassword: (id, password)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE users SET password = ? WHERE id = ?", [password, id], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    cekPin: (id, pin)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT * FROM users WHERE id = ? AND pin = ?", [id, pin], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    checkBalance: (id)=>{
        return new Promise((resolve, reject)=>{
            connection.query("SELECT balance FROM users WHERE id = ?", id, (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    updateBalance: (id, balance)=>{
        return new Promise((resolve, reject)=>{
            connection.query("UPDATE users SET balance = ? WHERE id = ?", [balance, id], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    }
}

module.exports = users