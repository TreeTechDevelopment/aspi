import React from 'react'

import SparkPlugItem from './SparkPlugItem'

function SparkPlugProducts({ sparkplugs, openModal, edit, sell, sellFunction }) {

    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>NGK</th>
                    <th>CHAMPIONS</th>
                    <th>BOSH</th>
                    <th>MOTORCRAFT</th> 
                    <th>ACDELCO</th>
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
                {sparkplugs.map((sparkplug, idx) => (
                    <SparkPlugItem 
                        sparkplug={sparkplug}
                        key={ sparkplug._id }
                        openModal={openModal}
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

export default SparkPlugProducts
