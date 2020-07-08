import React, { useState
 } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'
import FilterItem from '../recordsProducts/FilterItem'

function FormEq() {

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
            }
            else{ 
                setFilterNotFound(true) 
                setFilterFound(false)
                setFilters([])
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
        <form id="form-eq">
            <input 
                type="input" 
                placeholder="Referencias Cruzadas"
                value={filterToSearch}
                onChange={handleInputFilter}
            />
            {filterFound && (
                <>  

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
                            {filters.map( filter => (
                                <FilterItem 
                                    filter={filter}
                                    key={filter._id}
                                />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {filterNotFound && ( <p>No se ha encontrado el filtro solicitado.</p> )}
            {loading && (
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    />
            )}
            <button className="btn btn-primary" onClick={getFilter}>Buscar</button>
        </form>
        
    )
}
export default FormEq