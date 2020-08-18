import React, { useState } from 'react';
import axios from 'axios';

import { url, messageServerError, messageUnauthorized } from '../../../app.json';

function ServiceItem({ service, updateTable, idx }) {
 
    const [editing, setEditing] = useState(false)
    const [price, setPrice] = useState(service.price.toString())

    const editService = (e) => {
        e.preventDefault()
        if(editing){
            if(price === ""){ return alert('El campo precio es necesario') }
            updateService({ id: service._id, price }).then(({ service }) => {
                setEditing(false)
                updateTable(service)
            }).catch((e) => {      
                if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  }           
                alert(`${messageServerError}`)
            })
        }else{ setEditing(true) }
    }

    const cancelEditing = e => {
        e.preventDefault()
        setEditing(false) 
    }

    const handleInput = e => setPrice(e.target.value.replace(/[^0-9]/, ''))

    const updateService = async (data) => {
        const res = await axios({
            url: `${url}/services`,
            data,
            timeout: 5000,
            method: 'PUT'
        })

        return res.data
    }

    return (
        <tr>
            <td className={ idx % 2 === 0 ? 'odd'  :'even' }>{service.label.toUpperCase()}</td>
            <td className={ idx % 2 === 0 ? 'odd'  :'even' }>
                {editing ? (
                    <input
                        value={price}
                        onChange={handleInput}
                        className="input"
                    />
                ): service.price}
            </td>
            <td className={`${editing ? '' : ''} ${ idx % 2 === 0 ? 'odd'  :'even' }`}>
                <button className={`btn-aspi btn-edit-service ${ editing && 'margin-bottom' }`} onClick={editService}>{ editing ? 'GUARDAR' : 'EDITAR' }</button>
                {editing && (
                    <button className="btn-aspi btn-edit-service" onClick={cancelEditing}>CANCELAR</button>
                )}
            </td>
           {/*  {editing && (
                 <td className={ idx % 2 === 0 ? 'odd'  :'even' }>
                    <button className="btn-aspi" onClick={cancelEditing}>CANCELAR</button>
                </td>
            )} */}
        </tr>
    )
}

export default ServiceItem
