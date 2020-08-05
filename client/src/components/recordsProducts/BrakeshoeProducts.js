import React from 'react'

import BrakeshoeItem from './BrakeshoeItem'

function BrakeshoeProducts({ brakeshoes, openModal }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>Wagner</th>
                </tr>
            </thead>
            <tbody>
                {brakeshoes.map(brakeshoe => (
                    <BrakeshoeItem 
                        brakeshoe={brakeshoe}
                        key={ brakeshoe._id }
                        openModal={openModal}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default BrakeshoeProducts
