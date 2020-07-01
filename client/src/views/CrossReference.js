import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { url } from '../../app.json';
import FormEq from '../components/crossReference/FormEq';
import Navbar from '../components/Navbar';

function CrossR() {

    /* axios.defaults.withCredentials = true;

    const [redirect, setRedirect] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        fetchAuthorization().then(({ authenticated }) => {
            if(authenticated){ setIsAuthenticated(true) }
            else{ setRedirect(true) }
        }).catch(() => {
            setRedirect(true)
        })
    }, [])

    const fetchAuthorization = async () => {
        const res = await axios({
            url: `${url}/users/authorization`,
            method: 'GET',
            timeout: 5000,
            withCredentials: true,
        })

        return res.data
    }

    if(redirect){ return <Redirect to="/" /> } */

    return (
        <>
            <Navbar />
            {/* {isAuthenticated && (
                <FormEq />
            )} */}
            <FormEq />
        </>
    )
}

export default CrossR
