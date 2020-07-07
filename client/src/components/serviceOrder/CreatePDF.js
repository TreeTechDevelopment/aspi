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
        plugs,
        wiresets,
        brakeshoe,
        coil,
        transmission,
        antifreeze,
        cleanInj, 
        totalFilters,
        aceite,
        Oil,
        aceiteLts,
        note,
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
                        oil:{
                            oilRequired: Oil, 
                            oilType: aceite,
                            oilLts: aceiteLts
                        },
                        filters: {
                            airFilter, fuelFilter, oilFilter, cabineFilter
                        },
                        note, cleanAB, cleanInj, brakeshoe,
                        coil, transmission, antifreeze, plugs,
                        idOrder: Number(getIDOrder()),
                        total: getTotal()
                    }
                    createOrder(order).then(() => {
                        resetIDORder()
                        window.location.reload()
                    }).catch((e) => {
                        alert(`${messageServerError}`)
                    })
                    
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

    const getTotal = () => {
        let total = 0
        const services = context.services
        if(cleanAB === "Si"){
            let idx = services.findIndex( service => service.name === "cleanAB" )
            total += services[idx].price
        }if(cleanInj === "Si"){
            let idx = services.findIndex( service => service.name === "cleanInj" )
            total += services[idx].price
        }if(plugs === "Si"){
            let idx = services.findIndex( service => service.name === "plugs" )
            total += services[idx].price
        }if(transmission === "Si"){
            let idx = services.findIndex( service => service.name === "transmission" )
            total += services[idx].price
        }if(coil === "Si"){
            let idx = services.findIndex( service => service.name === "coil" )
            total += services[idx].price
        }if(wiresets === "Si"){
            let idx = services.findIndex( service => service.name === "wiresets" )
            total += services[idx].price
        }if(airFilter !== ""){
            let idx = services.findIndex( service => service.name === "changeAirFilter" )
            total += services[idx].price
        }if(oilFilter !== ""){
            let idx = services.findIndex( service => service.name === "changeOilFilter" )
            total += services[idx].price
        }if(fuelFilter !== ""){
            let idx = services.findIndex( service => service.name === "changeFuelFilter" )
            total += services[idx].price
        }if(cabineFilter !== ""){
            let idx = services.findIndex( service => service.name === "changeCabineFilter" )
            total += services[idx].price
        }if(brakeshoe === "Si"){
            let idx = services.findIndex( service => service.name === "brakeshoe" )
            total += services[idx].price
        }if(antifreeze === "Si"){
            let idx = services.findIndex( service => service.name === "antifreeze" )
            total += services[idx].price
        }
        total += totalFilters
        return total
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
                    plugs={plugs}
                    coil={coil}
                    antifreeze={antifreeze}
                    transmission={transmission}
                    wiresets={wiresets}
                    brakeshoe={brakeshoe}
                    date={returnDate()}
                    make={context.make}
                    model={context.model}
                    year={context.year}
                    car={context.car}
                    aceite={aceite}
                    Oil={Oil}
                    aceiteLts={aceiteLts}
                    IDOrder={returnNumberIDOrder()}
                    note={note}
                    total={getTotal()}
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
                                    cleanInj={cleanInj}
                                    cleanAB={cleanAB}
                                    airFilter={airFilter}
                                    oilFilter={oilFilter}
                                    fuelFilter={fuelFilter}
                                    cabineFilter={cabineFilter}
                                    plugs={plugs}
                                    coil={coil}
                                    antifreeze={antifreeze}
                                    transmission={transmission}
                                    wiresets={wiresets}
                                    brakeshoe={brakeshoe}
                                    date={returnDate()}
                                    make={context.make}
                                    model={context.model}
                                    year={context.year}
                                    car={context.car}
                                    aceite={aceite}
                                    Oil={Oil}
                                    aceiteLts={aceiteLts}
                                    IDOrder={returnNumberIDOrder()}
                                    note={note}
                                    total={getTotal()}
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
