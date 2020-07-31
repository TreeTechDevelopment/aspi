import React, { useState } from 'react';
import Select from "react-select";

import Navbar from '../components/Navbar'
import Products from '../components/recordsProducts/Products'

function RecordsProduts() {

    const optionsTypeProducts = [{ value: 'sparkPlug', label: 'BUJÍAS' },
                                { value: 'brakeShoe', label: 'BALATAS' },
                                { value: 'filter', label: 'FILTROS' },
                                { value: 'wiresets', label: 'JUEGO DE CABLES' },
                                { value: 'oil', label: 'ACEITES' }]
        
    const [typeProduct, setTypeProduct] = useState(optionsTypeProducts[2])
    const [loading, setLoading] = useState(true)

    const handleSelectTypeProduct = newProduct => {
        setTypeProduct(newProduct)
        setLoading(true)
    }

    return (
        <div className="bg-white justify-content-start padding-top direction-column bg-repeat">
            <Navbar /> 
            <div className="select-container">
                <div className="label-container">
                    <label>PRODCUTO</label>
                </div>
                <Select 
                    value={typeProduct}
                    options={optionsTypeProducts}
                    className="select"
                    onChange={handleSelectTypeProduct}
                />
            </div>
            <Products 
                typeProduct={typeProduct}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    )
}

export default RecordsProduts
