import React, { useEffect, useState } from 'react';
import axios from 'axios'

import { url } from '../../app.json'

function Navbar({ isHome }) {

    const [isLogged, setIsLogged] = useState('INICIAR SESIÓN')
    const [role, setRole] = useState('')

    useEffect(() => {
        if(window.location.pathname === "/"){
            fetchIsLogged().then(({ isLogged, role }) => {
                if(isLogged){ 
                    setIsLogged('CERRAR SESIÓN') 
                    if(role){ setRole(role) }
                }
            }).catch(() => {})
        }
    }, [])

    const fetchIsLogged = async () => {
        const res = await axios({
            url: `${url}/islogged`,
            method: 'GET',
            timeout: 5000
        })

        return res.data
    }

    return (
        <nav className={isHome ? 'navHome' : 'navDefault'}>
            <ul className="navbar">
                {!isHome && (
                    <li>
                        <a href={`${url}/`} id="a-logo">
                            <img src={`${url}/images/logo.png`} id="imgLogo"/> 
                        </a>
                    </li>
                )}
                <li>                    
                    <a href={`${url}/search`}>BUSCAR</a>
                </li>
                <li>                    
                    <a href={`${url}/services`}>SERVICIOS</a>
                </li>
                <li>                    
                    <a href={`${url}/cross`}>REFERENCIAS CRUZADAS</a>
                </li>
                <li>                    
                    <a href={`${url}/records`}>REGISTROS</a>
                </li>
                {role === "ADMIN" && (
                    <li>                    
                        <a href={`${url}/signup`}>USUARIOS</a>
                    </li>
                )}
                <li>                    
                    <a href={window.location.pathname === "/" ?( isLogged === "INICIAR SESIÓN" ? `${url}/iniciar-sesion` : `${url}/logout` ) : `${url}/logout`}>{window.location.pathname === "/" ? isLogged : 'CERRAR SESIÓN'}</a>        
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
