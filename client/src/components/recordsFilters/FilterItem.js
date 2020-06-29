import React, { useContext } from 'react'

import { appContext } from '../../context/Provider'

function FilterItem({ filter, openModal, edit }) {

    const context = useContext(appContext)

    const editFilter = () => {
        context.dispatchFilter({ type: 'SET', value: filter })
        openModal()
    }
    
    return (
        <tr>
            <td>
                <p>{ filter.interfill }</p>
            </td>
            <td >
                { filter.OEM.map( OEM => (
                    <p key={OEM}>{OEM}</p>
                ) ) }
            </td>
            <td>
                { filter.ACD.map( ACD => (
                    <p key={ACD}>{ACD}</p>
                ) ) }
            </td>
            <td>
                { filter.Fram.map( Fram => (
                    <p key={Fram}>{Fram}</p>
                ) ) }
            </td>
            <td>
                { filter.Gonher.map( Gonher => (
                    <p key={Gonher}>{Gonher}</p>
                ) ) }
            </td>
            <td>
                { filter.Motorcraft.map( Motorcraft => (
                    <p key={Motorcraft}>{Motorcraft}</p>
                ) ) }
            </td>
            <td>
                { filter.Purolator.map( Purolator => (
                    <p key={Purolator}>{Purolator}</p>
                ) ) }
            </td>
            <td>
                { filter.Wix.map( Wix => (
                    <p key={Wix}>{Wix}</p>
                ) ) }
            </td>
            <td>
                { filter.Mann.map( Mann => (
                    <p key={Mann}>{Mann}</p>
                ) ) }
            </td>
            <td>
                { filter.MH.map( MH => (
                    <p key={MH}>{MH}</p>
                ) ) }
            </td>
            {edit && (
                <td>
                    <button className="bnt btn-primary" onClick={editFilter}>EDITAR</button>
                </td>
            )}
        </tr>
    )
}

export default FilterItem
