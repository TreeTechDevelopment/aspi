import React from 'react'
import { Link } from "react-router-dom";

import { url } from '../../app.json'

function Navbar() {
    return (
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/" className="links">
                        <img src={`${url}/images/logo.jpg`} id="imgLogo"/>
                    </Link>
                </li>
                <li>
                    <Link to="/service-order" className="links">Orden de Servicio</Link> 
                </li>
                <li>
                    <Link to="/cross">Referencias Cruzadas</Link>
                </li>
                <li>
                    <Link to="/records">Registros</Link>
                </li>
                <li>
                    <Link to="/iniciar-sesion">Iniciar Sesión</Link>         
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
