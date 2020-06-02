import React, { useState } from 'react'
import axios from 'axios';

import { url, messageServerError } from '../../../app.json'

function FormIS() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleInputUserName = (e) => setUserName(e.target.value)

    const handleInputPassword = (e) => setPassword(e.target.value)

    const login = (e) => {
        e.preventDefault()
        fetchLogin().then(({user, token}) => {
            setToken(token)
            setUser(user)
        }).catch(() => { alert(`messageServerError`) })
    }

    const setToken = token => window.localStorage.setItem('@token', token )

    const setUser = user => window.localStorage.setItem('@user', user )

    const fetchLogin = async () => {
        const res = await axios({
            url: `${url}/users`,
            method: 'POST',
            data: {
                userName,
                password
            },
            timeout: 5000
        })
        return res.data
    }

    return (
        <form id="login-form" onSubmit={login}>
            <input 
                type="input" 
                placeholder="Usuario" 
                value={userName}
                onChange={handleInputUserName}
            />
            <input 
                type="password" 
                placeholder="Contraseña"
                value={password}
                onChange={handleInputPassword}
            />
            <button className="btn btn-primary">Entrar</button>
        </form>
        
    )
}
export default FormIS