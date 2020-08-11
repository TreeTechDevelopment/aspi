import React from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    return (
        <div className="bg-white direction-row align-items-start bg-repeat">
            <Navbar />
            <div className="third-window direction-column margin-vertical-auto max-height">
                <Form />
            </div>
            <div className="line-separator"></div>  
            <Service /> 
        </div>
    )
}

export default ServiceOrd