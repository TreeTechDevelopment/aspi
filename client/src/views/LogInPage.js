import React from 'react';

import FormIS from '../components/login/FormIS';
import { url } from '../../app.json';


function LogIn() {
    return (
        <div id="login-container" className="form-container"> 
            <img src={`${url}/images/logo-white.png`} id="login-logo"/>
            <FormIS />
        </div>
    )
}
export default LogIn 