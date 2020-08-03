import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Select from 'react-select';

import { url, messageServerError } from '../../../app.json'
import { appContext } from '../../context/Provider'

function Form({ order }){

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
        let newIDOrDER = false
        let IDOrder = getIDORder()
        if((Number(IDOrder) === -1 || !IDOrder) && !order){ newIDOrDER = true }
        fetchAllInfo(newIDOrDER).then(({ models, makes, idOrder, services, filters, sparkplugs, wiresets, brakeshoes, oils }) => {
            if(order){
                setYear({ value: order.carYear, label: order.carYear })
                setMake({ value: order.car.make.name, label: order.car.make.name })
                setModel({ value: order.car.model.name, label: order.car.model.name })
                setCylinder({ value: order.car.cylinder, label: order.car.cylinder })
                setMotor({ value: order.car.motor, label: order.car.motor })
                setInfoFetched(true)
            }else{ setData(models, makes) }
            context.dispatchServices({ type: 'SET', value: services })
            context.dispatchFilters({ type: 'SET', value: filters })
            context.dispatchSparkplugs({ type: 'SET', value: sparkplugs })
            context.dispatchWiresets({ type: 'SET', value: wiresets })
            context.dispatchBrakeshoes({ type: 'SET', value: brakeshoes })
            context.dispatchOils({ type: 'SET', value: oils })
            if(Number(IDOrder) === -1 || !IDOrder){ setIDORder(idOrder) }            
        }).catch((e) => {
            setInfoFetched(true)
            alert(`${messageServerError}`)
        })
    },[])

    const setIDORder = (idOrder) => window.localStorage.setItem('@IDOrder', idOrder )

    const getIDORder = () => window.localStorage.getItem('@IDOrder')

    useEffect(() => {
        if( make && model && make.value && model.value && !order){    
            fetchCar().then(({cars}) => {
                setDataCars(cars)
            }).catch(e => alert(`${messageServerError}`))
        }
    },[model, make])

    useEffect(() => {
        if(cars.length != 0 ){
            let car = cars.find(car => car.year.indexOf(year.value) >= 0 && car.motor == motor.value && car.cylinder == cylinder.value  )
            if(car){                
                context.dispatchCar({ type: 'SET', value: car })
                context.dispatchModel({ type: 'SET', value: model.label })
                context.dispatchMake({ type: 'SET', value: make.label })
                context.dispatchYear({ type: 'SET', value: year.label })
            }
        }
    },[make, model, year, motor, cylinder, cars])

    const fetchAllInfo = async (newIDOrDER) => {        
        const res = await axios({
            method: 'GET',
            url : `${url}/cars/all-info?newIDOrder=${newIDOrDER}`,
            timeout: 20000
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

        let cylindersSelect = cars.filter( car => car.motor == newMotor.value )
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
                    <form className="form">
                        <h1>CARACTERÍSTICAS</h1>
                        <div className="select-container">
                            <div className="label-container">
                                <label>MARCA</label>
                            </div>
                            <Select 
                                options={makesSelect}
                                onChange={handleMakeSelect}
                                value={make}
                                className="select"
                                isDisabled={order}
                            />
                        </div>
                        <div className="select-container">
                            <div className="label-container">
                                <label>MODELO</label>
                            </div>
                            <Select 
                                options={modelsSelect}
                                onChange={handleModelSelect}
                                value={model}
                                className="select"
                                isDisabled={order}
                            />
                        </div>
                        <div className="select-container">
                            <div className="label-container">
                                <label>AÑO</label>
                            </div>
                            <Select 
                                options={years}
                                onChange={handleYearsSelect}
                                value={year}
                                className="select"
                                isDisabled={order}
                            />
                        </div>
                        <div className="select-container">
                            <div className="label-container">
                                <label>MOTOR</label>
                            </div>
                            <Select 
                                options={motors}
                                onChange={handleMotorSelect}
                                value={motor}
                                className="select"
                                isDisabled={order}
                            />
                        </div>
                        <div className="select-container">
                            <div className="label-container">
                                <label>CILINDROS</label>
                            </div>
                            <Select 
                                options={cylinders}
                                onChange={handleCylinderSelect}
                                value={cylinder}
                                className="select"
                                isDisabled={order}
                            />
                        </div>
                    </form>
                </>
            )}
        </>
     );
}
 
export default Form;

