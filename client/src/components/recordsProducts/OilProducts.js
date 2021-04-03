import React from 'react'

import OilItem from './OilItem';

function OilProducts({ oils, openModal, removeOil }) {

    return ( 
        <table className="table-products"> 
            <thead>
                <tr>
                    <th>MARCA</th>
                    <th>VISCOSIDAD</th>
                    <th>PRESENTACIÓN</th>
                    <th>TIPO</th>
                    <th>NOMBRE</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {oils.map((oil, idx) => (
                    <OilItem 
                        oil={oil}
                        key={ oil._id }
                        openModal={openModal}
                        updateOil={removeOil}
                        idx={idx}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default OilProducts
