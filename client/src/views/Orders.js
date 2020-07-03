import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import OrderSearcher from '../components/orders/OrderSearcher'
import Order from '../components/orders/Order'

function Orders() {

    const [order, setOrder] = useState({})
    const [foundOrder, setFoundOrder] = useState(false)
    const [found, setFound] = useState(false)
    const [services, setServices] = useState([])

    return (
        <>
            <Navbar />
            <OrderSearcher 
                setOrder={setOrder}
                setFoundOrder={setFoundOrder}
                setFound={setFound}
                setServices={setServices}
            />
            {found && !foundOrder && (
                <p>No se ha encontrado ninguna orden con es ID</p>
            )}
            {JSON.stringify(order) !== "{}" && (
                <Order 
                    order={order}
                    services={services}
                />
            )}
        </>
    )
}

export default Orders
