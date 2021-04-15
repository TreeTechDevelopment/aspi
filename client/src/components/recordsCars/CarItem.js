import React, { useContext } from 'react'

import { appContext } from '../../context/Provider';
import { url } from '../../../app.json'

function CarItem({ car, openModal, idx }) {

    if(car.model.name === "Sedan"){ console.log(car) }

    const context = useContext(appContext)

    const setCarToEdit = () => {
        context.dispatchCarToEdit({ type: 'SET', value: car })
        openModal()        
    }

    return (
        <tr>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>{ car.model.name }</td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>{ car.year.length === 1 ? car.year[0] : `${car.year[0]}-${car.year[ car.year.length - 1 ]}`}</td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>{ car.cylinder}</td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>{ car.motor}</td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                <button className="btn-edit" onClick={setCarToEdit}>
                    <img src={`${url}/images/edit.png`}/>
                </button>
            </td>
        </tr>
    )
}

export default CarItem
