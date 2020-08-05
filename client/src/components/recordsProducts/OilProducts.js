import React from 'react'

import OilItem from './OilItem';

function OilProducts({ oils, openModal }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Viscosidad</th>
                    <th>Presentación</th>
                    <th>Litros/Galones</th>
                </tr>
            </thead>
            <tbody>
                {oils.map(oil => (
                    <OilItem 
                        oil={oil}
                        key={ oil._id }
                        openModal={openModal}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default OilProducts
