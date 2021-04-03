import React from 'react'

import Navbar from '../components/Navbar';
import Services from '../components/recordServices/Services';

function RecordsServices() {
    return (
        <div className="bg-white justify-content-start padding-top direction-column bg-repeat">  
            <Navbar />
            <Services />
        </div>
    )
}

export default RecordsServices
