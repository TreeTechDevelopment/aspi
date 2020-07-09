import React, { useContext } from 'react'

function WiresetItem({ wireset }) {

    const context = useContext(appContext)

    const editSparkplug = () => {        
        context.dispatchProduct({ type: 'SET', value: wireset }) 
        openModal()
    }

    return (
        <tr>
            <td >
                { wireset.NGK.map( NGK => (
                    <p key={NGK}>{NGK}</p>
                ) ) }
            </td>
            <td>
                { wireset.Bosh.map( Bosh => (
                    <p key={Bosh}>{Bosh}</p>
                ) ) }
            </td>
            <td>
                { wireset.LS.map( LS => (
                    <p key={LS}>{LS}</p>
                ) ) }
            </td>
            <td>
                { wireset.Roadstar.map( Roadstar => (
                    <p key={Roadstar}>{Roadstar}</p>
                ) ) }
            </td>
            <td>
                <button className="bnt btn-primary" onClick={editSparkplug}>EDITAR</button>
            </td>
        </tr>
    )
}

export default WiresetItem
