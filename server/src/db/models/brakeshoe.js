const mongoose = require('mongoose')
const Schema = mongoose.Schema

const brakeshoeSchema = new Schema({
    Wagner:{
        required: true,
        type: Array,
        default: []
    },
    price: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('brakeshoe', brakeshoeSchema)