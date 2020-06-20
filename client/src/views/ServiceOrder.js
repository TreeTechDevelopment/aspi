import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    const [car, setCar] = useState({})

    return (
        <>
        <Navbar />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Form setCar={setCar}/>
                        </div>
                        <div className="col">
                            <Service car={car}/>            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceOrd