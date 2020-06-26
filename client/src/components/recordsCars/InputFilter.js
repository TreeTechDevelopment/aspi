import React, { useState } from 'react'

function InputFilter({ idx, setFilters }) {

    const [filter, setFilter] = useState('')

    const handleInput = e => {
        setFilter(e.target.value)
        setFilters(e.target.value, idx)
    }

    return (
        <input 
            value={filter}
            onChange={handleInput}
        />
    )
}

export default InputFilter
