const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wiresetsSchema = new Schema({
    Bosh:{
        required: true,
        type: Array,
        default: []
    },
    LS:{
        required: true,
        type: Array,
        default: []
    },
    NGK:{
        required: true,
        type: Array,
        default: []
    },
    Roadstar:{
        required: true,
        type: Array,
        default: []
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('wiresets', wiresetsSchema)