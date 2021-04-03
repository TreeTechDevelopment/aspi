import React, { useState } from 'react';

import FormEq from '../components/crossReference/FormEq';
import Navbar from '../components/Navbar';
import FilterProducts from '../components/recordsProducts/FilterProducts';
import SparkPlugProducts from '../components/recordsProducts/SparkPlugProducts';
import WiresetsProducts from '../components/recordsProducts/WiresetsProducts';
import BrakeshoeProducts from '../components/recordsProducts/BrakeshoeProducts';
import CoilProducts from '../components/recordsProducts/CoilProducts';

function CrossR() {

    const [productFound, setProductFound] = useState(false)
    const [typeProduct, setTypeProduct] = useState('filter')
    const [products, setProducts] = useState([])
    
    const searchSuccess= () => setProductFound(true)

    const searchFailure= () => setProductFound(false)
    
    return (
        <div className={`bg-white direction-column bg-repeat justify-content-start padding-top`}>
            <Navbar />
            <FormEq 
                searchFailure={searchFailure}
                searchSuccess={searchSuccess}
                setTypeProduct={setTypeProduct}
                setProducts={setProducts}
                typeProduct={typeProduct}
                productFound={productFound}
            />
            {products.length !== 0 && (
                <div className={`table-container table-products flex-start`}>
                    {typeProduct === "filter" ? (
                        <FilterProducts 
                            filters={products}
                        />
                    ) : typeProduct === "sparkPlug" ? (
                        <SparkPlugProducts 
                            sparkplugs={products}
                        />
                    ) : typeProduct === "wiresets" ? (
                        <WiresetsProducts 
                            wiresets={products}
                        />
                    ) : typeProduct === "brakeShoe" ? (
                        <BrakeshoeProducts 
                            brakeshoes={products}
                        />
                    ) : typeProduct === "coil" && (
                        <CoilProducts 
                            coils={products}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default CrossR
