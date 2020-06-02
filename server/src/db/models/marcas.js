const mongoose = require('mongoose')
const Schema = mongoose.Schema

const makeSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('marcas', makeSchema)