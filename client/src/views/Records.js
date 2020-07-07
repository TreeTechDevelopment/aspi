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
        <>
            <Navbar />
            <div className="btn-container-records">
                <button className="btn btn-primary btn-records" onClick={handleRedirectCars}>Carros</button>
                <button className="btn btn-primary btn-records" onClick={handleRedirectFilters}>Productos</button>
                <button className="btn btn-primary btn-records" onClick={handleRedirectServies}>Servicios</button>
            </div>
        </>        
    )
}

export default Records
