import React, { useState } from 'react';
import Select from "react-select";

import Navbar from '../components/Navbar'
import Products from '../components/recordsProducts/Products'

function RecordsProduts() {

    const optionsTypeProducts = [{ value: 'sparkPlug', label: 'Bujías' },
                                { value: 'brakeShoe', label: 'Balatas' },
                                { value: 'filter', label: 'Filtros' },
                                { value: 'wiresets', label: 'Juego de Cables' },
                                { value: 'oil', label: 'Aceites' }]
        
    const [typeProduct, setTypeProduct] = useState(optionsTypeProducts[2])
    const [loading, setLoading] = useState(true)

    const handleSelectTypeProduct = newProduct => {
        setTypeProduct(newProduct)
        setLoading(true)
    }

    return (
        <>
            <Navbar />
            <div className="body">
                <Select 
                    value={typeProduct}
                    options={optionsTypeProducts}
                    className="select"
                    onChange={handleSelectTypeProduct}
                />
                <Products 
                    typeProduct={typeProduct}
                    loading={loading}
                    setLoading={setLoading}
                />
            </div>
        </>
    )
}

export default RecordsProduts
