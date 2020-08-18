import React, { useContext, useState } from 'react';
import axios from'axios';

import { appContext } from '../../context/Provider'
import { url, messageServerError, messageUnauthorized } from '../../../app.json'
import Modal from '../Modal';

function FilterItem({ filter, openModal, edit, updateFilters, idx, sell, sellFunction }) {

    const context = useContext(appContext)

    const [openModalRemoveProduct, setOpenModalRemoveProduct] = useState(false)

    const closeModal = () => setOpenModalRemoveProduct(false)

    const editFilter = () => {        
        context.dispatchProduct({ type: 'SET', value: filter }) 
        openModal()
    }

    const handleDeleteBtn = e => {
        e.preventDefault()
        setOpenModalRemoveProduct(true)
    }

    const removeFilter = () => {
        deleteFilter().then(({ product }) => {
            updateFilters(product)
        }).catch((e) => {
            if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
            alert(`${messageServerError}`)
        })
    }

    const deleteFilter = async () => {
        const res = await axios({
            method: 'DELETE',
            url: `${url}/products`,
            timeout: 5000,
            data: { type: 'filter', id: filter._id }
        })

        return res.data
    }

    const addProductToList = () => sellFunction(filter)
    
    return (
        <tr>
            <Modal 
                openModal={openModalRemoveProduct}
                closeModal={closeModal}
                body="¿ESTÁ SEGURO QUE DESEA BORRAR ESTE PRODUCTO?"
                onSuccess={removeFilter}
                onCancel={closeModal}
            />
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                <p>{ filter.interfil }</p>
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.OEM.map( OEM => (
                    <p key={OEM + Math.random().toString()}>{OEM}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.ACD.map( ACD => (
                    <p key={ACD + Math.random().toString()}>{ACD}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Fram.map( Fram => (
                    <p key={Fram + Math.random().toString()}>{Fram}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Gonher.map( Gonher => (
                    <p key={Gonher + Math.random().toString()}>{Gonher}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Motorcraft.map( Motorcraft => (
                    <p key={Motorcraft + Math.random().toString()}>{Motorcraft}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Purolator.map( Purolator => (
                    <p key={Purolator + Math.random().toString()}>{Purolator}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Wix.map( Wix => (
                    <p key={Wix + Math.random().toString()}>{Wix}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Mann.map( Mann => (
                    <p key={Mann + Math.random().toString()}>{Mann}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Sky?.map( Sky => (
                    <p key={Sky + Math.random().toString()}>{Sky}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Seineca?.map( Seineca => (
                    <p key={Seineca + Math.random().toString()}>{Seineca}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Walmi?.map( Walmi => (
                    <p key={Walmi + Math.random().toString()}>{Walmi}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Joe?.map( Joe => (
                    <p key={Joe + Math.random().toString()}>{Joe}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.Roadstar?.map( Roadstar => (
                    <p key={Roadstar + Math.random().toString()}>{Roadstar}</p>
                ) ) }
            </td>
            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                { filter.ECA?.map( ECA => (
                    <p key={ECA + Math.random().toString()}>{ECA}</p>
                ) ) }
            </td>
            {edit && (
                <>
                <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                    <button className="btn-edit" onClick={editFilter}>
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
                    <button className="btn-edit" onClick={addProductToList}>
                        +
                    </button>
                </td>
            )}
        </tr>
    )
}

export default FilterItem
