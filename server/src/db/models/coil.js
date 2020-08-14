const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coilSchema = new Schema({
    Injecth : {
        type: Array,
        required: true,
        default: []
    },
    Kem: {
        type: Array,
        required: true,
        default: []
    },
    price:{
        required: true,
        type: Number
    }

})

module.exports = mongoose.model('coils', coilSchema)