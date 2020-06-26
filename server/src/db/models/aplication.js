const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdSchema = new Schema({
    idOrder: {
        type:Number,
        required: true
    }
})

module.exports = mongoose.model('Aplication', IdSchema)