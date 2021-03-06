import React, { useState, useContext, useEffect } from 'react'

import { appContext } from '../../context/Provider'

function InputFilter({ idx, setProducts, type }) {

    const context = useContext(appContext)

    const [product, setProduct] = useState('')

    const handleInput = (e) => {
        setProduct(e.target.value)
        setProducts(e.target.value, idx, type)
    }

    useEffect(() => {
        if( JSON.stringify(context.product) !== "{}"){
            switch(type){
                case "OEM":
                    if(context.product.OEM[idx]){ setProduct(context.product.OEM[idx]) }
                    break;
                case "ACD":
                    if(context.product.ACD[idx]){ setProduct(context.product.ACD[idx]) }
                    break;
                case "Fram":
                    if(context.product.Fram[idx]){ setProduct(context.product.Fram[idx]) }  
                    break;
                case "Gonher":
                    if(context.product.Gonher[idx]){ setProduct(context.product.Gonher[idx]) }
                    break;
                case "Motorcraft":
                    if(context.product.Motorcraft[idx]){ setProduct(context.product.Motorcraft[idx]) }
                    break;
                case "Purolator":
                    if(context.product.Purolator[idx]){ setProduct(context.product.Purolator[idx]) }
                    break;
                case "Wix":
                    if(context.product.Wix[idx]){ setProduct(context.product.Wix[idx]) }
                    break;
                case "Mann":
                    if(context.product.Mann[idx]){ setProduct(context.product.Mann[idx]) }
                    break;
                case "NGK":
                    if(context.product.NGK[idx]){ setProduct(context.product.NGK[idx]) }
                    break;
                case "Bosh":
                    if(context.product.Bosh[idx]){ setProduct(context.product.Bosh[idx]) }
                    break;
                case "Champions":
                    if(context.product.Champions[idx]){ setProduct(context.product.Champions[idx]) }
                    break;
                case "LS":
                    if(context.product.LS[idx]){ setProduct(context.product.LS[idx]) }
                    break;
                case "Roadstar":
                    if(context.product.Roadstar[idx]){ setProduct(context.product.Roadstar[idx]) }
                    break;
                case "Wagner":
                    if(context.product.Wagner[idx]){ setProduct(context.product.Wagner[idx]) }
                    break;
                case "ECA":
                    if(context.product.ECA[idx]){ setProduct(context.product.ECA[idx]) }
                    break;
                case "Sky":
                    if(context.product.Sky[idx]){ setProduct(context.product.Sky[idx]) }
                    break;
                case "Seineca":
                    if(context.product.Seineca[idx]){ setProduct(context.product.Seineca[idx]) }
                    break;
                case "Walmi":
                    if(context.product.Walmi[idx]){ setProduct(context.product.Walmi[idx]) }
                    break;
                case "Joe":
                    if(context.product.Joe[idx]){ setProduct(context.product.Joe[idx]) }
                    break;
                case "Injecth":
                    if(context.product.Injecth[idx]){ setProduct(context.product.Injecth[idx]) }
                    break;
                case "Kem":
                    if(context.product.Kem[idx]){ setProduct(context.product.Kem[idx]) }
                    break;
            }
        }
    },[context.product])

    return (
        <input 
            value={product}
            onChange={handleInput}
        />
    )
}

export default InputFilter
