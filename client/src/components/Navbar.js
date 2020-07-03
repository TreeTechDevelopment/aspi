import React from 'react';

import { url } from '../../app.json'

function Navbar() {
    return (
        <nav>
            <ul className="navbar">
                <li>
                    <a href={`${url}/`}>
                        <img src={`${url}/images/logo.jpg`} id="imgLogo"/>
                    </a>
                </li>
                <li>                    
                    <a href={`${url}/orders`}>Ordenes</a>
                </li>
                <li>                    
                    <a href={`${url}/service-order`}>Orden de Servicio</a>
                </li>
                <li>                    
                    <a href={`${url}/cross`}>Referencias Cruzadas</a>
                </li>
                <li>                    
                    <a href={`${url}/records`}>Registros</a>
                </li>
                <li>                    
                    <a href={`${url}/iniciar-sesion`}>Iniciar Sesión</a>        
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
