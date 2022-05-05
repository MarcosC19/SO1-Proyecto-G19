const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.TIDB_IP,
    port: '4000',
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASS,
    database: process.env.TIDB_DB
})

connection.connect((err) => {
    if (err) throw err
    console.log('Database connected')
});

module.exports = connection