import React from 'react'

import SparkPlugItem from './SparkPlugItem'

function SparkPlugProducts({ sparkplugs, openModal, removeSparkplug }) {

    return (
        <table >
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
                        updateSparkplugs={removeSparkplug}
                        idx={idx}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default SparkPlugProducts
