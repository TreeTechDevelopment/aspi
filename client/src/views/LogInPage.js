import React from 'react';

import FormIS from '../components/login/FormIS';
import Navbar from '../components/Navbar';
import { url } from '../../app.json';


function LogIn() {
    return (
        <>
            <Navbar />
            <FormIS />
            <a href={`${url}/signup`} className="btn btn-primary">AGREGAR USUARIO</a>
        </>
    )
}
export default LogIn