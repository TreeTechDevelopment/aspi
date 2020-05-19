import React, { useState } from 'react'

const Form = () => {

    const [year, setYear] = useState('a')
    let options = ['a', 'b', 'c', 'd']

    const handleSelect = (e) => { setYear(e.target.value) }

    return (
        <>
            <h1>Orden de servicio</h1>
            <form id="form-service-order">
                <label>Año</label>
                <div className="input-container-form-">
                    <input 
                        type="date"
                        name="armadora"
                        placeholder="Armadora"
                    />
                </div> 
                <label>Armadora</label>
                <input 
                    type="text"
                    name="armadora"
                    placeholder="Armadora"
                />
                <label>Modelo</label>
                <input 
                    type="text"
                    name="modelo"
                    placeholder="Modelo"
                />
                <label>Cilindraje</label>
                <input 
                    type="text"
                    name="cilindraje"
                    placeholder="cilindraje"
                />
                <label>Motor</label>
                <input 
                    type="text"
                    name="Motor"
                    placeholder="motor"
                />
            </form>
        </>
     );
}
 
export default Form;

