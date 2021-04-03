import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import Navbar from '../components/Navbar'

function Search() {
    const [redirectOrders, setRedirectOrders] = useState(false)
    const [redirectCars, setRedirectCars] = useState(false)

    const handleRedirectCars = () => setRedirectCars(true)
    const handleRedirectOrders = () => setRedirectOrders(true)

    if(redirectCars){ return <Redirect to="search/cars"/> }
    if(redirectOrders){ return <Redirect to="search/orders"/> }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="btn-container-records">
                <button className="btn-aspi" onClick={handleRedirectOrders}>ORDENES</button>
                <button className="btn-aspi" onClick={handleRedirectCars}>CARROS</button>
            </div>
        </div>        
    )
}

export default Search
