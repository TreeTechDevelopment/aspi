const mongoose = require('mongoose');

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');
const Filter = require('./models/filters');
const App = require('./models/aplication');
const Service = require('./models/services');
const Order = require('./models/orders');

const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB, DBconfig ,async (db) => {
    console.log("DB connected")  

} )