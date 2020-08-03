import React, { useState
 } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'
import FilterItem from '../recordsProducts/FilterItem'

function FormEq({ searchFailure, searchSuccess }) {

    const [filters, setFilters] = useState([])
    const [filterToSearch, setFilterToSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [filterNotFound, setFilterNotFound] = useState(false)
    const [filterFound, setFilterFound] = useState(false)

    const getFilter = (e) => {
        e.preventDefault()
        setLoading(true)
        fetchFilter().then(({ filters }) => {
            setLoading(false)
            if(filters.length !== 0){ 
                setFilters(filters) 
                setFilterFound(true)
                setFilterNotFound(false) 
                searchSuccess()
            }
            else{ 
                setFilterNotFound(true) 
                setFilterFound(false)
                setFilters([])
                searchFailure()
            }
        }).catch(() => {
            setLoading(false)
            alert(`${messageServerError}`)
        })
    }

    const fetchFilter  = async () => {
        const res = await axios({
            url: `${url}/products/filter?filter=${filterToSearch}`
        })

        return res.data
    }

    const handleInputFilter = e => {
        if(filterNotFound){ setFilterNotFound(false) }
        setFilterToSearch(e.target.value)
    }

    return (
        <form className="form"> 
            <input 
                type="input" 
                placeholder="REFERENCIAS CRUZADAS"
                value={filterToSearch}
                onChange={handleInputFilter}
                className="input input-center"
            />
            <div className="form-line"></div>
            <button className="btn-aspi" onClick={getFilter}>Buscar</button>
            {filterFound && (
                <div className="table-container table-products ">  

                    <table className="table-filters">
                        <thead>
                            <tr>
                                <th>INTERFIL</th>
                                <th>OEM</th>
                                <th>ACDELCO</th>
                                <th>FRAM</th>
                                <th>GONHER</th>
                                <th>MOTORCARFT</th> 
                                <th>PUROLATOR</th>
                                <th>WIX</th>
                                <th>MANN</th>
                                <th>SKY</th>
                                <th>SEINECA</th>
                                <th>WALMI</th>
                                <th>JOE</th>
                                <th>ROADSTAR</th>
                                <th>ECA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filters.map((filter, idx) => (
                                <FilterItem 
                                    filter={filter}
                                    key={ filter._id }
                                    idx={idx}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {filterNotFound && ( <p>No se ha encontrado el filtro solicitado.</p> )}
            {loading && (
                <Loader
                    type="TailSpin" 
                    color="#feb200"
                    height={50}
                    width={50}
                    />
            )}
            
        </form>
        
    )
}
export default FormEq