import React, { useContext, useState } from 'react'

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal';

function OilItem({ oil, openModal, updateOil }) {

    console.log(oil)

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
            console.log(e)
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
            <td >
                { oil.make}
            </td>
            <td>
                { oil.viscosity}
            </td>
            <td>
                { oil.presentation}
            </td>
            <td>
                { oil.oilType}
            </td>
            <td>
                <button className="bnt btn-primary" onClick={editOil}>EDITAR</button>
            </td>
            <td>
                <button className="bnt btn-primary" onClick={handleDeleteBtn}>ELIMINAR</button>
            </td>
        </tr>
    )
}

export default OilItem
