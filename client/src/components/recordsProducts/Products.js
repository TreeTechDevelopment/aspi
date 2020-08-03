import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from "react-select";
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'  ;
import Form from './Form';
import FilterProducts from './FilterProducts';
import SparkPlugProducts from './SparkPlugProducts';
import WiresetsProducts from './WiresetsProducts';
import BrakeshoeProducts from './BrakeshoeProducts';
import OilProducts from './OilProducts';
import FilterOils from './FilterOils';

function Products({ typeProduct, loading, setLoading }) {

    const optionsTypeFilter = [{ value: 'air', label: 'FILTRO DE AIRE' },
                                { value: 'oil', label: 'FILTRO DE ACEITE' },
                                { value: 'fuel', label: 'FILTRO DE GASOLINA' },
                                { value: 'cabine', label: 'FILTRO DE CABINA' }]  

    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [modalProduct, setModalProduct] = useState(false)
    const [typeFilter, setTypeFilter] = useState(optionsTypeFilter[0])

    const openModal = () => setModalProduct(true)

    const closeModal = () => setModalProduct(false)

    useEffect(() => {
        fetchProducts().then(({ products }) => {
            setProducts(products)
            setLoading(false)
            if(typeProduct.value === "oil"){ setAllProducts(products) }
        }).catch((e) => {
            console.log(e)
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

    const removeProducts = productDeleted => {
        let newProducts = [...products]
        let idx = newProducts.findIndex( product => product._id == productDeleted._id )
        newProducts.splice(idx, 1)
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
            {typeProduct.value === "filter" && (
                <div className="select-container">
                    <div className="label-container">
                        <label>TIPO</label>
                    </div>
                    <Select 
                        value={typeFilter}
                        options={optionsTypeFilter}
                        className="select"
                        onChange={handleSelectTypeFilter}
                    />
                </div>
            )}
            {typeProduct.value === "oil" && (
                <FilterOils 
                    setProducts={setProducts}
                    allProducts={allProducts}
                />
            )}
            <button className="padding-horizontal-fit-content btn-aspi margin-vertical" onClick={openModal}>
                AGREGAR {typeProduct.value === "wiresets" ? typeProduct.label.toUpperCase() : typeProduct.label.slice(0, -1).toUpperCase()}
            </button>       
            <div className="table-container table-products">
                {loading ? (
                    <Loader
                        type="TailSpin" 
                        color="#feb200"
                        height={100}
                        width={100}
                    />
                ) : (
                    typeProduct.value === "sparkPlug" ? (
                        <SparkPlugProducts 
                            sparkplugs={products}
                            openModal={openModal}
                            removeSparkplug={removeProducts}
                        />
                    ) : typeProduct.value === "wiresets" ? ( 
                        <WiresetsProducts 
                            wiresets={products}
                            openModal={openModal}
                            removeWireset={removeProducts}
                        />
                    ) : typeProduct.value === "filter" ? (
                        <FilterProducts 
                            filters={products}
                            openModal={openModal}
                            typeFilter={typeFilter}
                            removeFilter={removeProducts}
                        />
                    ) : typeProduct.value === "brakeShoe" ? (
                        <BrakeshoeProducts 
                            brakeshoes={products}
                            openModal={openModal}
                            removeBrakeshoe={removeProducts}
                        />
                    ) : (
                        <OilProducts 
                            oils={products}
                            openModal={openModal}
                            removeOil={removeProducts} 
                        />
                    )
                )}
            </div>  
            <button className="padding-horizontal-fit-content btn-aspi margin-vertical" onClick={openModal}>
                AGREGAR {typeProduct.value === "wiresets" ? typeProduct.label.toUpperCase() : typeProduct.label.slice(0, -1).toUpperCase()}
            </button>       
        </>
    )
}

export default Products
