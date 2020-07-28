import React from 'react'

function BtnProduct({ product, addProduct, removeProduct }) {

    const handleAddBtn = e => {
        e.preventDefault()
        addProduct(product)
    }

    const handleRemoveBtn = e => {
        e.preventDefault()
        removeProduct(product)
    }

    return (
        <div className="btns-filter-container">
            <button className="btn btn-primary" onClick={handleRemoveBtn}>-</button>
            <button className="btn btn-primary" onClick={handleAddBtn}>+</button>
        </div>
    )
}

export default BtnProduct
