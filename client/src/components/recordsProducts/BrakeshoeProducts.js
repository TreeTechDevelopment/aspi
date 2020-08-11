import React from 'react'

import BrakeshoeItem from './BrakeshoeItem'

function BrakeshoeProducts({ brakeshoes, openModal, edit, sell, sellFunction }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>WAGNER</th>
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
                {brakeshoes.map((brakeshoe, idx) => (
                    <BrakeshoeItem 
                        brakeshoe={brakeshoe}
                        key={ brakeshoe._id }
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

export default BrakeshoeProducts
