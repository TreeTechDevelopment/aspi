import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import Form from '../components/serviceOrder/Form';
import Service from '../components/serviceOrder/Service';

function ServiceOrd() {

    const [car, setCar] = useState({})
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')

    const setMakeCar = newMake => setMake(newMake)
    const setModelCar = newModel => setModel(newModel)
    const setYearCar = newYear => setYear(newYear)

    return (
        <>
        <Navbar />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Form 
                                setCar={setCar}
                                setMakeCar={setMakeCar}
                                setModelCar={setModelCar}
                                setYearCar={setYearCar}
                            />
                        </div>
                        <div className="col">
                            <Service 
                                car={car}
                                make={make}
                                model={model}
                                year={year}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceOrd