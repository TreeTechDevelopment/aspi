import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";

import Navbar from '../components/Navbar'
import { url, messageServerError } from '../../app.json'

function RecordsCars() {

    const [makes, setMakes] = useState([])
    const [makesSelect, setMakesSelect] = useState([])
    const [make, setMake] = useState({})
    const [models, setModels] = useState([])
    const [modelsSelect, setModelsSelect] = useState([])
    const [model, setModel] = useState({})

    useEffect(() => {
        fetchInfo().then(({ makes, models }) => {
            setMakes(makes)
            let makesSelect = makes.map(make => { return { value: make._id, label: make.name } } )
            setMakesSelect(makesSelect)
            setMake(makesSelect[0])
            
            setModels(models)
            let modelsSelect = models.map(model => { return { value: model._id, label: model.name } } )
            setModelsSelect(modelsSelect)
            setModel(modelsSelect[0])
        }).catch(() => alert(`${messageServerError}`))
    }, [])

    const fetchInfo = async () => {
        const res = await axios({
            url: `${url}/cars/info`,
            method: 'GET',
            timeout: 5000
        })
        return res.data
    }

    const handleMakeSelect = newMake => setMake(newMake)
    const handleModelSelect = newModel => setModel(newModel)

    return (
        <>
            <Navbar />
            <form className="form-car">
                <label>Marca</label>     
                <Select 
                    options={makesSelect}
                    value={make}
                    onChange={handleMakeSelect}
                    className="select"
                />  
                <label>Modelo</label>     
                <Select 
                    options={modelsSelect}
                    value={model}
                    onChange={handleModelSelect}
                    className="select"
                />           
            </form>
        </>
    )
}

export default RecordsCars
