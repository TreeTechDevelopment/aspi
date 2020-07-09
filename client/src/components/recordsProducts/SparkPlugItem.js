import React, { useContext } from 'react'

import { appContext } from '../../context/Provider'

function SparkPlugItem({ sparkplug, openModal }) {

    const context = useContext(appContext)

    const editSparkplug = () => {        
        context.dispatchProduct({ type: 'SET', value: sparkplug }) 
        openModal()
    }

    return (
        <tr>
            <td >
                { sparkplug.NGK.map( NGK => (
                    <p key={NGK}>{NGK}</p>
                ) ) }
            </td>
            <td>
                { sparkplug.Champions.map( Champions => (
                    <p key={Champions}>{Champions}</p>
                ) ) }
            </td>
            <td>
                { sparkplug.Bosh.map( Bosh => (
                    <p key={Bosh}>{Bosh}</p>
                ) ) }
            </td>
            <td>
                { sparkplug.Motorcraft.map( Motorcraft => (
                    <p key={Motorcraft}>{Motorcraft}</p>
                ) ) }
            </td>
            <td>
                { sparkplug.ACD.map( ACD => (
                    <p key={ACD}>{ACD}</p>
                ) ) }
            </td>
            <td>
                <button className="bnt btn-primary" onClick={editSparkplug}>EDITAR</button>
            </td>
        </tr>
    )
}

export default SparkPlugItem
