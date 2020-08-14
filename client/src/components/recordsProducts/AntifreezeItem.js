import React, { useContext, useState } from 'react';
import axios from'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal';

function AntifreezeItem({ antifreeze, openModal, updateAntifreeze, idx }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editAntifreeze = () => {        
        context.dispatchProduct({ type: 'SET', value: antifreeze }) 
        openModal()
    }

    const removeAntifreeze = () => {
        deleteAntifreeze().then(({ product }) => {
            updateAntifreeze(product)
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        }) 
    }

    const deleteAntifreeze = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'antifreeze', id: antifreeze._id }
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
                onSuccess={removeAntifreeze}
                onCancel={closeModal}
            />
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { antifreeze.antifreezeMake}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { antifreeze.antifreezePresentation}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { antifreeze.antifreezeType}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { antifreeze.specification}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                <button className="btn-edit" onClick={editAntifreeze}>
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

export default AntifreezeItem
