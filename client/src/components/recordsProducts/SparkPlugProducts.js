import React from 'react'

import SparkPlugItem from './SparkPlugItem'

function SparkPlugProducts({ sparkplugs, openModal }) {

    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>NGK</th>
                    <th>CHAMPIONS</th>
                    <th>BOSH</th>
                    <th>MOTORCRAFT</th> 
                    <th>ACDELCO</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {sparkplugs.map((sparkplug, idx) => (
                    <SparkPlugItem 
                        sparkplug={sparkplug}
                        key={ sparkplug._id }
                        openModal={openModal}
                        idx={idx}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default SparkPlugProducts
