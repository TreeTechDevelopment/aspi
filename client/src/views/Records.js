import React,{ useState } from 'react'
import { Redirect } from 'react-router-dom';

import Navbar from '../components/Navbar'

function Records({  }) {

    const [redirectCars, setRedirectCars] = useState(false)
    const [redirectFilters, setRedirectCFilters] = useState(false)
    const [redirectServices, setRedirectServices] = useState(false)

    const handleRedirectCars = () => setRedirectCars(true)
    const handleRedirectFilters = () => setRedirectCFilters(true)
    const handleRedirectServies = () => setRedirectServices(true)

    if(redirectCars){ return <Redirect to="records/cars"/> }
    if(redirectFilters){ return <Redirect to="records/products"/> }
    if(redirectServices){ return <Redirect to="records/services"/> }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="btn-container-records">
                <button className="btn-aspi" onClick={handleRedirectCars}>CARROS</button>
                <button className="btn-aspi" onClick={handleRedirectFilters}>PRODUCTOS</button>
                <button className="btn-aspi" onClick={handleRedirectServies}>SERVICIOS</button>
            </div>
        </div>        
    )
}

export default Records
