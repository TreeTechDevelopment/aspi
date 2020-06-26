import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    return (
        <>
        <Navbar />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Form />
                        </div>
                        <div className="col">
                            <Service />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceOrd