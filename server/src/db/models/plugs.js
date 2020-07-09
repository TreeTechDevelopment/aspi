const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sparkPlugSchema = new Schema({
    NGK:{
        type: Array,
        default: []
    },
    Champions:{
        type: Array,
        default: []
    },
    Bosh:{
        type: Array,
        default: []
    },
    Motorcraft:{
        type: Array,
        default: []
    },
    ACD:{
        type: Array,
        default: []
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('plugs', sparkPlugSchema)