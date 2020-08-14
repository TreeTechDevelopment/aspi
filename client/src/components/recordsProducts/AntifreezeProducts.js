import React from 'react'

import AntifreezeItem from './AntifreezeItem'

function AntifreezeProducts({ antifreezes, openModal, removeAntifreeze }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>MARCA</th>
                    <th>PRESENTACIÓN</th>
                    <th>TIPO</th>
                    <th>ESPECIFICACIONS</th>
                    <th>EDITAR</th> 
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody>
                {antifreezes.map((antifreeze, idx) => (
                    <AntifreezeItem 
                        antifreeze={antifreeze}
                        key={ antifreeze._id }
                        openModal={openModal}
                        idx={idx}
                        updateAntifreeze={removeAntifreeze}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default AntifreezeProducts
