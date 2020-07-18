import React, { useContext } from 'react'

import { appContext } from '../../context/Provider'

function OilItem({ oil, openModal }) {

    const context = useContext(appContext)

    const editOil = () => {        
        context.dispatchProduct({ type: 'SET', value: oil }) 
        openModal()
    }


    return (
        <tr>
            <td >
                { oil.make}
            </td>
            <td>
                { oil.viscosity}
            </td>
            <td>
                { oil.presentation}
            </td>
            <td>
                { oil.lts.map}
            </td>
            <td>
                <button className="bnt btn-primary" onClick={editOil}>EDITAR</button>
            </td>
        </tr>
    )
}

export default OilItem
