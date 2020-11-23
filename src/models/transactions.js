const connection = require('../configs/db')

const transactions = {
    transfer: (receiverId, senderId, amount, notes)=>{
        return new Promise((resolve, reject)=>{
            connection.query("INSERT INTO transactions (receiver_id, sender_id, amount, notes, is_transfer_success) VALUES (?, ?, ?, ?, 1)", [receiverId, senderId, amount, notes], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    },
    history: (id, offset, perPage)=>{
        // console.log(sort);
        return new Promise((resolve, reject)=>{
            connection.query("SELECT history.* FROM (SELECT st.*, receiver.username AS name, receiver.phone_number AS phone, 'expense' AS type FROM `transactions` AS st JOIN users AS receiver ON receiver.id = st.receiver_id WHERE st.sender_id = ? UNION ALL SELECT rt.*, sender.username AS name, sender.phone_number AS phone , 'income' as type FROM `transactions` AS rt  JOIN users AS sender ON sender.id = rt.sender_id WHERE rt.receiver_id = ? ) as history ORDER BY created_at ASC LIMIT ? OFFSET ?", [id, id, perPage, offset], (error, results)=>{
                if(!error){
                    resolve(results)
                }else{
                    reject(error)
                }
            })
        })
    }
}

module.exports = transactions