import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "react-select";
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'  ;
import Form from './Form';
import FilterProducts from './FilterProducts';
import SparkPlugProducts from './SparkPlugProducts';
import WiresetsProducts from './WiresetsProducts';

function Products({ typeProduct, loading, setLoading }) {

    const optionsTypeFilter = [{ value: 'air', label: 'Filtro de Aire' },
                                { value: 'oil', label: 'Filtro de Aceite' },
                                { value: 'fuel', label: 'Filtro de Gasolina' },
                                { value: 'cabine', label: 'Filtro de Cabina' }] 

    const [products, setProducts] = useState([])
    const [modalProduct, setModalProduct] = useState(false)
    const [typeFilter, setTypeFilter] = useState(optionsTypeFilter[0])

    const openModal = () => setModalProduct(true)

    const closeModal = () => setModalProduct(false)

    useEffect(() => {
        fetchProducts().then(({ products }) => {
            setProducts(products)
            setLoading(false)
        }).catch(() => {
            alert(`${messageServerError}`)
        })
    }, [typeProduct, typeFilter])

    const fetchProducts = async () => {
        const res = await axios({
            url: `${url}/products/${typeProduct.value}?type=${typeFilter.value}`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    const handleSelectTypeFilter = newFilter => setTypeFilter(newFilter)

    const setProduct = newProduct => {
        let newProducts = [...products]
        let idx = newProducts.findIndex( product => product._id == newProduct._id )
        newProducts[idx] = newProduct
        setProducts(newProducts)
    }

    const addNewProduct = newProduct => {
        let newProducts = [...products]
        newProducts.push(newProduct)
        setProducts(newProducts)
    }

    return (
        <>
            <Form 
                modalIsOpen={modalProduct}
                closeModal={closeModal}
                filterType={typeFilter}
                typeProduct={typeProduct}
                setProduct={setProduct}
                addNewProduct={addNewProduct}
            />
            <div className="table-records-container">
                {loading ? (
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                ) : (
                    typeProduct.value === "sparkPlug" ? (
                        <SparkPlugProducts 
                            sparkplugs={products}
                            openModal={openModal}
                        />
                    ) : typeProduct.value === "wiresets" ? ( 
                        <WiresetsProducts 
                            wiresets={products}
                            openModal={openModal}
                        />
                    ) : typeProduct.value === "filter" ? (
                        <>
                            <Select 
                                value={typeFilter}
                                options={optionsTypeFilter}
                                className="select"
                                onChange={handleSelectTypeFilter}
                            />
                            <FilterProducts 
                                filters={products}
                                openModal={openModal}
                                typeFilter={typeFilter}
                            />
                        </>
                    ) : (
                        <>
        
                        </>
                    )
                )}
            </div>  
            <button className="btn btn-primary" onClick={openModal}>AGREGAR {typeProduct.label.slice(0, -1).toUpperCase()}</button>       
        </>
    )
}

export default Products
