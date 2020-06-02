
const Make = require('../db/models/marcas');
const Model = require('../db/models/modelos');
const Car = require('../db//models/cars');
const Motor = require('../db/models/motores');

const createCarDB = async (car) => {
    let newCar = {
        oilFilter: [],
        airFilter: [],
        fuelFilter: []
    }
    
    let filterControl = ''

    for(let i = 0; i < car.length; i++){
        if(i === 0){
            try{
                let make = new Make({
                    name: car[i]
                })
                const newMake = await make.save()
                newCar.make = newMake._id
            }catch(e){
                let make = await Make.findOne({ 'name': car[i] })
                newCar.make = make._id
            }
        }else if(i === 1){
            try{
                let model = new Model({
                    name: car[i],
                    make: newCar.make
                })
                const newModel = await model.save()
                newCar.model = newModel._id
            }catch(e){
                let model = await Model.findOne({ 'name': car[i] })
                newCar.model = model._id
            }
        }else if(i === 2){
            newCar.yearFrom = Number(car[i].split(' ')[1].replace(',',''))
            newCar.yearTo = Number(car[i].split(' ')[ car[i].split(' ').length - 1 ])
        }else if(i === 3){
            newCar.cylinder = car[i]
        }else if(i === 4){
            try{
                let motor = new Motor({
                    name: car[i]
                })
                const newMotor = await motor.save()
                newCar.motor = newMotor._id
            }catch(e){
                let motor = await Motor.findOne({ 'name': car[i] })
                newCar.motor = motor._id
            }
        }else if(i >= 5){
            switch(car[i]){
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
                    if(car[i] !== "."){
                        if(car[i].indexOf('/') >= 0){
                            let carArray = car[i].split('/').map(element => (
                                element.replace(/^\s+/g, '').replace(/\s+$/g, '')
                            ));
                            if(filterControl === "OF"){ newCar.oilFilter.push(`${filterControl}-${carArray[0]}`) }
                            if(filterControl === "F"){ newCar.airFilter.push(`${filterControl}-${carArray[0]}`) }
                            if(filterControl === "FGI"){ newCar.fuelFilter.push(`${filterControl}-${carArray[0]}`) }
                            filterControl = carArray[1]
                        }else{
                            if(filterControl === "OF"){ newCar.oilFilter.push(`${filterControl}-${car[i]}`) }
                            if(filterControl === "F"){ newCar.airFilter.push(`${filterControl}-${car[i]}`) }
                            if(filterControl === "FGI"){ newCar.fuelFilter.push(`${filterControl}-${car[i]}`) }
                        }
                    }
            }

        }
    }
    let carDB = new Car(newCar)
    carDB.save()
}

module.exports = {
    createCarDB
}