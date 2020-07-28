import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import OrderSearcher from '../components/orders/OrderSearcher'
import Form from '../components/serviceOrder/Form'
import Service from '../components/serviceOrder/Service'

function Orders() {

    const [order, setOrder] = useState({})
    const [foundOrder, setFoundOrder] = useState(false)
    const [found, setFound] = useState(false)

    return (
        <div className={`bg-white ${JSON.stringify(order) !== "{}" ? ' direction-row justify-content-start' : ''}`}>
            <Navbar />
            <OrderSearcher 
                setOrder={setOrder}
                setFoundOrder={setFoundOrder}
                setFound={setFound}
                order={JSON.stringify(order) !== "{}"}
            />
            {found && !foundOrder && (
                <p className="label-dont-found">No se ha encontrado ninguna orden con ese ID</p>
            )}
            {JSON.stringify(order) !== "{}" && (
                <>
                    <div className="third-window direction-column">
                        <Form order={order}/>
                    </div>
                    <div className="line-separator"></div> 
                    <Service 
                        order={order}
                    />
                </>
            )}
        </div>
    )
}

export default Orders
