import React, { useContext } from 'react'

import { appContext } from '../../context/Provider';

function CarItem({ car, openModal }) {

    if(!car.make || !car.model){ console.log(car) }

    const context = useContext(appContext)

    const setCarToEdit = () => {
        context.dispatchCarToEdit({ type: 'SET', value: car })
        openModal()        
    }

    return (
        <tr>
            <td>{ car.make.name }</td>
            <td>{ car.model.name }</td>
            <td>{ car.year.length === 1 ? car.year[0] : `${car.year[0]}-${car.year[ car.year.length - 1 ]}`}</td>
            <td>{ car.cylinder}</td>
            <td>{ car.motor}</td>
            <td>
                <button className="bnt btn-primary" onClick={setCarToEdit}>EDITAR</button>
            </td>
        </tr>
    )
}

export default CarItem
