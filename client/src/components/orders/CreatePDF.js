import React, { useRef, useCallback } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import axios from 'axios';

import { url, messageServerError } from '../../../app.json';
import PDF from '../serviceOrder/PDF';
import PDFClient from '../serviceOrder/PDFClient';

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
        aceite,
        Oil,
        aceiteLts,
        note,
        order,
        services,
        totalFilters,
        cleanAB }) {

    function useHookWithRefCallback() {
        const ref = useRef(null)
        const setRef = useCallback(node => {          
            if (node) {
                if(node.id === "atag2"){
                    node.click()
                    let orderUpdated = {
                        id: order._id,
                        car: order.car._id,
                        carYear: order.carYear,
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
                        total: getTotal()                   
                    }
                    updateOrder(orderUpdated).then(() => {
                        window.location.reload()
                    }).catch((e) => {
                        alert(`${messageServerError}`)
                        window.location.reload()
                    })
                    
                }else{ node.click() }
            }            
            ref.current = node
        }, [])
        
        return [setRef]
    }
     
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

    const returnNumberIDOrder = () => {
        let IDOrder = order.idOrder
        let IDOrderString = ''
        if(IDOrder >= 0){ IDOrderString = `000${IDOrder}` }
        if(IDOrder >= 10){ IDOrderString = `00${IDOrder}` }
        if(IDOrder >= 100){ IDOrderString = `0${IDOrder}` }
        if(IDOrder >= 1000){ IDOrderString = `${IDOrder}` }
        return IDOrderString
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

    const getTotal = () => {
        let total = 0        
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
                    make={order.car.make.name}
                    model={order.car.model.name}
                    year={order.carYear}
                    car={order.car}
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
                                    make={order.car.make.name}
                                    model={order.car.model.name}
                                    year={order.carYear}
                                    car={order.car}
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
