import React, { useState } from 'react';

import FormEq from '../components/crossReference/FormEq';
import Navbar from '../components/Navbar';

function CrossR() {

    const [productFound, setProductFound] = useState(false)

    const searchSuccess= () => setProductFound(true)

    const searchFailure= () => setProductFound(false)
    
    return (
        <div className={`bg-white direction-column bg-repeat ${ productFound ? 'justify-content-start padding-top' : '' }`}>
            <Navbar />
            <FormEq 
                searchFailure={searchFailure}
                searchSuccess={searchSuccess}
            />
        </div>
    )
}

export default CrossR
