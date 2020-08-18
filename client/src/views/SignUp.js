import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom' 

import { url } from '../../app.json'

function SignUp() {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleInputUser = e => setUser(e.target.value)

    const handleInputPassword = e => setPassword(e.target.value)

    return (
        <div id="login-container" className="form-container">
            <img src={`${url}/images/logo-white.png`} id="login-logo"/>
            <form method="POST" action="/users/signup" className="form" id="login">
                <input 
                    value={user}
                    onChange={handleInputUser}
                    name="username"
                    className="input"
                    placeholder="USUARIO"
                />
                <input 
                    value={password}
                    onChange={handleInputPassword}
                    name="password"
                    type="password"
                    className="input"
                    placeholder="CONTRASEÑA"
                />
                <div className="form-line"></div>
                <button type="submit" className="btn-aspi">GUARDAR</button>
            </form>
        </div>
    )
}

export default SignUp
