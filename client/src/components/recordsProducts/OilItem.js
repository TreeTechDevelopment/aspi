import React, { useContext, useState } from 'react'
import axios from 'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError, messageUnauthorized } from '../../../app.json'
import Modal from '../Modal';
 
function OilItem({ oil, openModal, updateOil, idx }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editOil = () => {        
        context.dispatchProduct({ type: 'SET', value: oil }) 
        openModal()
    }

    const removeOil = () => {
        deleteOil().then(({ product }) => {
            updateOil(product)
        }).catch((e) => {
            if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
            alert(`${messageServerError}`)
        }) 
    }

    const deleteOil = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'oil', id: oil._id }
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
                onSuccess={removeOil}
                onCancel={closeModal}
            />
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { oil.make}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { oil.viscosity}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { oil.presentation}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { oil.oilType}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                { oil.name}
            </td>
            <td className={ idx % 2 === 0 ? 'odd' : 'even' }>
                <button className="btn-edit" onClick={editOil}>
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

export default OilItem
