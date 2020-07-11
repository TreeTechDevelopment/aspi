import React, { useContext } from 'react'

import { appContext } from '../../context/Provider'  

let a

function BrakeshoeItem({ brakeshoe, openModal }) {

    const context = useContext(appContext)

    const editFilter = () => {        
        context.dispatchProduct({ type: 'SET', value: brakeshoe }) 
        openModal()
    }
    
    return (
        <tr>
            <td >
                { brakeshoe.Wagner.map( Wagner => (
                    <p key={Wagner}>{Wagner}</p>
                ) ) }
            </td>
            
            <td>
                <button className="bnt btn-primary" onClick={editFilter}>EDITAR</button>
            </td>
        </tr>
    )
}

export default BrakeshoeItem
