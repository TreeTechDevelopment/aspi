
const Make = require('../db/models/marcas');
const Model = require('../db/models/modelos');
const Car = require('../db//models/cars');

let string = ''
string.toUpperCase()

const createCarDB = async (car, models) => {

    let newCar = {
        oilFilter: [],
        airFilter: [],
        fuelFilter: []
    }
    
    let filterControl = ''

    for(let i = 0; i < car.length; i++){
        if(i === 0){
            let index = models.findIndex( model => model.brand.toUpperCase() === car[i].trim() )
            let make = await Make.findOne({ name: models[index].brand })
            newCar.make = make._id
        }else if(i === 1){
            let modelsDB = await Model.find({ make: newCar.make })
            let index = modelsDB.findIndex( model => model.name === car[i].trim() ) 
            newCar.model = modelsDB[index]._id
        }else if(i === 2){
            let yearFrom = Number(car[i].trim().split(' ')[1].replace(',',''))
            let yearTo = Number(car[i].trim().split(' ')[ car[i].trim().split(' ').length - 1 ])

            if(yearFrom < 21){ yearFrom += 2000 }
            else{ yearFrom += 1900 } 

            if(yearTo < 21){ yearTo += 2000 }
            else{ yearTo += 1900 } 

            let years = []
            for(let i = yearFrom; i <= yearTo; i++){ years.push(i) }

            newCar.year = years
            
        }else if(i === 3){
            newCar.cylinder = car[i].trim()
        }else if(i === 4){
            newCar.motor = car[i].trim()
        }else if(i >= 5){
            switch(car[i].trim()){
                case "OF":
                    filterControl = 'OF'
                    break;
                case "F":
                    filterControl = 'F'
                    break;
                case "FGI":
                    filterControl = 'FGI'
                    break;
                default:
                    if(car[i].trim() !== "."){
                        if(car[i].indexOf('/') >= 0){
                            let carArray = car[i].split('/').map(element => (
                                element.replace(/^\s+/g, '').replace(/\s+$/g, '')
                            ));
                            if(filterControl === "OF"){ newCar.oilFilter.push(`${filterControl}-${carArray[0].trim()}`) }
                            if(filterControl === "F"){ newCar.airFilter.push(`${filterControl}-${carArray[0].trim()}`) }
                            if(filterControl === "FGI"){ newCar.fuelFilter.push(`${filterControl}-${carArray[0].trim()}`) }
                            filterControl = carArray[1]
                        }else{
                            if(filterControl === "OF"){ newCar.oilFilter.push(`${filterControl}-${car[i].trim()}`) }
                            if(filterControl === "F"){ newCar.airFilter.push(`${filterControl}-${car[i].trim()}`) }
                            if(filterControl === "FGI"){ newCar.fuelFilter.push(`${filterControl}-${car[i].trim()}`) }
                        }
                    }
            }

        }
    }
    
    return newCar
}

module.exports = {
    createCarDB
}