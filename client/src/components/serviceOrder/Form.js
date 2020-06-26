import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Select from 'react-select';

import { url, messageServerError } from '../../../app.json'
import { appContext } from '../../context/Provider'

function Form(){

    const context = useContext(appContext)

    const [years, setYears] = useState([])
    const [makesSelect, setMakesSelect] = useState([])
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [modelsSelect, setModelsSelect] = useState([])
    const [motors, setMotors] = useState([])
    const [cylinders, setCylinders] = useState([])
    const [cars, setCars] = useState([])
    const [make, setMake] = useState({})
    const [model, setModel] = useState({})
    const [motor, setMotor] = useState({})
    const [cylinder, setCylinder] = useState({})
    const [year, setYear] = useState({})  
    const [infoFetched, setInfoFetched] = useState(false) 

    const setData = (models, makes) => {        
        setMakes(makes)
        let makesSelect = makes.map( make => { return { label: make.name, value: make._id } } )
        setMakesSelect(makesSelect)
        setMake(makesSelect[0])

        let modelsSelect = models.filter( model => model.make === makes[0]._id )
        modelsSelect = modelsSelect.map( model => { return { label: model.name, value: model._id } } )
        setModels(models)
        setModelsSelect(modelsSelect)
        setModel(modelsSelect[0])

        setInfoFetched(true)
    }

    const setDataCars = cars => {
        let yearsSelect = []
        for(let i = 0; i < cars.length; i++){
            for(let j = 0; j < cars[i].year.length; j++){
                yearsSelect.push(cars[i].year[j])
            }
        }
        yearsSelect = [...new Set(yearsSelect)].sort((a, b) => a - b);
        yearsSelect = yearsSelect.map( year => { return { value: year, label: year } } )
        setYears(yearsSelect)
        setYear(yearsSelect[0])

        let motorsSelect = cars.filter( car => car.year.indexOf(yearsSelect[0].value) >= 0 )        
        motorsSelect = motorsSelect.map( car => car.motor )
        motorsSelect = [...new Set(motorsSelect)]
        motorsSelect = motorsSelect.map( motor => { return { value: motor, label: motor } } )
        setMotors(motorsSelect)
        setMotor(motorsSelect[0])

        let cylindersSelect = cars.filter( car => car.motor == motorsSelect[0].value )        
        cylindersSelect = cylindersSelect.map( car => car.cylinder )
        cylindersSelect = [...new Set(cylindersSelect)]
        cylindersSelect = cylindersSelect.map( cylinder => { return { value: cylinder, label: cylinder } } )
        setCylinders(cylindersSelect)
        setCylinder(cylindersSelect[0])
        
        setCars(cars)
    }

    const fetchCar = async () => {
        const res = await axios({
            method: 'GET',
            url : `${url}/cars?make=${make.value}&model=${model.value}`,
            timeout: 5000
        })
        return res.data
    }

    useEffect(() => {
        fetchInfo().then(({ models, makes }) => {
            setData(models, makes)
        }).catch((e) => {
            console.log(e)
            setInfoFetched(true)
            alert(`${messageServerError}`)
        })
    },[])

    useEffect(() => {
        if(make.value && model.value){    
            fetchCar().then(({cars}) => {
                setDataCars(cars)
            }).catch(e => alert(`${messageServerError}`))
        }
    },[model, make])

    useEffect(() => {
        if(cars.length != 0){
            let car = cars.find(car => car.year.indexOf(year.value) >= 0 && car.motor == motor.value && car.cylinder == cylinder.value  )
            if(car){                
                context.dispatchCar({ type: 'SET', value: car })
                context.dispatchModel({ type: 'SET', value: model.label })
                context.dispatchMake({ type: 'SET', value: make.label })
                context.dispatchYear({ type: 'SET', value: year.label })
            }
        }
    },[make, model, year, motor, cylinder, cars])

    const fetchInfo = async () => {
        const res = await axios({
            method: 'GET',
            url : `${url}/cars/info`,
            timeout: 5000
        })
        return res.data
    }

    const handleMakeSelect = newMake => {

        setMake(newMake)

        let newModels = models.filter( model => model.make == newMake.value )         
        newModels = newModels.map( model => { return { label: model.name, value: model._id } } )
        setModelsSelect(newModels)
        setModel(newModels[0])
        
    }

    const handleYearsSelect = newYear => {
        setYear(newYear)

        let motorsSelect = cars.filter( car => car.year.indexOf(newYear.value) >= 0 )
        motorsSelect = motorsSelect.map( car => car.motor )
        motorsSelect = [...new Set(motorsSelect)]
        motorsSelect = motorsSelect.map( motor => { return { value: motor, label: motor } } )
        setMotors(motorsSelect)
        setMotor(motorsSelect[0])

        let cylindersSelect = cars.filter( car => car.motor == motorsSelect[0].value )
        cylindersSelect = cylindersSelect.map( car => car.cylinder )
        cylindersSelect = [...new Set(cylindersSelect)]
        cylindersSelect = cylindersSelect.map( cylinder => { return { value: cylinder, label: cylinder } } )
        setCylinders(cylindersSelect)
        setCylinder(cylindersSelect[0])
    }

    const handleMotorSelect = newMotor => {
        setMotor(newMotor)

        let cylindersSelect = cars.filter( car => car.motor == motorsSelect[0].value )
        cylindersSelect = cylindersSelect.map( car => car.cylinder )
        cylindersSelect = [...new Set(cylindersSelect)]
        cylindersSelect = cylindersSelect.map( cylinder => { return { value: cylinder, label: cylinder } } )
        setCylinders(cylindersSelect)
        setCylinder(cylindersSelect[0])
    }

    const handleModelSelect = newModel => setModel(newModel)

    const handleCylinderSelect = newCylinder => setCylinder(newCylinder)
    

    return (
        <>
            {infoFetched && (
                <>
                     <h1>Orden de servicio</h1>
                    <form id="form-service-order">
                        <label>Marca</label>
                        <Select 
                            options={makesSelect}
                            onChange={handleMakeSelect}
                            value={make}
                            className="select"
                        />
                        <label>Modelo</label>
                        <Select 
                            options={modelsSelect}
                            onChange={handleModelSelect}
                            value={model}
                            className="select"
                        />
                        <label>Año</label>
                        <Select 
                            options={years}
                            onChange={handleYearsSelect}
                            value={year}
                            className="select"
                        />
                        <label>Motor</label>
                        <Select 
                            options={motors}
                            onChange={handleMotorSelect}
                            value={motor}
                            className="select"
                        />
                        <label>Cilindros</label>
                        <Select 
                            options={cylinders}
                            onChange={handleCylinderSelect}
                            value={cylinder}
                            className="select"
                        />
                    </form>
                </>
            )}
        </>
     );
}
 
export default Form;

