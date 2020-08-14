const mongoose = require('mongoose')
const Schema = mongoose.Schema

const antifreezeSchema = new Schema({
    antifreezeType: {
        required: true,
        type: String
    },
    antifreezeMake: {
        required: true,
        type: String
    },
    antifreezePresentation:{
        required: true,
        type: String
    },
    price:{
        required: true,
        type: Number
    },
    specification:{ type: String }

})

module.exports = mongoose.model('antifreezes', antifreezeSchema)