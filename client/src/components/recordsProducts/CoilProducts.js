import React from 'react'

import CoilItem from './CoilItem'

function CoilProducts({ coils, openModal, edit, sell, sellFunction, removeCoil }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>INJECTH</th>
                    <th>KEM</th>
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
                {coils.map((coil, idx) => (
                    <CoilItem 
                        coil={coil}
                        key={ coil._id }
                        openModal={openModal}
                        idx={idx}
                        edit={edit}
                        sell={sell}
                        sellFunction={sellFunction}
                        updateCoil={removeCoil}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default CoilProducts
