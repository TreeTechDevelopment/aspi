const mongoose = require('mongoose')
const Schema = mongoose.Schema

const modelSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    make: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'marcas'
    }
})

module.exports = mongoose.model('modelos', modelSchema)