import React from 'react'

import SparkPlugItem from './SparkPlugItem'

function SparkPlugProducts({ sparkplugs, openModal }) {

    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>NGK</th>
                    <th>Champions</th>
                    <th>Bosh</th>
                    <th>Motorcraft</th> 
                    <th>ACDelco</th>
                </tr>
            </thead>
            <tbody>
                {sparkplugs.map(sparkplug => (
                    <SparkPlugItem 
                        sparkplug={sparkplug}
                        key={ sparkplug._id }
                        openModal={openModal}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default SparkPlugProducts
