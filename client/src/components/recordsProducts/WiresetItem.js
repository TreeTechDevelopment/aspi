import React, { useContext, useState } from 'react'
import axios from'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal'

function WiresetItem({ wireset, openModal, updateWireset }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editSparkplug = () => {        
        context.dispatchProduct({ type: 'SET', value: wireset }) 
        openModal()
    }

    const removeWireset = () => {
        deleteWireset().then(({ product }) => {
            updateWireset(product)
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        })
    }

    const deleteWireset = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'wiresets', id: wireset._id }
        })

        return res.data
    }

    const handleDeleteBtn = e => {
        e.preventDefault()
        setOpenModalRemoveProduct(true)
    }

    return (
        <tr>
            <Modal 
                openModal={openModalRemoveProduct}
                closeModal={closeModal}
                body="¿ESTÁ SEGURO QUE DESEA BORRAR ESTE PRODUCTO?"
                onSuccess={removeWireset}
                onCancel={closeModal}
            />
            <td >
                { wireset.NGK.map( NGK => (
                    <p key={NGK + Math.random().toString()}>{NGK}</p>
                ) ) }
            </td>
            <td>
                { wireset.Bosh.map( Bosh => (
                    <p key={Bosh + Math.random().toString()}>{Bosh}</p>
                ) ) }
            </td>
            <td>
                { wireset.LS.map( LS => (
                    <p key={LS + Math.random().toString()}>{LS}</p>
                ) ) }
            </td>
            <td>
                { wireset.Roadstar.map( Roadstar => (
                    <p key={Roadstar + Math.random().toString()}>{Roadstar}</p>
                ) ) }
            </td>
            <td>
                <button className="bnt btn-primary" onClick={editSparkplug}>EDITAR</button>
            </td>
            <td>
                <button className="bnt btn-primary" onClick={handleDeleteBtn}>ELIMINAR</button>
            </td>
        </tr>
    )
}

export default WiresetItem
