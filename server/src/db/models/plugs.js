const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sparkPlugSchema = new Schema({
    NGK:{
        required: true,
        type: Array,
        default: []
    },
    Champions:{
        required: true,
        type: Array,
        default: []
    },
    Bosh:{
        required: true,
        type: Array,
        default: []
    },
    Motorcraft:{
        required: true,
        type: Array,
        default: []
    },
    ACD:{
        required: true,
        type: Array,
        default: []
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('plugs', sparkPlugSchema)