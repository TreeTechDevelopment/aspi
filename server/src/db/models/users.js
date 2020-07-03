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
    },
    role: {
        required: true,
        type: String,
        enum: ['ADMIN', 'EMPLOYEE'],
        default: 'EMPLOYEE'
    }
})

module.exports = mongoose.model('users', userSchema)