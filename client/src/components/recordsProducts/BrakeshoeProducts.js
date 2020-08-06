import React from 'react'

import BrakeshoeItem from './BrakeshoeItem'

function BrakeshoeProducts({ brakeshoes, openModal }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>WAGNER</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {brakeshoes.map((brakeshoe, idx) => (
                    <BrakeshoeItem 
                        brakeshoe={brakeshoe}
                        key={ brakeshoe._id }
                        openModal={openModal}
                        idx={idx}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default BrakeshoeProducts
