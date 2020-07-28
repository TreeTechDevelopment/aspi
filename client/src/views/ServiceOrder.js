import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    return (
        <div className="bg-white direction-row justify-content-start">
            <Navbar />
            <div className="third-window direction-column">
                <Form />
            </div>
            <div className="line-separator"></div> 
            <Service />
        </div>
    )
}

export default ServiceOrd