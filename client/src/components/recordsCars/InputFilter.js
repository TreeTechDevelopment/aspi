import React, { useState, useContext, useEffect } from 'react'

import { appContext }  from '../../context/Provider';

function InputFilter({ idx, setFilters, type }) {

    const context = useContext(appContext)

    const [filter, setFilter] = useState('')

    const handleInput = e => {
        setFilter(e.target.value)
        setFilters(e.target.value, idx)
    }

    useEffect(() => {
        if( JSON.stringify(context.carToEdit) !== "{}"){
            switch(type){
                case 'airFilter':   
                    if(context.carToEdit.airFilter[idx]){ setFilter(context.carToEdit.airFilter[idx]) }
                    break;
                case 'oilFilter':
                    if(context.carToEdit.oilFilter[idx]){ setFilter(context.carToEdit.oilFilter[idx]) }
                    break;
                case 'fuelFilter':
                    if(context.carToEdit.fuelFilter[idx]){ setFilter(context.carToEdit.fuelFilter[idx]) }
                    break;
                case 'cabineFilter':
                    if(context.carToEdit.cabineFilter[idx]){ setFilter(context.carToEdit.cabineFilter[idx]) }
                    break;
                case 'sparkplug':
                    if(context.carToEdit.sparkPlug[idx]){ setFilter(context.carToEdit.sparkPlug[idx]) }
                    break;
                case 'wireset':
                    if(context.carToEdit.wiresets[idx]){ setFilter(context.carToEdit.wiresets[idx]) }
                    break;
                case 'brakeshoeFront':
                    if(context.carToEdit.brakeShoeFront[idx]){ setFilter(context.carToEdit.brakeShoeFront[idx]) }
                    break;
                case 'brakeshoeBack':
                    if(context.carToEdit.brakeShoeBack[idx]){ setFilter(context.carToEdit.brakeShoeBack[idx]) }
                    break;
            }
        }
    }, [context.carToEdit])

    return (
        <input
            className="input-records"
            value={filter}
            onChange={handleInput}
        />
    )
}

export default InputFilter
