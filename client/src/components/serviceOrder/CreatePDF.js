import React, { useContext, useRef, useCallback } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import axios from 'axios';

import { url, messageServerError } from '../../../app.json';
import { appContext } from '../../context/Provider';
import PDF from './PDF';
import PDFClient from './PDFClient';

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
        aceite,
        Oil,
        lts,
        note,
        orderToUpdate,
        cleanAB }) {

    function useHookWithRefCallback() {
        const ref = useRef(null)
        const setRef = useCallback(node => {          
            if (node) {
                if(node.id === "atag2"){
                    node.click()
                    let order = {
                        car: context.car._id,
                        carYear: context.year,
                        oil:{ oilRequired: Oil },
                        filters: {
                            airFilter, fuelFilter, oilFilter, cabineFilter
                        },
                        note, cleanAB, cleanInj, brakeshoeBack, brakeshoeFront,
                        coil, transmission, antifreeze, sparkplugs: sparkplug,
                        wiresets, idOrder: Number(getIDOrder()), total
                    }
                    if(Oil === "Si"){ 
                        order.oil.make = aceite.make 
                        order.oil.presentation = aceite.presentation
                        order.oil.viscosity = aceite.viscosity
                        order.oil.oilType = aceite.type
                        if(aceite.presentation === "Suelto"){ order.oil.lts = Number(lts) }
                    }
                    if(orderToUpdate){
                        order.id = orderToUpdate._id
                        updateOrder(order).then(() => {
                            window.location.reload()
                        }).catch((e) => {
                            alert(`${messageServerError}`)
                            window.location.reload()
                        })
                    }else{
                        createOrder(order).then(() => {
                            resetIDORder()
                            window.location.reload()
                        }).catch((e) => {
                            console.log(e)
                            alert(`${messageServerError}`)
                        })
                    }
                }else{ node.click() }
            }            
            ref.current = node
        }, [])
        
        return [setRef]
    }

    const context = useContext(appContext)   

    const [aRef] = useHookWithRefCallback(); 
    const [aRef2] = useHookWithRefCallback(); 

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
                    aceite={aceite}
                    lts={lts}
                    Oil={Oil}
                    IDOrder={returnNumberIDOrder()}
                    note={note}
                    total={total}
                    rectifyDisk={rectifyDisk}
                />
            }             
        >
            {({ blob, url, loading, error }) =>{

                let url1 = url

                return(
                    !loading ? (
                        <>

                        <BlobProvider 
                            document={
                                <PDFClient 
                                    rectifyDisk={rectifyDisk}                     
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
                                    lts={lts}
                                    car={context.car}
                                    aceite={aceite}
                                    Oil={Oil}
                                    IDOrder={returnNumberIDOrder()}
                                    note={note}
                                    total={total}
                                />
                            }             
                        >
                            {({ blob, url, loading, error }) =>{
                                
                                return(
                                    !loading ? (
                                        <>
                                        <a 
                                            href={url1} 
                                            download={`Orden de Servicio ${returnDate()} ${returnTime()}.pdf`} 
                                            className="hidden-atag"
                                            id="atag1"
                                            ref={aRef}
                                        ></a>
                                        <a 
                                            href={url} 
                                            download={`Orden de Cliente ${returnDate()} ${returnTime()}.pdf`} 
                                            className="hidden-atag"
                                            id="atag2"
                                            ref={aRef2}
                                        ></a>
                                        
                                        </>
                                    ): ( <></> )
                                )
                            }}
                        </BlobProvider>
                        </>
                    ): ( <></> )
                )
            }}
        </BlobProvider>
        
        </>
    )
}

export default CreatePDF;
