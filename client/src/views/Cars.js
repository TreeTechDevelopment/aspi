import React, { useContext, useState } from 'react'

import Form from '../components/serviceOrder/Form'
import Navbar from '../components/Navbar'
import { appContext } from '../context/Provider'

function Cars() {

    const context = useContext(appContext)

    return (
        <div className={`bg-white ${JSON.stringify(context.car) !== "{}" ? ' direction-column justify-content-start padding-top' : ''}`}>
            <Navbar />
            <Form />
            {JSON.stringify(context.car) !== "{}" && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>F. DE AIRE</th>
                                <th>F. DE ACEITE</th>
                                <th>F. DE GASOLINA</th>
                                <th>F. DE CABINA</th>
                                <th>J. DE CABLES</th>
                                <th>BUJÍAS</th> 
                                <th>B. DELANTERA</th>
                                <th>B. TRASERA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="odd">
                                   {context.car.airFilter.map( airFilter => (
                                       <p key={airFilter + Math.random().toString()}>{airFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.oilFilter.map( oilFilter => (
                                       <p key={oilFilter + Math.random().toString()}>{oilFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.fuelFilter.map( fuelFilter => (
                                       <p key={fuelFilter + Math.random().toString()}>{fuelFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.cabineFilter.map( cabineFilter => (
                                       <p key={cabineFilter + Math.random().toString()}>{cabineFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.wiresets.map( wiresets => (
                                       <p key={wiresets + Math.random().toString()}>{wiresets}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.sparkPlug.map( sparkPlug => (
                                       <p key={sparkPlug + Math.random().toString()}>{sparkPlug}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.brakeShoeFront.map( brakeShoeFront => (
                                       <p key={brakeShoeFront + Math.random().toString()}>{brakeShoeFront}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {context.car.brakeShoeBack.map( brakeShoeBack => (
                                       <p key={brakeShoeBack + Math.random().toString()}>{brakeShoeBack}</p>
                                   ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Cars
