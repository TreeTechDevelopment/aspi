import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import Loader from 'react-loader-spinner';

import Navbar from '../components/Navbar'
import FilterItem from '../components/recordsFilters/FilterItem'
import Form from '../components/recordsFilters/Form'
import { url, messageServerError } from '../../app.json'

function RecordsFilters() {

    const optionsTypeFilter = [{ value: 'air', label: 'Filtro de Aire' },
                                { value: 'oil', label: 'Filtro de Aceite' },
                                { value: 'fuel', label: 'Filtro de Gasolina' },
                                { value: 'cabine', label: 'Filtro de Cabina' }]

    const [filters, setFilters] = useState([])    
    const [loading, setLoading] = useState(true)
    const [openModalFilter, setOpenModalFilter] = useState(false)
    const [typeFilter, setTypeFilter] = useState(optionsTypeFilter[0])

    useEffect(() => {
        fetchFilters().then(({ filters }) => {            
            setFilters(filters)
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            setLoading(false)
            alert(`${messageServerError}`)
        })
    }, [])

    const fetchFilters = async () => {
        const res = await axios({
            url: `${url}/filters?type=${typeFilter.value}`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    const handleSelectTypeFilter = newFilter => setTypeFilter(newFilter)

    const openModal = () => setOpenModalFilter(true)

    const closeModal = () => setOpenModalFilter(false)

    const addNewFilter = (newFilter) => {
        let newFilters = [...filters]
        newFilters.push(newFilter)
        setFilters(newFilters)
    }

    const updateFilter = (newFilter) => {
        let newFilters = [...filters]
        let idx = newFilters.findIndex( filter => filter._id == newFilter._id )
        newFilters[idx] = newFilter
        setFilters(newFilters)
    }

    return (
        <>
            <Navbar />
            <div className="body">
                <Select 
                    value={typeFilter}
                    options={optionsTypeFilter}
                    className="select"
                    onChange={handleSelectTypeFilter}
                />
                <Form 
                    modalIsOpen={openModalFilter}
                    closeModal={closeModal}
                    filterType={typeFilter}
                    setNewFilter={addNewFilter}
                    setFilter={updateFilter}
                />
                <div className="table-records-container">
                    {loading ? (
                        <Loader
                            type="Rings"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    ): (
                        <table>
                            <thead>
                                <tr>
                                    <th>Interfill</th>
                                    <th>OEM</th>
                                    <th>ACDelco</th>
                                    <th>Fram</th>
                                    <th>Gonher</th>
                                    <th>Motorcraft</th>
                                    <th>Purolator</th>
                                    <th>Wix</th>
                                    <th>Mann</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filters.map(filter => (
                                    <FilterItem 
                                        filter={filter}
                                        key={ filter._id }
                                        openModal={openModal}
                                        edit={true}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button className="btn btn-primary" onClick={openModal}>AGREGAR FILTRO</button>
            </div>
        </>
    )
}

export default RecordsFilters
