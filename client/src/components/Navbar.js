import React from 'react'
import { Link } from "react-router-dom";

import logo from '../images/logo.jpg'

function Navbar() {
    return (
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/" className="links">
                        <img src={logo} id="imgLogo"/>
                    </Link>
                </li>
                <li>
                    <Link to="/orden-servicio">Orden de Servicio</Link> 
                </li>
                <li>
                    <Link to="/equivalencias">Equivalencias</Link>
                </li>
                <li>
                    <Link to="/iniciar-sesion">Iniciar Sesión</Link>         
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
