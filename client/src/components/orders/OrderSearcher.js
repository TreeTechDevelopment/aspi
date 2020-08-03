import React, { useState } from 'react'
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'

function OrderSearcher({ setOrder,  setFoundOrder, setFound, order }) {

    const [idOrder, setIdOrder] = useState('')
    const [loading, setLoading] = useState(false)

    const handleInput = e => setIdOrder(e.target.value.replace(/[^0-9]/g,''))

    const searchOrder = e => {
        e.preventDefault()
        if(order){ return setOrder({}) }
        setLoading(true)
        getOrder().then(({ order }) => {
            setLoading(false)
            setFound(true)
            if(order){
                setFoundOrder(true)
                setOrder(order)
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
            timeout: 20000
        })

        return res.data 
    }

    return (
        <form className={`form ${order ? 'order-searcher height-content' : ''}`}>
            {!order && (
                <>
                     <input
                        placeholder="INGRESA EL ID DE LA ORDEN"
                        value={idOrder}
                        onChange={handleInput}
                        className="input input-center"
                    />
                    <div className="form-line"></div>
                </>
            )}
            <button className="btn-aspi" onClick={searchOrder}>BUSCAR</button>
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
