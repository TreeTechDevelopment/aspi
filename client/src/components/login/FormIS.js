import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { url, messageServerError, messageLoginError } from '../../../app.json'

function FormIS() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setReirect] = useState(false)

    const handleInputUserName = (e) => setUserName(e.target.value)

    const handleInputPassword = (e) => setPassword(e.target.value)

    const login = (e) => {        
        e.preventDefault()
        fetchLogin().then(({user, token}) => {
            setReirect(true)
        }).catch((e) => { 
            if(e.response.status === 401){ return alert(`${messageLoginError}`)  }
            alert(`${messageServerError}`) 
        })
    }

    const fetchLogin = async () => { 
        const res = await axios({
            url: `${url}/users/login`,
            method: 'POST',
            data: {
                username: userName,
                password
            },
            timeout: 5000
        })
        return res.data
    }

    if(redirect){ return <Redirect to="/"/> }

    return (
        <form 
            id="login"
            method="POST"
            action="/users/login"
            className="form"
        >
            <input 
                type="input"  
                placeholder="USUARIO" 
                name="username"
                value={userName}
                onChange={handleInputUserName}
                className="input"
            />
            <input 
                type="password" 
                placeholder="CONTRASEÑA"
                name="password"
                value={password}
                onChange={handleInputPassword}
                className="input"
            />
            <div className="form-line"></div>
            <button className="btn-aspi" type="submit">ENTRAR</button>
            <div className="btn-aspi-gray">
                <a href={`${url}/signup`}>CREAR CUENTA</a>
            </div>
        </form>
        
    )
}
export default FormIS