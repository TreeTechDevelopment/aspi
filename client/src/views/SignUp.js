import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom' 

import Navbar from '../components/Navbar';
import { url, messageServerError } from '../../app.json'

function SignUp() {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const handleInputUser = e => setUser(e.target.value)

    const handleInputPassword = e => setPassword(e.target.value)

    const saveUser = () => {
        createUser({ user, password }).then(() => {
            setRedirect(true)
        }).catch(() => {
            alert(`${messageServerError}`)
        })
    }

    const createUser = async (data) => {
        const res = await axios({
            url: `${url}/signup`,
            method: 'POST',
            timeout: 5000,
            data
        })

        return res.data
    }

    if(redirect){ return <Redirect to="/"/> }

    return (
        <>
            <Navbar />
            <form method="POST" action="/users/signup">
                <label>Usuario</label>
                <input 
                    value={user}
                    onChange={handleInputUser}
                    name="username"
                />
                <label>Contraseña</label>
                <input 
                    value={password}
                    onChange={handleInputPassword}
                    name="password"
                    type="password"
                />
                <button type="submit" className="btn btn-primary">GUARDAR</button>
            </form>
        </>
    )
}

export default SignUp
