import React from 'react'

import FilterItem from './FilterItem';

function FilterProducts({ filters, openModal, typeFilter, removeFilter }) {
    return (
        <table className="table-filters">
            <thead>
                <tr>
                    <th>INTERFIL</th>
                    <th>OEM</th>
                    <th>ACDELCO</th>
                    <th>FRAM</th>
                    <th>GONHER</th>
                    <th>MOTORCARFT</th> 
                    <th>PUROLATOR</th>
                    <th>WIX</th>
                    <th>MANN</th>
                    <th>SKY</th>
                    <th>SEINECA</th>
                    <th>WALMI</th>
                    <th>JOE</th>
                    <th>ROADSTAR</th>
                    <th>ECA</th>
                    <th>EDITAR</th>
                    <th>ELIMINAR</th>
                </tr>
            </thead>
            <tbody> 
                {filters.map((filter, idx) => (
                    <FilterItem 
                        filter={filter}
                        key={ filter._id }
                        openModal={openModal}
                        edit={true}
                        typeFilter={typeFilter.value}
                        updateFilters={removeFilter}
                        idx={idx}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default FilterProducts
