import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import Navbar from '../components/Navbar'

function Services() {

    const [redirectOrderService, setRedirectOrderService] = useState(false)
    const [redirectSell, setRedirectSell] = useState(false)

    const handleRedirectOrderService = () => setRedirectOrderService(true)
    const handleRedirectSells = () => setRedirectSell(true)

    if(redirectOrderService){ return <Redirect to="services/service-order"/> }
    if(redirectSell){ return <Redirect to="services/sells"/> }

    return (
        <div className="bg-white">
            <Navbar />
            <div className="btn-container-records">
                <button className="btn-aspi" onClick={handleRedirectSells}>VENTAS</button>
                <button className="btn-aspi width-fitcontent" onClick={handleRedirectOrderService}>ORDEN DE SERVICIO</button>
            </div>
        </div> 
    )
}

export default Services
