import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import OrderSearcher from '../components/orders/OrderSearcher'
import Order from '../components/orders/Order'

function Orders() {

    const [order, setOrder] = useState({})
    const [foundOrder, setFoundOrder] = useState(false)
    const [found, setFound] = useState(false)
    const [services, setServices] = useState([])
    const [sparkplugs, setSparkplugs] = useState([])
    const [wiresets, setWiresets] = useState([])
    const [brakeshoes, setBrakeshoes] = useState([])
    const [filters, setFilters] = useState([])

    return (
        <div className="bg-white">
            <Navbar />
            <OrderSearcher 
                setOrder={setOrder}
                setFoundOrder={setFoundOrder}
                setFound={setFound}
                setServices={setServices}
                setSparkplugs={setSparkplugs}
                setWiresets={setWiresets}
                setBrakeshoes={setBrakeshoes}
                setFilters={setFilters}
            />
            {found && !foundOrder && (
                <p>No se ha encontrado ninguna orden con es ID</p>
            )}
            {JSON.stringify(order) !== "{}" && (
                <Order 
                    order={order}
                    services={services}
                    sparkplugs={sparkplugs}
                    wiresets={wiresets}
                    brakeshoes={brakeshoes}
                    filters={filters}
                />
            )}
        </div>
    )
}

export default Orders
