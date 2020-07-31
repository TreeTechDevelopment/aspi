const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wiresetsSchema = new Schema({
    Bosh:{
        type: Array,
        default: []
    },
    LS:{
        type: Array,
        default: []
    },
    NGK:{
        type: Array,
        default: []
    },
    Roadstar:{
        type: Array,
        default: []
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('wiresets', wiresetsSchema)