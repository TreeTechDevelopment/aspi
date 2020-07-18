const mongoose = require('mongoose')
const Schema = mongoose.Schema

const oilSchema = new Schema({
    viscosity: {
        required: true,
        type: String
    },
    oilType: {
        required: true,
        type: String
    },
    make: {
        required: true,
        type: String
    },
    presentation:{
        required: true,
        type: String
    },
    lts:{
        required: true,
        required: Number
    },
    price:{
        required: true,
        type: Number
    }

})

module.exports = mongoose.model('oils', oilSchema)