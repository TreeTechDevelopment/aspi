import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner';

import { url, messageServerError, messageUnauthorized } from '../../../app.json'
import ServiceItem from './ServiceItem';

function Services() {

    const [services, setServices] = useState([]) 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices().then(({ services }) => {
            setServices(services)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
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
        <div className="table-container">
            {loading ? (
                <Loader
                    type="TailSpin" 
                    color="#feb200"
                    height={50}
                    width={50}
                />
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>SERVICIO</th>
                            <th>PRECIO</th>
                            <th>EDITAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map( (service, idx) => (
                            <ServiceItem 
                                key={service._id}
                                service={service}
                                updateTable={updateTable}
                                idx={idx}
                            />
                        ) )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Services
