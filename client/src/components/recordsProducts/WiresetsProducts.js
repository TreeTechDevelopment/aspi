import React from 'react'

import WiresetItem from './WiresetItem'

function WiresetsProducts({ wiresets, openModal, removeWireset, edit, sell, sellFunction }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>NGK</th>
                    <th>BOSH</th>
                    <th>LANCER & SILVERINE</th> 
                    <th>ROADSTAR</th>
                    {edit && (
                        <>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                        </>
                    )}
                    {sell && <th>AGREGAR</th>}
                </tr>
            </thead>
            <tbody>
                {wiresets.map((wireset, idx) => (
                    <WiresetItem 
                        wireset={wireset}
                        key={ wireset._id }
                        openModal={openModal}
                        updateWireset={removeWireset}
                        idx={idx}
                        edit={edit}
                        sell={sell}
                        sellFunction={sellFunction}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default WiresetsProducts
