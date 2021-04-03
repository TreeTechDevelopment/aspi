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
        <div className="si-filter-btn">
            <button className="btns-records" onClick={handleRemoveBtn}>-</button>
            <button className="btns-records-left" onClick={handleAddBtn}>+</button>
        </div>
    )
}

export default BtnProduct
