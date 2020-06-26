import React from 'react'

function CarItem({ car }) {

    return (
        <tr>
            <td>{ car.make.name }</td>
            <td>{ car.model.name }</td>
            <td>{ car.year.length === 1 ? car.year[0] : `${car.year[0]}-${car.year[ car.year.length - 1 ]}`}</td>
            <td>{ car.cylinder}</td>
            <td>{ car.motor}</td>
        </tr>
    )
}

export default CarItem
