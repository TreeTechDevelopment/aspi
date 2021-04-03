import React, { useState
 } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError, messageUnauthorized } from '../../../app.json'

function FormEq({ searchFailure, searchSuccess, setTypeProduct, typeProduct, setProducts, productFound }) {

    const [filterToSearch, setFilterToSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [foundOnce, setFoundOnce] = useState(false)

    const handleFilterCheckbox = () => {
        setProducts([])
        setTypeProduct('filter')
    }
    const handleSparkplugCheckbox = () => {
        setProducts([])
        setTypeProduct('sparkPlug')
    }
    const handleWiresetCheckbox = () => {
        setProducts([])
        setTypeProduct('wiresets')
    }
    const handleBrakeshoeCheckbox = () => {
        setProducts([])
        setTypeProduct('brakeShoe')
    }
    const handleCoilCheckbox = () => {
        setProducts([])
        setTypeProduct('coil')
    }

    const getFilter = (e) => {
        e.preventDefault()
        setLoading(true)
        setFoundOnce(true)
        fetchFilter().then(({ filters }) => {
            setLoading(false)
            console.log(filters)
            if(filters.length !== 0){ 
                setProducts(filters)
                searchSuccess()
            }
            else{ 
                setProducts([])
                searchFailure()
            }
        }).catch((e) => {
            setLoading(false)
            if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  }
            alert(`${messageServerError}`)
        })
    }

    const fetchFilter  = async () => {
        const res = await axios({
            url: `${url}/products/${typeProduct}?filter=${filterToSearch}`
        })

        return res.data
    }

    const handleInputFilter = e => {
        if(!productFound){ searchSuccess() }
        setFilterToSearch(e.target.value)
    }

    return (
        <>
        <div className="checkbox-sell-container">
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "filter"}
                    onClick={handleFilterCheckbox}
                    id="filterCheckbox"
                />
                <label htmlFor="filterCheckbox">FILTROS</label>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "sparkPlug"}
                    onClick={handleSparkplugCheckbox}
                    id="sparkplugCheckbox"
                />
                <label htmlFor="sparkplugCheckbox">BUJÍAS</label>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "brakeShoe"}
                    onClick={handleBrakeshoeCheckbox}
                    id="brakeshoeCheckbox"
                />
                <label htmlFor="brakeshoeCheckbox">BALATAS</label>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "wiresets"}
                    onClick={handleWiresetCheckbox}
                    id="wiresetCheckbox"
                />
                <label htmlFor="wiresetCheckbox">JUEGO DE CABLES</label>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "coil"}
                    onClick={handleCoilCheckbox}
                    id="coilCheckbox"
                />
                <label htmlFor="coilCheckbox">BOBINAS</label>
            </div>
        </div>
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
            {loading && (
                <div className="margin-top">
                    <Loader
                        type="TailSpin" 
                        color="#feb200"
                        height={50}
                        width={50}
                    />
                </div>
            )}
            {!productFound && foundOnce && (
                <div className="margin-top">
                    <p>NO SE HAN ENCONTRADO PRODUCTOS</p>
                </div>
            )}
        </form>
        </>
    )
}
export default FormEq