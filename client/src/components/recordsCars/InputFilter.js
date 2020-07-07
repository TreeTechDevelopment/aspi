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
                    if(context.carToEdit.cabineFilter && context.carToEdit.cabineFilter[idx]){ setFilter(context.carToEdit.cabineFilter[idx]) }
                    break;
            }
        }
    }, [context.carToEdit])

    return (
        <input 
            value={filter}
            onChange={handleInput}
        />
    )
}

export default InputFilter
