import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { url, messageServerError } from '../../../app.json'

const Form = () => {

    const [year, setYear] = useState('a')
    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [modelsSelect, setModelsSelect] = useState([])
    const [motors, setMotors] = useState([])
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [motor, setMotor] = useState('')  
    const [infoFetched, setInfoFetched] = useState(false)    

    const handleSelect = (e) => { setYear(e.target.value) }

    const handlePicker = (e) => { 
        console.log(e)
    }

    const setData = (models, motors, makes) => {
        console.log(models)
        setMakes(makes)
        setMake(makes[0].name)

        let newModels = models.filter( model => model.make.name === makes[0].name )
        setModels(models)
        setModelsSelect(newModels)
        setModel(newModels[0].name)

        setMotors(motors)
        setMotor(motors[0].name)
        setInfoFetched(true)
    }

    useEffect(() => {
        fetchCars().then(({ models, motors, makes }) => {
            setData(models, motors, makes)
        }).catch((e) => {
            setInfoFetched(true)
            alert(`${messageServerError}`)
        })
    },[])

    const fetchCars = async () => {
        const res = await axios({
            method: 'GET',
            url : `${url}/cars`,
            timeout: 5000
        })
        return res.data
    }

    const handleMakeSelect = e => {
        setMake(e.target.value)

        let newModels = models.filter( model => model.make.name === e.target.value ) 
        setModelsSelect(newModels)
    }

    const handleModelSelect = e => setModel(e.target.value)

    const handleMotorSelect = e => setMotor(e.target.value)

    return (
        <>
            {infoFetched && (
                <>
                     <h1>Orden de servicio</h1>
                    <form id="form-service-order">
                        <label>Marca</label>
                        <select onChange={handleMakeSelect} value={make}>
                            {makes.map(make => (
                                <option key={make._id} value={make.name}>{make.name}</option>
                            ))}
                        </select>
                        <label>Modelo</label>
                        <select value={model} onChange={handleModelSelect}>
                            {modelsSelect.map(model => (
                                <option key={model._id} value={model.name}>{model.name}</option>
                            ))}
                        </select>
                        <label>Motor</label>
                        <select value={motor} onChange={handleMotorSelect}>
                            {motors.map(motor => (
                                <option key={motor._id} value={motor.name}>{motor.name}</option>
                            ))}
                        </select>
                    </form>
                </>
            )}
        </>
     );
}
 
export default Form;

