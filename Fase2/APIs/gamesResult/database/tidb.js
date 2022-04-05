const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '35.184.247.210',
    port: '4000',
    user: 'grupo19',
    password: 'grupo19-f2',
    database: 'sopes1f2'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Database connected')
});

module.exports = connection