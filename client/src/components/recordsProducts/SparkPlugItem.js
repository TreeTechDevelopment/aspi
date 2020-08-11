import React, { useContext, useState } from 'react'
import axios from'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import Modal from '../Modal';

function SparkPlugItem({ sparkplug, openModal, updateSparkplugs, idx, edit, sell, sellFunction }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editSparkplug = () => {        
        context.dispatchProduct({ type: 'SET', value: sparkplug }) 
        openModal()
    }

    const removeSparkplug = () => {
        deleteSparkplug().then(({ product }) => {
            updateSparkplugs(product)
        }).catch((e) => {
            console.log(e)
            alert(`${messageServerError}`)
        })
    }

    const deleteSparkplug = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'sparkPlug', id: sparkplug._id }
        })

        return res.data
    }

    const handleDeleteBtn = e => {
        e.preventDefault()
        setOpenModalRemoveProduct(true)
    }

    const addProductToList = () => sellFunction(sparkplug)

    return (
        <tr>
            <Modal 
                openModal={openModalRemoveProduct}
                closeModal={closeModal}
                body="¿ESTÁ SEGURO QUE DESEA BORRAR ESTE PRODUCTO?"
                onSuccess={removeSparkplug}
                onCancel={closeModal}
            />
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { sparkplug.NGK.map( NGK => (
                    <p key={NGK + Math.random().toString()}>{NGK}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { sparkplug.Champions.map( Champions => (
                    <p key={Champions + Math.random().toString()}>{Champions}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { sparkplug.Bosh.map( Bosh => (
                    <p key={Bosh + Math.random().toString()}>{Bosh}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { sparkplug.Motorcraft.map( Motorcraft => (
                    <p key={Motorcraft + Math.random().toString()}>{Motorcraft}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { sparkplug.ACD.map( ACD => (
                    <p key={ACD + Math.random().toString()}>{ACD}</p>
                ) ) }
            </td>
            {edit && (
                <>
                    <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                        <button className="btn-edit" onClick={editSparkplug}>
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
                    <button className="btn-edit" onClick={addProductToList}>+</button>
                </td>
            )}
        </tr>
    )
}

export default SparkPlugItem
