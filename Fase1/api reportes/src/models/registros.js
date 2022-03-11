const mongoose = require('mongoose')
const { Schema } = mongoose

const LogsSchema = new Schema({
    logtype: String,
    logorigin: Number,
    logcontent: String,
    timestamp: Date
})

module.exports = mongoose.model('registros', LogsSchema)