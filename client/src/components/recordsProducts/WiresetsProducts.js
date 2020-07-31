import React from 'react'

import WiresetItem from './WiresetItem'

function WiresetsProducts({ wiresets, openModal, removeWireset }) {
    return (
        <table className="table-products">
            <thead>
                <tr>
                    <th>NGK</th>
                    <th>Bosh</th>
                    <th>Lancer & Silverine</th> 
                    <th>Roadstar</th>
                </tr>
            </thead>
            <tbody>
                {wiresets.map(wireset => (
                    <WiresetItem 
                        wireset={wireset}
                        key={ wireset._id }
                        openModal={openModal}
                        updateWireset={removeWireset}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default WiresetsProducts
