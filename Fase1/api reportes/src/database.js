const mongoose = require('mongoose')
require('dotenv').config()

const URI = `mongodb://${process.env.adminMongo}:${process.env.passwordMongo}@${process.env.hostMongo}:${process.env.portMongo}/F1_ProyectoG19`

mongoose.connect(URI, {
    authSource: 'admin'
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))

module.exports = mongoose