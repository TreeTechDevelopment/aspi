import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import Loader from 'react-loader-spinner';

import Navbar from '../components/Navbar'
import CarItem from '../components/recordsCars/CarItem'
import Form from '../components/recordsCars/Form'
import { url, messageServerError, messageUnauthorized } from '../../app.json'

function RecordsCars() {

    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])
    const [makesSelect, setMakesSelect] = useState([])
    const [cars, setCars] = useState([])  
    const [loading, setLoading] = useState(true)  
    const [openModalNewCar, setOpenModalNewCar] = useState(false)     
    const [make, setMake] = useState({})      

    useEffect(() => {
        fetchInfo().then(({ makes, models }) => {
            setMakes(makes)
            let makesSelect = makes.map(make => { return { value: make._id, label: make.name } } )
            setMakesSelect(makesSelect)
            setMake(makesSelect[0])
            setModels(models)
        }).catch((e) => {
            if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
            alert(`${messageServerError}`)
        })
    }, [])

    useEffect(() => {
        if(make.value){
            fetchCars().then(({ cars }) => {
                setLoading(false)
                setCars(cars)                
            }).catch(() => {
                setLoading(false)
                if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
                alert(`${messageServerError}`)
            })
        }
    },[make])

    const fetchCars = async () => {
        const res = await axios({
            url: `${url}/cars?make=${make.value}`,
            method: 'GET',
            timeout: 10000
        })
        return res.data
    }

    const fetchInfo = async () => {
        const res = await axios({
            url: `${url}/cars/info`,
            method: 'GET',
            timeout: 10000
        })
        return res.data
    }

    const handleMakeSelect = newMake => {
        if(newMake.value != make.value){ setLoading(true) } 
        setMake(newMake)
    }

    const openModal = () => setOpenModalNewCar(true) 
    
    const closeModal = () => setOpenModalNewCar(false) 

    const addCar = newCar => {
        let newCars = [...cars]
        newCars.push(newCar)
        setCars(newCars)
    }

    const updateCar = newCar => {
        let newCars = [...cars]
        let idx = newCars.findIndex( car => car._id == newCar._id )
        newCars[idx] = newCar
        setCars(newCars)
    }

    const openModalEditCar = () => setOpenModalNewCar(true)

    return (
        <div className="bg-white justify-content-start padding-top direction-column bg-repeat">
            <Navbar />
            <Form 
                modalIsOpen={openModalNewCar}
                models={models}
                make={make}
                closeModal={closeModal}
                addCar={addCar}
                updateCar={updateCar}
            />
            <div className="select-container">
                <div className="label-container">
                    <label>MARCA</label>
                </div>
                <Select 
                    options={makesSelect}
                    value={make}
                    onChange={handleMakeSelect}
                    className="select"
                />
            </div>
            <button className="padding-horizontal-fit-content btn-aspi margin-vertical" onClick={openModal}>AGREGAR CARRO</button>
            <div className="table-container">
                {loading ? (
                    <Loader
                        type="TailSpin" 
                        color="#feb200"
                        height={100}
                        width={100}
                    />
                ): (
                    <table>
                        <thead>
                            <tr>
                                <th>MODELO</th>
                                <th>AÑO</th>
                                <th>CILINDROS</th>
                                <th>MOTOR</th>
                                <th>EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map( (car, idx) => (
                                <CarItem 
                                    car={car} 
                                    key={car._id} 
                                    openModal={openModalEditCar}
                                    idx={idx}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <button className="padding-horizontal-fit-content btn-aspi margin-vertical" onClick={openModal}>AGREGAR CARRO</button>
        </div>
    )
}

export default RecordsCars
