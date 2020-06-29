import React, { useState, useContext, useEffect } from 'react'

import { appContext } from '../../context/Provider'

function InputFilter({ idx, setFilters, type }) {

    const context = useContext(appContext)

    const [filter, setFilter] = useState('')

    const handleInput = (e) => {
        setFilter(e.target.value)
        setFilters(e.target.value, idx)
    }

    useEffect(() => {
        if( JSON.stringify(context.filter) !== "{}"){
            switch(type){
                case "OEM":
                    if(context.filter.OEM[idx]){ setFilter(context.filter.OEM[idx]) }
                    break;
                case "ACD":
                    if(context.filter.ACD[idx]){ setFilter(context.filter.ACD[idx]) }
                    break;
                case "Fram":
                    if(context.filter.ACD[idx]){ setFilter(context.filter.ACD[idx]) }
                    break;
                case "Gonher":
                    if(context.filter.Gonher[idx]){ setFilter(context.filter.Gonher[idx]) }
                    break;
                case "Motorcraft":
                    if(context.filter.Motorcraft[idx]){ setFilter(context.filter.Motorcraft[idx]) }
                    break;
                case "Purolator":
                    if(context.filter.Purolator[idx]){ setFilter(context.filter.Purolator[idx]) }
                    break;
                case "Wix":
                    if(context.filter.Wix[idx]){ setFilter(context.filter.Wix[idx]) }
                    break;
                case "Mann":
                    if(context.filter.Mann[idx]){ setFilter(context.filter.Mann[idx]) }
                    break;
            }
        }
    },[context.filter])

    return (
        <input 
            value={filter}
            onChange={handleInput}
        />
    )
}

export default InputFilter
