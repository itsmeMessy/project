const mysql2 = require('mysql2')

module.exports.db = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'Ryou010160',
    database:'itsec'
})

