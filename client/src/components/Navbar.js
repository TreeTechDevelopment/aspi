import React from 'react';

import { url } from '../../app.json'

function Navbar({ isHome }) {
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
                    <a href={`${url}/orders`}>ORDENES</a>
                </li>
                <li>                    
                    <a href={`${url}/service-order`}>ORDEN DE SERVICO</a>
                </li>
                <li>                    
                    <a href={`${url}/cross`}>REFERENCIAS CRUZADAS</a>
                </li>
                <li>                    
                    <a href={`${url}/records`}>REGISTROS</a>
                </li>
                <li>                    
                    <a href={`${url}/iniciar-sesion`}>INICIAR SESIÓN</a>        
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
