import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Select from "react-select";
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';

import InputFilter from './InputFilter';
import { url, messageServerError } from '../../../app.json'
import { appContext } from '../../context/Provider'

Modal.setAppElement('#app')

function Form({ modalIsOpen, make, models, closeModal, addCar, updateCar }) {

    const context = useContext(appContext)
    
    const [modelsSelect, setModelsSelect] = useState([])
    const [airFilters, setAirFilter] = useState([])
    const [oilFilters, setOilFilter] = useState([])
    const [fuelFilters, setFuelFilter] = useState([])
    const [airFiltersRender, setAirFiltersRender] = useState([Math.random().toString()])
    const [oilFiltersRender, setOilFiltersRender] = useState([Math.random().toString()])
    const [fuelFiltersRender, setFuelFiltersRender] = useState([Math.random().toString()])
    const [model, setModel] = useState({})
    const [newModel, setNewModel] = useState('')
    const [yearFrom, setYearFrom] = useState('')
    const [yearTo, setYearTo] = useState('')
    const [cylinder, setCylinder] = useState('')
    const [motor, setMotor] = useState('')
    const [makeEdit, setMakeEdit] = useState('')
    const [loading, setLoading] = useState(false)
    const [errYear, setErrYear] = useState(false)
    const [errCylinder, setErrCylinder] = useState(false)
    const [errMotor, setErrMotor] = useState(false)
    const [selectDisable, setSelectDisable] = useState(false)

    useEffect(() => {
        if( JSON.stringify(context.carToEdit) !== "{}"){
            setMakeEdit({ value: context.carToEdit.make._id, label: context.carToEdit.make.name })
            setModel({ value: context.carToEdit.model._id, label: context.carToEdit.model.name })
            setSelectDisable(true)
            setCylinder(context.carToEdit.cylinder)
            setMotor(context.carToEdit.motor)
            if(context.carToEdit.year.length === 1){ setYearFrom( context.carToEdit.year[0].toString() ) }
            else{
                setYearFrom( context.carToEdit.year[0].toString() )
                setYearTo( context.carToEdit.year[ context.carToEdit.year.length - 1 ].toString() )
            }
            setAirFilter(context.carToEdit.airFilter)
            setOilFilter(context.carToEdit.oilFilter)
            setFuelFilter(context.carToEdit.fuelFilter)
            
            let newAirFilterRender = []
            for(let i = 0; i < context.carToEdit.airFilter.length; i++){ newAirFilterRender.push(Math.random().toString()) }
            setAirFiltersRender(newAirFilterRender)

            let newOilFilterRender = []
            for(let i = 0; i < context.carToEdit.oilFilter.length; i++){ newOilFilterRender.push(Math.random().toString()) }
            setOilFiltersRender(newOilFilterRender)

            let newFuelFilterRender = []
            for(let i = 0; i < context.carToEdit.fuelFilter.length; i++){ newFuelFilterRender.push(Math.random().toString()) }
            setFuelFiltersRender(newFuelFilterRender)
        }else{
            setMakeEdit(make)
            let modelsSelect = models.map( model => { return { value: model._id, label: model.name } })
            setModelsSelect(modelsSelect)
            setModel(modelsSelect[0])
        }
    }, [make, models, context.carToEdit])
         
    const handleModelSelect = newModel => setModel(newModel)

    const handleNewModel = e => setNewModel(e.target.value)

    const handleCylinder = e => {
        setCylinder(e.target.value)
        setErrCylinder(false)
    }

    const handleMotor = e => {
        setMotor(e.target.value)
        setErrMotor(false)
    }
    
    const handleYearFrom = e => {
        if(e.target.value.length <= 4){
            setYearFrom(e.target.value.replace(/[^0-9]/g,''))
            setErrYear(false)
        }
    }

    const handleYearTo = e => {
        if(e.target.value.length <= 4){
            setYearTo(e.target.value.replace(/[^0-9]/g,''))
        }
    }

    const setAirFilters = (filter, idx) => {
        let newAirFilters = [...airFilters]
        newAirFilters[idx] = filter
        setAirFilter(newAirFilters)
    }

    const setOilFilters = (filter, idx) => {
        let newOilFilters = [...oilFilters]
        newOilFilters[idx] = filter
        setOilFilter(newOilFilters)
    }

    const setFuelFilters = (filter, idx) => {
        let newFuelFilters = [...fuelFilters]
        newFuelFilters[idx] = filter
        setFuelFilter(newFuelFilters)
    }

    const addAirFilter = (e) => {
        e.preventDefault()
        let newAirFilters = [...airFiltersRender]
        newAirFilters.push(Math.random().toString())
        setAirFiltersRender(newAirFilters)
    }

    const removeAirFilter = (e) => {
        e.preventDefault()
        let newAirFilters = [...airFiltersRender]
        newAirFilters.splice(-1, 1)
        setAirFiltersRender(newAirFilters)
    }

    const addOilFilter = (e) => {
        e.preventDefault()
        let newOilFilters = [...oilFiltersRender]
        newOilFilters.push(Math.random().toString())
        setOilFiltersRender(newOilFilters)
    }

    const removeOilFilter = (e) => {
        e.preventDefault()
        let newOilFilters = [...oilFiltersRender]
        newOilFilters.splice(-1, 1)
        setOilFiltersRender(newOilFilters)
    }

    const addFuelFilter = (e) => {
        e.preventDefault()
        let newFuelFilters = [...fuelFiltersRender]
        newFuelFilters.push(Math.random().toString())
        setFuelFiltersRender(newFuelFilters)
    }

    const removeFuelFilter = (e) => {
        e.preventDefault()
        let newFuelFilters = [...fuelFiltersRender]
        newFuelFilters.splice(-1, 1)
        setFuelFiltersRender(newFuelFilters)
    }

    const saveCar = (e) => {
        e.preventDefault()

        if(checkForm()){
            setLoading(true)

            let data = {
                make: makeEdit.value,            
                cylinder,
                motor,
                airFilter: airFilters,
                oilFilter: oilFilters,
                fuelFilter: fuelFilters,            
            }

            if(newModel !== ""){ data.model = newModel }
            else{ data.model = model.value }

            let years = []
            if(yearTo !== ""){
                for(let i = Number(yearFrom); i <= Number(yearTo); i++){
                    years.push(i)
                }
            }else{ years= [Number(yearFrom)] }
            data.year = years


            if( JSON.stringify(context.carToEdit) === "{}" ){
                fetchNewCar(data).then(({ newCar }) => {
                    doBeforeCloseModal()
                    addCar(newCar)
                    setLoading(false)
                }).catch((e) => {
                    setLoading(false)
                    alert(`${messageServerError}`)
                })
            }else{
                data.id = context.carToEdit._id

                fetchUpdateCar(data).then(({ newCar }) => {
                    closeModal()
                    updateCar(newCar)
                    setLoading(false)
                }).catch((e) => {
                    setLoading(false)
                    alert(`${messageServerError}`)
                })
            }

        }else{
            alert('Revisa el formulario')
        }
    }

    const checkForm = () => {
        if(yearFrom !== "" && motor !== "" && cylinder !== ""){ return true }
        else{
            if(yearFrom === ""){ setErrYear(true) }
            if(cylinder === ""){ setErrCylinder(true) }
            if(motor === ""){ setErrMotor(true) }
            return false
        }
    }

    const fetchNewCar = async (data) => {
        const res  = await axios({
            url: `${url}/cars`,
            data,
            method: 'POST',
            timeout: 5000
        })
        return res.data
    }

    const fetchUpdateCar = async (data) => {
        const res  = await axios({
            url: `${url}/cars`,
            data,
            method: 'PUT',
            timeout: 5000
        })
        return res.data
    }

    const doBeforeCloseModal = () => {
        context.dispatchCarToEdit({ type: 'SET', value: {} })
        closeModal()
    }

    return (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={doBeforeCloseModal}          
        >
            <form className="form-car">
                <span>Marca {makeEdit.label}</span>
                <label>Modelo</label>     
                <Select 
                    options={modelsSelect}
                    value={model}
                    onChange={handleModelSelect}
                    className="select"
                    isDisabled={ newModel !== "" || selectDisable}
                /> 
                <label>Nuevo Modelo (Opcional)</label>     
                <input
                    placeholder="Nuevo Modelo"
                    value={newModel}
                    onChange={handleNewModel}
                /> 
                <label>Año { errYear && 'Este campo es requerido' } </label>
                <div>                
                    <input
                        placeholder="Desde"
                        value={yearFrom}
                        onChange={handleYearFrom}
                    /> 
                    <input
                        placeholder="Hasta (opcional)"
                        value={yearTo}
                        onChange={handleYearTo}
                    />
                </div>
                <label>Cilindros { errCylinder && 'Este campo es requerido' }</label>     
                <input
                    placeholder="Cilindros"
                    value={cylinder}
                    onChange={handleCylinder}
                /> 
                <label>Motor { errMotor && 'Este campo es requerido' }</label>                  
                <input
                    placeholder="Motor"
                    value={motor}
                    onChange={handleMotor}
                />
                <div id="input-filters-container-group">
                    <div className="input-filters-container">
                        <span>Filtro de Aire</span>
                        {airFiltersRender.map( (key, idx) => (
                            <InputFilter
                                idx={idx}
                                setFilters={setAirFilters}
                                key={ key }
                                type="airFilter"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeAirFilter}>-</button>
                            <button className="btn btn-primary" onClick={addAirFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>Filtro de Aceite</span>
                        {oilFiltersRender.map( (key, idx) => (
                            <InputFilter
                                idx={idx}
                                setFilters={setOilFilters}
                                key={ key }
                                type="oilFilter"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeOilFilter}>-</button>
                            <button className="btn btn-primary" onClick={addOilFilter}>+</button>
                        </div>
                    </div>
                     <div className="input-filters-container">
                        <span>Filtro de Gasolina</span>
                        {fuelFiltersRender.map( (key, idx) => (
                            <InputFilter
                                idx={idx}
                                setFilters={setFuelFilters}
                                key={ key }
                                type="fuelFilter"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeFuelFilter}>-</button>
                            <button className="btn btn-primary" onClick={addFuelFilter}>+</button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={saveCar}>GUARDAR</button>
                {loading && (
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                )}
            </form>
        </Modal> 
    )
}

export default Form
