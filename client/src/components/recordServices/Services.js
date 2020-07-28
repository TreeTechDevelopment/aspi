import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner';

import { url, messageServerError } from '../../../app.json'
import ServiceItem from './ServiceItem';

function Services() {

    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices().then(({ services }) => {
            setServices(services)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
            alert(`${messageServerError}`)
        })
    }, [])

    const fetchServices = async () => {
        const res = await axios({
            url: `${url}/services/all`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    const updateTable = newService => {
        let newServices = [...services]
        let idx = newServices.findIndex( service => service._id == newService._id )
        newServices[idx] = newService
        setServices(newServices)
    }

    return (
        <>
            {loading ? (
                <Loader
                    type="Rings"
                    color="#00BFFF"
                    height={50}
                    width={50}
                />
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>Servicio</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map( service => (
                            <ServiceItem 
                                key={service._id}
                                service={service}
                                updateTable={updateTable}
                            />
                        ) )}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Services
