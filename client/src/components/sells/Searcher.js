import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError, messageUnauthorized } from '../../../app.json'
import { appContext } from '../../context/Provider'

function Searcher({ setProducts, typeProduct, setTypeProduct }) {

    const context = useContext(appContext)

    const [product, setProduct] = useState('')
    const [loading, setLoading] = useState(false)

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
    const handleOilCheckbox = () => {
        setProducts([])
        setTypeProduct('oil')
    }
    const handleAntifreezeCheckbox = () => {
        setProducts([])
        setTypeProduct('antifreeze')
    }
    const handleCoilCheckbox = () => {
        setProducts([])
        setTypeProduct('coil')
    }

    const handleProduct = e => setProduct(e.target.value)

    const getProducts = e => {
        e.preventDefault()
        setLoading(true)
        fetchProducts().then(({ filters }) => {
            if(typeProduct === "oil"){
                return context.dispatchOils({ type: 'SET', value: filters })
            }
            setProducts(filters)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
            alert(`${messageServerError}`)
        })
    }

    const fetchProducts = async () => {
        const res = await axios({
            url: `${ url }/products/${typeProduct}?filter=${product}`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    useEffect(() => {
        if(typeProduct === "oil" || typeProduct === "antifreeze"){
            fetchProducts().then(({ products }) => {
                if(typeProduct === "oil"){ context.dispatchOils({ type: 'SET', value: products }) }
                else{ context.dispatchAntifreezes({ type: 'SET', value: products }) }
                setLoading(false)
            }).catch(() => {
                setLoading(false)
                if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
                alert(`${messageServerError}`)
            })
        }
    }, [typeProduct])

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
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "oil"}
                    onClick={handleOilCheckbox}
                    id="oilCheckbox"
                />
                <label htmlFor="oilCheckbox">ACEITES</label>
            </div>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    checked={typeProduct === "antifreeze"}
                    onClick={handleAntifreezeCheckbox}
                    id="antifreezeCheckbox"
                />
                <label htmlFor="antifreezeCheckbox">ANTICONGELANTES</label>
            </div>
        </div>
        {typeProduct !== "oil" && typeProduct !== "antifreeze" && (
            <form className="form">
                <input 
                    type="input" 
                    placeholder="BUSCAR PRODUCTOS"
                    value={product}
                    onChange={handleProduct}
                    className="input input-center"
                />
                <div className="form-line"></div>
                <button className="btn-aspi" onClick={getProducts}>BUSCAR</button>
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
            </form>
        )}
        </>
    )
}

export default Searcher
