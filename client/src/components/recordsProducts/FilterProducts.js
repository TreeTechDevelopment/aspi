import React from 'react'

import FilterItem from './FilterItem';

function FilterProducts({ filters, openModal, typeFilter, edit, sell, sellFunction }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>INTERFILL</th>
                    <th>OEM</th>
                    <th>ACDELCO</th>
                    <th>FRAM</th>
                    <th>GONHER</th>
                    <th>MOTORCRAFT</th> 
                    <th>PUROLATOR</th>
                    <th>WIX</th>
                    <th>MANN</th>
                    <th>SKY</th>
                    <th>SEINECA</th>
                    <th>WALMI</th>
                    <th>JOE</th>
                    <th>ROADSTAR</th>
                    <th>ECA</th>
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
                {filters.map((filter, idx) => (
                    <FilterItem 
                        filter={filter}
                        key={ filter._id }
                        openModal={openModal}
                        edit={edit}
                        typeFilter={typeFilter?.value}
                        idx={idx}
                        sell={sell}
                        sellFunction={sellFunction}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default FilterProducts
