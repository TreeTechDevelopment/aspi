import React, { useState } from 'react'
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'

function OrderSearcher({ setOrder,  setFoundOrder, setFound, setServices}) {

    const [idOrder, setIdOrder] = useState('')
    const [loading, setLoading] = useState(false)

    const handleInput = e => setIdOrder(e.target.value.replace(/[^0-9]/g,''))

    const searchOrder = e => {
        setLoading(true)
        e.preventDefault()
        getOrder().then(({ order, services }) => {
            setLoading(false)
            setFound(true)
            if(order){
                setFoundOrder(true)
                setOrder(order)
                setServices(services)
            }else{ setFoundOrder(false) }
        }).catch(() => {            
            alert(`${messageServerError}`)
            setLoading(false)
        })
    }

    const getOrder = async () => {
        const res = await axios({
            url: `${url}/orders/find?id=${idOrder}`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    return (
        <form>
            <input
                placeholder="Ingresa el ID de la Orden"
                value={idOrder}
                onChange={handleInput}

            />
            <button className="btn btn-primary" onClick={searchOrder}>BUSCAR</button>
            {loading && (
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={50}
                    width={50}
                />
            )}
        </form>
    )
}

export default OrderSearcher
