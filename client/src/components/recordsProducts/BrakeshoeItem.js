import React, { useContext, useState } from 'react'
import axios from'axios';

import { appContext } from '../../context/Provider'  
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal'

function BrakeshoeItem({ brakeshoe, openModal, updateBrakeshoe, idx }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editFilter = () => {        
        context.dispatchProduct({ type: 'SET', value: brakeshoe }) 
        openModal()
    }

    const handleDeleteBtn = e => {
        e.preventDefault()
        setOpenModalRemoveProduct(true)
    }

    const removeBrakeshoe = () => {
        deleteBrakeshoe().then(({ product }) => {
            updateBrakeshoe(product)
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        })
    }

    const deleteBrakeshoe = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'brakeShoe', id: brakeshoe._id }
        })

        return res.data
    }
    
    return (
        <tr>
            <Modal 
                openModal={openModalRemoveProduct}
                closeModal={closeModal}
                body="¿ESTÁ SEGURO QUE DESEA BORRAR ESTE PRODUCTO?"
                onSuccess={removeBrakeshoe}
                onCancel={closeModal}
            />
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { brakeshoe.Wagner.map( Wagner => (
                    <p key={Wagner + Math.random().toString()}>{Wagner}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                <button className="btn-edit" onClick={editFilter}>
                    <img src={`${url}/images/edit.png`}/>
                </button>
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                <button className="btn-edit" onClick={handleDeleteBtn}>ELIMINAR</button>
            </td>
        </tr>
    )
}

export default BrakeshoeItem
