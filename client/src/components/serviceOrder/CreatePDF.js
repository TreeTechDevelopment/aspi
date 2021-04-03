import React, { useContext, useRef, useCallback } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import axios from 'axios';

import { url, messageServerError, messageUnauthorized } from '../../../app.json';
import { appContext } from '../../context/Provider';
import PDF from './PDF';

function CreatePDF({ 
        airFilter,
        oilFilter,
        fuelFilter,
        cabineFilter,
        sparkplug,
        wiresets,
        brakeshoeBack,
        brakeshoeFront,
        coil,
        transmission,
        antifreeze,
        cleanInj, 
        total, 
        rectifyDisk,
        Oil,
        note,
        phone,
        orderToUpdate,
        cleanAB }) {

    function useHookWithRefCallback() {
        const ref = useRef(null)
        const setRef = useCallback(node => {          
            if (node) {
                node.click()
                let order = {
                    car: context.car._id, carYear: context.year,
                    oil: Oil, antifreeze,
                    note, cleanAB, cleanInj, brakeshoeBack, brakeshoeFront,
                    coil, transmission, sparkplug, airFilter, oilFilter, cabineFilter, fuelFilter, rectifyDisk,
                    wiresets, idOrder: Number(getIDOrder()), total: getTotal(), phone, products: context.productsPrice
                }
                if(orderToUpdate){
                    order.id = orderToUpdate._id
                    updateOrder(order).then(() => {
                        context.dispatchProductsPrice({ type: 'SET', value: [] })
                        window.location.reload()
                    }).catch((e) => {
                        if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
                        alert(`${messageServerError}`)
                        window.location.reload()
                    })
                }else{
                    createOrder(order).then(() => {
                        resetIDORder()
                        context.dispatchProductsPrice({ type: 'SET', value: [] })
                        window.location.reload()
                    }).catch((e) => {
                        if(e.response.status === 401){ return alert(`${messageUnauthorized}`)  } 
                        alert(`${messageServerError}`)
                    })
                }
            }            
            ref.current = node
        }, [])
        
        return [setRef]
    }

    const context = useContext(appContext)   

    const [aRef] = useHookWithRefCallback(); 

    const returnDate = () => {
        let month = ''
        if(new Date().getMonth() + 1 < 10){ month =  `0${new Date().getMonth() + 1}` }
        else{ month =  new Date().getMonth() + 1 }
        return `${new Date().getDate()}/${month}/${new Date().getFullYear()}`
    }    

    const returnTime = () => {
        let hours = ''
        let minutes = ''
        
        if(new Date().getHours() < 10){ hours = `0${new Date().getHours()}` }
        else{ hours = `${new Date().getHours()}` }

        if(new Date().getMinutes() < 10){ minutes = `0${new Date().getMinutes()}` }
        else{ minutes = `${new Date().getMinutes()}` }

        return `${hours}:${minutes}`
    }

    const createOrder = async (data) => { 
        const res = await axios({
            url: `${url}/orders`,
            method: 'POST',
            timeout: 5000,
            data
        })

        return res.data
    }

    const updateOrder = async (data) => {
        const res = await axios({
            url: `${url}/orders`,
            method: 'PUT',
            timeout: 5000,
            data
        })

        return res.data
    }   

    const returnNumberIDOrder = () => {
        if(orderToUpdate){
            return orderToUpdate.idOrder
        }
        let IDOrder = Number(getIDOrder())
        let IDOrderString = ''
        if(IDOrder >= 0){ IDOrderString = `000${IDOrder}` }
        if(IDOrder >= 10){ IDOrderString = `00${IDOrder}` }
        if(IDOrder >= 100){ IDOrderString = `0${IDOrder}` }
        if(IDOrder >= 1000){ IDOrderString = `${IDOrder}` }
        return IDOrderString
    }       

    const resetIDORder = () => window.localStorage.setItem('@IDOrder', -1 )

    const getIDOrder = () => window.localStorage.getItem('@IDOrder')

    function getTotal(){
        let totalRender = total
        for(let i=0; i < context.productsPrice.length; i++){
            totalRender += context.productsPrice[i].price * context.productsPrice[i].quantity
        }
        return totalRender.toFixed(2)
    }
    
    return(
        <>
        <BlobProvider 
            document={
                <PDF                      
                    cleanInj={cleanInj}
                    cleanAB={cleanAB}
                    airFilter={airFilter}
                    oilFilter={oilFilter}
                    fuelFilter={fuelFilter}
                    cabineFilter={cabineFilter}
                    sparkplug={sparkplug}
                    coil={coil}
                    antifreeze={antifreeze}
                    transmission={transmission}
                    wiresets={wiresets}
                    brakeshoeBack={brakeshoeBack}
                    brakeshoeFront={brakeshoeFront}
                    date={returnDate()}
                    make={context.make}
                    model={context.model}
                    year={context.year}
                    car={context.car}
                    Oil={Oil}
                    IDOrder={returnNumberIDOrder()}
                    note={note}
                    total={getTotal()}
                    rectifyDisk={rectifyDisk}
                    phone={phone}
                    orderToUpdate={orderToUpdate}
                    products={context.productsPrice}
                    services={context.services}
                />
            }             
        >
            {({ blob, url, loading, error }) =>{

                return(
                    !loading ? (
                        <a 
                            href={url} 
                            download={`Orden de Servicio ${returnDate()} ${returnTime()}.pdf`} 
                            className="hidden-atag"
                            id="atag1"
                            ref={aRef}
                        ></a>
                    ): ( <></> )
                )
            }}
        </BlobProvider>
        
        </>
    )
}

export default CreatePDF;
