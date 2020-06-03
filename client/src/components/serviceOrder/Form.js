import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = () => {


    return (
   
        <>
             <h3>Datos del vehiculo</h3>
             
             <form id="form-service-order">
                <label>Año</label>
                <div className="input-container-form-">
                    <input 
                        type="text"
                        name="ano"
                        placeholder="Armadora"
                    />
                </div>
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
                <button
                type="submit"
                className="fun"
                ></button>
            </form>
        </>
     );
}
 
export default Form;
