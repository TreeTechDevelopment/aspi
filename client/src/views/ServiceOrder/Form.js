import React, { Fragment } from 'react'


const Form = () => {
    return (
        <Fragment>
            <h1>Orden de servicio</h1>
            <form>
                <label>Año</label>
                <input 
                    type="text"
                    name="año"
                    placeholder="Año"
                />
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
        </Fragment>
     );
}
 
export default Form;

