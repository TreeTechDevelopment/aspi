import React, { useState, useEffect, useContext, useRef } from "react";
import Modal from "react-modal";

import { appContext } from '../../context/Provider'
import CreatePDF from './CreatePDF';

Modal.setAppElement("#app");


const InputLTS = ({ product, updateList }) => {

    const context = useContext(appContext)

    let productList = context.productsPrice.find( p => p._id == product._id)

    const timeout = useRef(null)

    const [lts, setLts] = useState(productList.quantity.toString())

    const timeoutUpdate = () => {
        if(timeout.current){ 
            clearTimeout(timeout.current) 
        }
        timeout.current = setTimeout(() => { updateList() }, 1000)
    }

    const handleInputLts = (e) => {
        context.dispatchProductsPrice({ type: 'UPDATE', value: { _id: product._id, quantity: e.target.value.replace( /[^0-9.]/g, '') } })
        setLts(e.target.value.replace( /[^0-9.]/g, ''))
        timeoutUpdate()
    }

    return(
        <input 
            value={lts}
            onChange={handleInputLts}
            className="input wo-margin-bottom small"
        />
    )
}


function ShopList({ modalIsOpen, closeModal, productsList, removeProduct, textSuccessButton, successFunction, buy, totalServices }) {

    const context = useContext(appContext)

    const [rerender, setRerender] = useState(false)

    const doBeforeCloseModal = () => {
        closeModal()
    }

    const updateList = () => setRerender(!rerender)

    const renderTotal = () => {
        let total = 0
        for(let i=0; i < context.productsPrice.length; i++){
            total += context.productsPrice[i].price * context.productsPrice[i].quantity
        }
        if(totalServices){ total += totalServices }
        return total.toFixed(2)
    }

    const deleteProduct = product => {
        context.dispatchProductsPrice({ type: 'REMOVE', value: { _id: product._id } })
        removeProduct(product)
    }

    const removeOne = (product) => {
        let productList = context.productsPrice.find( p => p._id == product._id)
        if(productList.quantity -1 === 0){ return deleteProduct(product) }
        context.dispatchProductsPrice({ type: 'UPDATE', value: { _id: product._id, quantity: productList.quantity-1 } })
        updateList()
    }

    const addOne = (product) => {
        let productList = context.productsPrice.find( p => p._id == product._id)
        context.dispatchProductsPrice({ type: 'UPDATE', value: { _id: product._id, quantity: productList.quantity+1 } })
        updateList()
    }

    useEffect(() => {
        for(let i = 0; i < productsList.length; i++){
            let newProduct = {
                _id: productsList[i]._id,
                price: productsList[i].price,
                product: productsList[i],
                quantity: 1
            }
            context.dispatchProductsPrice({ type: 'ADD', value: newProduct })
        }
    }, [productsList])

    return (
        <>
        <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={doBeforeCloseModal}
            style={{
                content: {
                    width: '50%',
                    height: '90%',
                    top: '5%',
                    left: '25%'
                }
            }}
        >
            <div className="full-width full-height direction-column">
                <div className="shop-list">
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUCTO</th> 
                                <th>CANTIDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.productsPrice.map( (product, idx) => (
                                <tr key={Math.random().toString()}>
                                    <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                        {product.product.interfil ? product.product.interfil : product.product.NGK ? product.product.NGK : product.product.Roadstar ? product.product.Roadstar : product.product.Wagner ? product.product.Wagner : product.product.Injecth ? product.product.Injecth : product.product.name ? product.product.name.replace(/_/g, ' ') : ''}
                                    </td>
                                    {(product.product.name && product.product.name.split('_')[2] === "Suelto") ? (
                                        <>
                                        <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                            <InputLTS product={product} updateList={updateList}/>
                                        </td>
                                        <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                            <button className="btn-aspi-circle margin-btn-shop-list margin-right" onClick={() => deleteProduct(product)}>-</button>
                                        </td>
                                        </>
                                    ):(
                                        <>
                                            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                                {product.quantity}
                                            </td>
                                            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                                <button className="btn-aspi-circle margin-btn-shop-list margin-right" onClick={() => removeOne(product)}>-</button>
                                            </td>
                                            <td className={idx % 2 === 0 ? 'odd' : 'even'}>
                                                <button className="btn-aspi-circle  margin-right" onClick={() => addOne(product)}>+</button>
                                            </td>
                                        </>
                                    )}
                                   
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
                <div className="shop-list-total-container"> TOTAL {renderTotal()}</div>
                <div className="btn-shop-shop-list-container">
                    <button className="btn-aspi" onClick={successFunction}>{textSuccessButton}</button>
                </div>
            </div>
        </Modal>
        {buy && (
            <CreatePDF 
            
            />
        )}
        </>
    )
}

export default ShopList
