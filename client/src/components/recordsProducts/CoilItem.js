import React, { useContext, useState } from 'react'
import axios from'axios';

import { appContext } from '../../context/Provider'  
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal'

function CoilItem({ coil, openModal, updateCoil, idx, edit, sell, sellFunction }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editCoil = () => {        
        context.dispatchProduct({ type: 'SET', value: coil }) 
        openModal()
    }

    const handleDeleteBtn = e => {
        e.preventDefault()
        setOpenModalRemoveProduct(true)
    }

    const removeCoil = () => {
        deleteCoil().then(({ product }) => {
            updateCoil(product)
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        })
    }

    const deleteCoil = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'coil', id: coil._id }
        })

        return res.data
    }

    const addProductToList = () => sellFunction(coil)

    return (
        <tr>
            <Modal 
                openModal={openModalRemoveProduct}
                closeModal={closeModal}
                body="¿ESTÁ SEGURO QUE DESEA BORRAR ESTE PRODUCTO?"
                onSuccess={removeCoil}
                onCancel={closeModal}
            />
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { coil.Injecth.map( Injecth => (
                    <p key={Injecth + Math.random().toString()}>{Injecth}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { coil.Kem.map( Kem => (
                    <p key={Kem + Math.random().toString()}>{Kem}</p>
                ) ) }
            </td>
            {edit && (
                <>
                    <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                        <button className="btn-edit" onClick={editCoil}>
                            <img src={`${url}/images/edit.png`}/>
                        </button>
                    </td>
                    <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                        <button className="btn-edit" onClick={handleDeleteBtn}>
                            <img src={`${url}/images/delete.png`}/>
                        </button>
                    </td>
                </>
            )}
            {sell && (
                <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                    <button className="btn-edit" onClick={addProductToList}> + </button>
                </td>
            )}
        </tr>
    )
}

export default CoilItem
