import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    return (
        <div className="bg-white direction-row">
            <Navbar />
            <div className="half-window direction-column">
                <Form />
            </div>
            <div className="line-separator"></div>
            <div className="half-window">
                <Service />
            </div>
        </div>
    )
}

export default ServiceOrd