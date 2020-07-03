import React, { useState } from 'react';
import axios from 'axios';

import { url, messageServerError } from '../../../app.json';

function ServiceItem({ service, updateTable }) {

    const [editing, setEditing] = useState(false)
    const [price, setPrice] = useState(service.price.toString())

    const editService = (e) => {
        e.preventDefault()
        if(editing){
            updateService({ id: service._id, price }).then(({ service }) => {
                setEditing(false)
                updateTable(service)
            }).catch((e) => {                
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
            <td>{service.label}</td>
            <td>
                {editing ? (
                    <input
                        value={price}
                        onChange={handleInput}
                    />
                ): service.price}
            </td>
            <td>
                <button className="btn btn-primary" onClick={editService}>{ editing ? 'GUARDAR' : 'EDITAR' }</button>
            </td>
            {editing && (
                 <td>
                    <button className="btn btn-primary" onClick={cancelEditing}>CANCELAR</button>
                </td>
            )}
        </tr>
    )
}

export default ServiceItem
