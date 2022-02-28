const mongoose = require('mongoose')
const { Schema } = mongoose

const PruebaSchema = new Schema({
    title: { type: String, required: true}
})

module.exports = mongoose.model('Prueba', PruebaSchema)