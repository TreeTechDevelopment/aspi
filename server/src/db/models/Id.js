const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IdSchema = new Schema({
    id: Number
})

module.exports = mongoose.model('ID', IdSchema)