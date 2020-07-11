import React from 'react'
import Navbar from '../components/Navbar';

import { url } from '../../app.json'

function Home() {
    return (
        <div id="home">
            <div id="home-label">
                <p>Tornillos y</p>
                <p>lubricantes</p>
            </div>
            <div id="logo-container">
                <img src={`${url}/images/logo-white.png`} id="logo"/>                
            </div>
            <Navbar isHome={true}/>
        </div>
    )
}

export default Home
