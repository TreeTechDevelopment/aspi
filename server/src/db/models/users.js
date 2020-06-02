const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('users', userSchema)