import React from 'react'

import FilterItem from './FilterItem';

function FilterProducts({ filters, openModal, typeFilter }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>Interfil</th>
                    <th>OEM</th>
                    <th>ACDelco</th>
                    <th>Fram</th>
                    <th>Gonher</th>
                    <th>Motorcraft</th> 
                    <th>Purolator</th>
                    <th>Wix</th>
                    <th>Mann</th>
                </tr>
            </thead>
            <tbody>
                {filters.map(filter => (
                    <FilterItem 
                        filter={filter}
                        key={ filter._id }
                        openModal={openModal}
                        edit={true}
                        typeFilter={typeFilter.value}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default FilterProducts
