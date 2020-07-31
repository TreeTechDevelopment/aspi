import React from 'react'

import OilItem from './OilItem';

function OilProducts({ oils, openModal, removeOil }) {
    console.log(oils)

    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Viscosidad</th>
                    <th>Presentación</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                {oils.map(oil => (
                    <OilItem 
                        oil={oil}
                        key={ oil._id }
                        openModal={openModal}
                        updateOil={removeOil}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default OilProducts
