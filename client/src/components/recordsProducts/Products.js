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
import AntifreezeProducts from './AntifreezeProducts';
import CoilProducts from './CoilProducts';

function Products({ typeProduct, loading, setLoading }) {

    const optionsTypeFilter = [{ value: 'air', label: 'FILTRO DE AIRE' },
                                { value: 'oil', label: 'FILTRO DE ACEITE' },
                                { value: 'fuel', label: 'FILTRO DE GASOLINA' },
                                { value: 'cabine', label: 'FILTRO DE CABINA' }]  
    
    const optionsLimitProducts = [{ value: 10, label: 10 }, { value: 20, label: 20 }, { value: 50, label: 50 }, { value: 'all', label: 'TODOS' }]  

    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [modalProduct, setModalProduct] = useState(false)
    const [typeFilter, setTypeFilter] = useState(optionsTypeFilter[0])
    const [limitProducts, setLimitProducts] = useState(optionsLimitProducts[0])
    const [totalProducts, setTotalProducts] = useState(0)
    const [page, setPage] = useState(0)

    const openModal = (e) => {
        e?.preventDefault()
        if(!loading){ setModalProduct(true) }
    }

    const closeModal = () => setModalProduct(false)

    useEffect(() => {
        fetchProducts().then(({ products, count }) => {
            setProducts(products)
            setLoading(false)
            setTotalProducts(count)
            if(typeProduct.value === "oil"){ setAllProducts(products) }
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        })
    }, [typeProduct, typeFilter, limitProducts, page])

    const fetchProducts = async () => {
        const res = await axios({
            url: `${url}/products/${typeProduct.value}?type=${typeFilter.value}&limit=${limitProducts.value}&page=${page}`,
            method: 'GET',
            timeout: 15000
        })

        return res.data
    }

    const handleSelectTypeFilter = newFilter => setTypeFilter(newFilter)

    const handleSelectLimitPorducts = newFilter => {
        setLimitProducts(newFilter)
        setPage(0)
    }

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

    useEffect(() => {
        console.log(page)
    }, [page])

    const stepBackPage = e => {
        e.preventDefault()
        if(page >= 3){ setPage( page - 3) }
    }

    const lastPage = e => {
        e.preventDefault()
        if(page > 0){ setPage(page - 1) }
    }

    const nextPage = e => {
        e.preventDefault()
        console.log(totalProducts)
        console.log(limitProducts)
        if(page < (totalProducts / limitProducts.value) - 1){ setPage(page + 1) }
    }

    const stepForwardPage = e => {
        e.preventDefault()
        if(page < (totalProducts / limitProducts.value) - 4){ setPage(page + 3) }
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
            {typeProduct.value === "filter" && (
                <div className="filter-table-container">
                    <div className="select-container small">
                        <div className="label-container">
                            <label>MOSTRAR</label>
                        </div>
                        <Select 
                            value={limitProducts}
                            options={optionsLimitProducts}
                            className="select"
                            onChange={handleSelectLimitPorducts}
                        />
                    </div>
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
            <div className={`table-container table-products ${!loading ? 'flex-start' : ''}`}>
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
                            edit={true}
                        />
                    ) : typeProduct.value === "wiresets" ? ( 
                        <WiresetsProducts 
                            wiresets={products}
                            openModal={openModal}
                            removeWireset={removeProducts} 
                            edit={true}
                        />
                    ) : typeProduct.value === "filter" ? (
                        <FilterProducts 
                            filters={products}
                            openModal={openModal}
                            typeFilter={typeFilter}
                            removeFilter={removeProducts}
                            edit={true}
                        />
                    ) : typeProduct.value === "brakeShoe" ? (
                        <BrakeshoeProducts 
                            brakeshoes={products}
                            openModal={openModal}
                            removeBrakeshoe={removeProducts}
                            edit={true}
                        />
                    ) : typeProduct.value === "oil" ? (
                        <OilProducts 
                            oils={products}
                            openModal={openModal}
                            removeOil={removeProducts} 
                        />
                    ) : typeProduct.value === "coil" ? (
                        <CoilProducts 
                            coils={products}
                            openModal={openModal}
                            removeCoil={removeProducts}
                            edit={true}
                        />
                    ) : (
                        <AntifreezeProducts 
                            antifreezes={products}
                            openModal={openModal}
                            removeAntifreeze={removeProducts} 
                        />
                    )
                )}
            </div>
            <div className="btn-pagination-container">
                <button className="btn-aspi" onClick={stepBackPage}>&lt;&lt;</button>
                <button className="btn-aspi" onClick={lastPage}>&lt;</button>
                <button className="btn-aspi" onClick={nextPage}>&gt;</button>
                <button className="btn-aspi" onClick={stepForwardPage}>&gt;&gt;</button>
            </div>
            <button className="padding-horizontal-fit-content btn-aspi margin-vertical" onClick={openModal}>
                AGREGAR {typeProduct.value === "wiresets" ? typeProduct.label.toUpperCase() : typeProduct.label.slice(0, -1).toUpperCase()}
            </button>       
        </>
    )
}

export default Products
