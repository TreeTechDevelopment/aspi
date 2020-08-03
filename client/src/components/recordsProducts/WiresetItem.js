import React, { useContext, useState } from 'react'
import axios from'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal'

function WiresetItem({ wireset, openModal, updateWireset, idx }) {

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
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { wireset.NGK.map( NGK => (
                    <p key={NGK + Math.random().toString()}>{NGK}</p>
                ) ) }
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { wireset.Bosh.map( Bosh => (
                    <p key={Bosh + Math.random().toString()}>{Bosh}</p>
                ) ) }
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { wireset.LS.map( LS => (
                    <p key={LS + Math.random().toString()}>{LS}</p>
                ) ) }
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { wireset.Roadstar.map( Roadstar => (
                    <p key={Roadstar + Math.random().toString()}>{Roadstar}</p>
                ) ) }
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                <button className="btn-edit" onClick={editSparkplug}>
                    <img src={`${url}/images/edit.png`}/>
                </button>
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                <button className="btn-edit" onClick={handleDeleteBtn}>
                    <img src={`${url}/images/delete.png`}/>
                </button>
            </td>
        </tr>
    )
}

export default WiresetItem
