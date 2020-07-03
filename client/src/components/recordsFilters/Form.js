import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import InputFilter from './InputFilter'

function Form({ modalIsOpen, closeModal, filterType, setNewFilter, setFilter }) {

    const context = useContext(appContext)
    
    const [OEMToRender, setOEMToRender] = useState([Math.random().toString()])
    const [ACDToRender, setACDToRender] = useState([Math.random().toString()])
    const [FramToRender, setFramToRender] = useState([Math.random().toString()])
    const [GonherToRender, setGonherToRender] = useState([Math.random().toString()])
    const [MotorcraftToRender, setMotorcraftToRender] = useState([Math.random().toString()])
    const [PurolatorToRender, setPurolatorToRender] = useState([Math.random().toString()])
    const [WixToRender, setWixToRender] = useState([Math.random().toString()])
    const [MannToRender, setMannToRender] = useState([Math.random().toString()])    

    const [OEM, setOEM] = useState([])
    const [ACD, setACD] = useState([])
    const [Fram, setFram] = useState([])
    const [Gonher, setGonher] = useState([])
    const [Motorcraft, setMotorcraft] = useState([])
    const [Purolator, setPurolator] = useState([])
    const [Wix, setWix] = useState([])
    const [Mann, setMann] = useState([])  

    const [loading, setLoading] = useState(false)
    const [interfill, setInterfill] = useState('')
    const [price, setPrice] = useState('')

    const addOEMFilter = (e) => {
        e.preventDefault()
        let newOEMFilters = [...OEMToRender]
        newOEMFilters.push(Math.random().toString())
        setOEMToRender(newOEMFilters)
    }

    const removeOEMFilter = (e) => {
        e.preventDefault()
        let newOEMFilters = [...OEMToRender]
        newOEMFilters.splice(-1 ,1)
        setOEMToRender(newOEMFilters)
    }

    const addACDFilter = (e) => {
        e.preventDefault()
        let newACDFilters = [...ACDToRender]
        newACDFilters.push(Math.random().toString())
        setACDToRender(newACDFilters)
    }

    const removeACDFilter = (e) => {
        e.preventDefault()
        let newACDFilters = [...ACDToRender]
        newACDFilters.splice(-1 ,1)
        setACDToRender(newACDFilters)
    }

    const addFramFilter = (e) => {
        e.preventDefault()
        let newFramFilters = [...FramToRender]
        newFramFilters.push(Math.random().toString())
        setFramToRender(newFramFilters)
    }

    const removeFramFilter = (e) => {
        e.preventDefault()
        let newFramFilters = [...FramToRender]
        newFramFilters.splice(-1, 1)
        setFramToRender(newFramFilters)
    }

    const addGonherFilter = (e) => {
        e.preventDefault()
        let newGonherFilters = [...GonherToRender]
        newGonherFilters.push(Math.random().toString())
        setGonherToRender(newGonherFilters)
    }

    const removeGonherFilter = (e) => {
        e.preventDefault()
        let newGonherFilters = [...GonherToRender]
        newGonherFilters.splice(-1, 1)
        setGonherToRender(newGonherFilters)
    }

    const addMotorcraftFilter = (e) => {
        e.preventDefault()
        let newMotorcraftFilters = [...MotorcraftToRender]
        newMotorcraftFilters.push(Math.random().toString())
        setMotorcraftToRender(newMotorcraftFilters)
    }

    const removeMotorcraftFilter = (e) => {
        e.preventDefault()
        let newMotorcraftFilters = [...MotorcraftToRender]
        newMotorcraftFilters.splice(-1, 1)
        setMotorcraftToRender(newMotorcraftFilters)
    }

    const addPurolatorFilter = (e) => {
        e.preventDefault()
        let newPurolatorFilters = [...PurolatorToRender]
        newPurolatorFilters.push(Math.random().toString())
        setPurolatorToRender(newPurolatorFilters)
    }

    const removePurolatorFilter = (e) => {
        e.preventDefault()
        let newPurolatorFilters = [...PurolatorToRender]
        newPurolatorFilters.splice(-1, 1)
        setPurolatorToRender(newPurolatorFilters)
    }

    const addWixFilter = (e) => {
        e.preventDefault()
        let newWixFilters = [...WixToRender]
        newWixFilters.push(Math.random().toString())
        setWixToRender(newWixFilters)
    }
    
    const removeWixFilter = (e) => {
        e.preventDefault()
        let newWixFilters = [...WixToRender]
        newWixFilters.splice(-1, 1)
        setWixToRender(newWixFilters)
    }

    const addMannFilter = (e) => {
        e.preventDefault()
        let newMannFilters = [...MannToRender]
        newMannFilters.push(Math.random().toString())
        setMannToRender(newMannFilters)
    }

    const removeMannFilter = (e) => {
        e.preventDefault()
        let newMannFilters = [...MannToRender]
        newMannFilters.splice(-1, 1)
        setMannToRender(newMannFilters)
    }

    const setOEMFilter = (value, idx) => {
        let newOEMFilters = [...OEM]
        newOEMFilters[idx] = value
        setOEM(newOEMFilters)
    }

    const setACDFilter = (value, idx) => {
        let newACDFilters = [...ACD]
        newACDFilters[idx] = value
        setACD(newACDFilters)
    }

    const setFramFilter = (value, idx) => {
        let newFramFilters = [...Fram]
        newFramFilters[idx] = value
        setFram(newFramFilters)
    }

    const setGonherFilter = (value, idx) => {
        let newGonherFilters = [...Gonher]
        newGonherFilters[idx] = value
        setGonher(newGonherFilters)
    }

    const setMotorcraftFilter = (value, idx) => {
        let newMotorcraftFilters = [...Motorcraft]
        newMotorcraftFilters[idx] = value
        setMotorcraft(newMotorcraftFilters)
    }

    const setPurolatorFilter = (value, idx) => {
        let newPurolatorFilters = [...Purolator]
        newPurolatorFilters[idx] = value
        setPurolator(newPurolatorFilters)
    }

    const setWixFilter = (value, idx) => {
        let newWixFilters = [...Wix]
        newWixFilters[idx] = value
        setWix(newWixFilters)
    }

    const setMannFilter = (value, idx) => {
        let newMannFilters = [...Mann]
        newMannFilters[idx] = value
        setMann(newMannFilters)
    }

    const handleInputInterfill = (e) => setInterfill(e.target.value)

    const saveFilter = () => {
        setLoading(true)
        let data = {
            interfill, OEM, ACD, Fram, Gonher, Motorcraft,
            Purolator, Wix, Mann, price
        }
        if(JSON.stringify(context.filter) !== "{}") {
            data.id = context.filter._id
            updateFilter(data).then(({newFilter}) => {
                setLoading(false)
                setFilter(newFilter)
                doBeforeCloseModal()
            }).catch((e) => {
                console.log(e)
                setLoading(false)
                alert(`${messageServerError}`)
            })
        }else{
            createFilter(data).then(({newFilter}) => {
                setLoading(false)
                setNewFilter(newFilter)
                doBeforeCloseModal()
            }).catch(() => {
                setLoading(false)
                alert(`${messageServerError}`)
            })
        }
    }

    const createFilter = async (data) => {
        const res = await axios({
            url: `${url}/filters/`,
            method: 'POST',
            timeout: 5000,
            data
        })

        return res.data
    }

    const updateFilter = async (data) => {
        const res = await axios({
            url: `${url}/filters/`,
            method: 'PUT',
            timeout: 5000,
            data
        })

        return res.data
    }

    useEffect(() => {
        if( JSON.stringify(context.filter) !== "{}"){
            setInterfill(context.filter.interfill)
            setOEM(context.filter.OEM)
            setACD(context.filter.ACD)
            setFram(context.filter.Fram)
            setMotorcraft(context.filter.Motorcraft)
            setGonher(context.filter.Gonher)
            setPurolator(context.filter.Purolator)
            setWix(context.filter.Wix)            
            setMann(context.filter.Mann)
            setPrice(context.filter.price.toString())

            let newOEMFilters = []
            for(let i = 0; i < context.filter.OEM.length; i++){ newOEMFilters.push(Math.random().toString()) }
            setOEMToRender(newOEMFilters)
            let newACDFilters = []
            for(let i = 0; i < context.filter.ACD.length; i++){ newACDFilters.push(Math.random().toString()) }
            setACDToRender(newACDFilters)
            let newFramFilters = []
            for(let i = 0; i < context.filter.Fram.length; i++){ newFramFilters.push(Math.random().toString()) }
            setFramToRender(newFramFilters)
            let newGonherFilters = []
            for(let i = 0; i < context.filter.Gonher.length; i++){ newGonherFilters.push(Math.random().toString()) }
            setGonherToRender(newGonherFilters)
            let newMotorcraftFilters = []
            for(let i = 0; i < context.filter.Motorcraft.length; i++){ newMotorcraftFilters.push(Math.random().toString()) }
            setMotorcraftToRender(newMotorcraftFilters)
            let newPurolatorFilters = []
            for(let i = 0; i < context.filter.Purolator.length; i++){ newPurolatorFilters.push(Math.random().toString()) }
            setPurolatorToRender(newPurolatorFilters)
            let newWixFilters = []
            for(let i = 0; i < context.filter.Wix.length; i++){ newWixFilters.push(Math.random().toString()) }
            setWixToRender(newWixFilters)
            let newMannFilters = []
            for(let i = 0; i < context.filter.Mann.length; i++){ newMannFilters.push(Math.random().toString()) }
            setMannToRender(newMannFilters)
        }
    }, [context.filter])

    const doBeforeCloseModal = () => {
        context.dispatchFilter({ type: 'SET', value: {} })
        closeModal()
    }

    const handleInputPrice = e => setPrice(e.target.value.replace(/[^0-9]/g, ''))
    

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={doBeforeCloseModal}
        >
            <div className="form-car">
                <span>{ filterType.label }</span>
                <div className="input-filters-container">
                    <span>Precio</span>
                    <input 
                        value={price}
                        onChange={handleInputPrice}
                    />
                </div>               
                <div id="input-filters-container-group">
                    <div className="input-filters-container">
                        <span>interfill</span>
                        <input 
                            value={interfill}
                            onChange={handleInputInterfill}
                        />
                    </div>
                    <div className="input-filters-container">
                        <span>OEM</span>
                        {OEMToRender.map((key, idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setOEMFilter}
                                type="OEM"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeOEMFilter}>-</button>
                            <button className="btn btn-primary" onClick={addOEMFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>ACDelco</span>
                        {ACDToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setACDFilter}
                                type="ACD"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeACDFilter}>-</button>
                            <button className="btn btn-primary" onClick={addACDFilter}>+</button>
                        </div>
                    </div>
                </div>
                <div id="input-filters-container-group">
                    <div className="input-filters-container">
                        <span>Fram</span>
                        {FramToRender.map((key,idx) => (
                            <InputFilter 
                                idx={idx}
                                setFilters={setFramFilter}
                                key={key}
                                type="Fram"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeFramFilter}>-</button>
                            <button className="btn btn-primary" onClick={addFramFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>Gonher</span>
                        {GonherToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setGonherFilter}
                                type="Gonher"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeGonherFilter}>-</button>
                            <button className="btn btn-primary" onClick={addGonherFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>Motorcraft</span>
                        {MotorcraftToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setMotorcraftFilter}
                                type="Motorcraft"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeMotorcraftFilter}>-</button>
                            <button className="btn btn-primary" onClick={addMotorcraftFilter}>+</button>
                        </div>
                    </div>
                </div>
                <div id="input-filters-container-group">
                    <div className="input-filters-container">
                        <span>Purolator</span>
                        {PurolatorToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setPurolatorFilter}
                                type="Purolator"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removePurolatorFilter}>-</button>
                            <button className="btn btn-primary" onClick={addPurolatorFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>Wix</span>
                        {WixToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setWixFilter}
                                type="Wix"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeWixFilter}>-</button>
                            <button className="btn btn-primary" onClick={addWixFilter}>+</button>
                        </div>
                    </div>
                    <div className="input-filters-container">
                        <span>Mann</span>
                        {MannToRender.map((key,idx) => (
                            <InputFilter 
                                key={key}
                                idx={idx}
                                setFilters={setMannFilter}
                                type="Mann"
                            />
                        ))}
                        <div className="btns-filter-container">
                            <button className="btn btn-primary" onClick={removeMannFilter}>-</button>
                            <button className="btn btn-primary" onClick={addMannFilter}>+</button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={saveFilter}>GUARDAR</button>
                {loading && (
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                )}
            </div>
        </Modal>
    )
}

export default Form
