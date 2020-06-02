const mongoose = require('mongoose')
const Schema = mongoose.Schema

const motorSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    model: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'modelos'
    }
})

module.exports = mongoose.model('motores', motorSchema)