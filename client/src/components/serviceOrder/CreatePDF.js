import React, { useContext, useRef } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';

import { url } from '../../../app.json'
import { appContext } from '../../context/Provider'

const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontWeight: 'bold'
    },
    textHeaderContainer: {
        alignItems: 'center'
    },
    dateOrdenIDContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    dateContainer: {
        width: 200,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 10
    },
    body: {
        flex: 5,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    textBody:{ marginBottom: 10 }
});

const PDF = ({ 
        airFilter,
        oilFilter,
        fuelFilter,
        plugs,
        wiresets,
        brakeshoe,
        cleanInj, 
        cleanAB,
        coil,
        transmission,
        antifreeze,
        date,
        make,
        model,
        year,
        car,
        IDOrder
    }) => {

    return(
        <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image source={{ uri: `${url}/images/logo.jpg`, method: 'GET', headers: {}, body: '' }} style={styles.logo}/>
                <View style={styles.textHeaderContainer}>
                    <Text style={styles.title}>Tornillos y Lubricantes</Text>
                    <Text style={styles.textHeader}>JULIO AZPIZU RUIZ</Text>
                    <Text style={styles.textHeader}>AVE. MINA No. 1077 SUR GÓMEZ PALACIO, DGO.</Text>
                    <Text style={styles.textHeader}>TEL/FAX (871)714-4045</Text>
                </View>
            </View>
            <View style={styles.dateOrdenIDContainer}>                      
                <Text>FECHA: {date}</Text>
                <Text>ORDEN DE TRABAJO: No. {IDOrder}</Text>
            </View>
            <View style={styles.body}>                      
                <Text style={styles.textBody}>VEHÍCULO: {make} {model} {year} {car.motor} {car.cylinder}</Text>
                <Text style={styles.textBody}>LIMPIEZA DE INYECTORES: {cleanInj}</Text>
                <Text style={styles.textBody}>LIMPIEZA DE CUERPO DE ACELERACIÓN: {cleanAB}</Text>
                <Text style={styles.textBody}>FILTRO DE ACEITE: {oilFilter}</Text>
                <Text style={styles.textBody}>FILTRO DE GASOLINA: {fuelFilter}</Text>
                <Text style={styles.textBody}>FILTRO DE AIRE: {airFilter}</Text>
                {plugs === "Si" && <Text style={styles.textBody}>BUJÍAS: {plugs}</Text>}
                {wiresets === "Si" && <Text style={styles.textBody}>JUEGO DE CABLES: {wiresets}</Text>}
                {brakeshoe === "Si" && <Text style={styles.textBody}>BALATAS: {brakeshoe}</Text>}
                {coil === "Si" && <Text style={styles.textBody}>BOBINA: {coil}</Text>}
                {antifreeze === "Si" && <Text style={styles.textBody}>ANTICONGELANTE: {antifreeze}</Text>}
                {transmission === "Si" && <Text style={styles.textBody}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
            </View>
        </Page>
    </Document>
    )

}

const PDFClient = ({ 
    airFilter,
    oilFilter,
    fuelFilter,
    plugs,
    wiresets,
    brakeshoe,
    cleanInj, 
    cleanAB,
    coil,
    transmission,
    antifreeze,
    date,
    make,
    model,
    year,
    car,
    IDOrder
}) => {

return(
    <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.header}>
            <Image source={{ uri: `${url}/images/logo.jpg`, method: 'GET', headers: {}, body: '' }} style={styles.logo}/>
            <View style={styles.textHeaderContainer}>
                <Text style={styles.title}>Tornillos y Lubricantes</Text>
                <Text style={styles.textHeader}>JULIO AZPIZU RUIZ</Text>
                <Text style={styles.textHeader}>AVE. MINA No. 1077 SUR GÓMEZ PALACIO, DGO.</Text>
                <Text style={styles.textHeader}>TEL/FAX (871)714-4045</Text>
            </View>
        </View>
        <View style={styles.dateOrdenIDContainer}>                      
            <Text>FECHA: {date}</Text>
            <Text>ORDEN DE TRABAJO: No. {IDOrder}</Text>
        </View>
        <View style={styles.body}>                      
            <Text style={styles.textBody}>VEHÍCULO: {make} {model} {year} {car.motor} {car.cylinder}</Text>
            <Text style={styles.textBody}>LIMPIEZA DE INYECTORES: {cleanInj}</Text>
            <Text style={styles.textBody}>LIMPIEZA DE CUERPO DE ACELERACIÓN: {cleanAB}</Text>
            <Text style={styles.textBody}>FILTRO DE ACEITE: {oilFilter}</Text>
            <Text style={styles.textBody}>FILTRO DE GASOLINA: {fuelFilter}</Text>
            <Text style={styles.textBody}>FILTRO DE AIRE: {airFilter}</Text>
            {plugs === "Si" && <Text style={styles.textBody}>BUJÍAS: {plugs}</Text>}
            {wiresets === "Si" && <Text style={styles.textBody}>JUEGO DE CABLES: {wiresets}</Text>}
            {brakeshoe === "Si" && <Text style={styles.textBody}>BALATAS: {brakeshoe}</Text>}
            {coil === "Si" && <Text style={styles.textBody}>BOBINA: {coil}</Text>}
            {antifreeze === "Si" && <Text style={styles.textBody}>ANTICONGELANTE: {antifreeze}</Text>}
            {transmission === "Si" && <Text style={styles.textBody}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
        </View>
    </Page>
</Document>
)

}

function CreatePDF({ 
        airFilter,
        oilFilter,
        fuelFilter,
        plugs,
        wiresets,
        brakeshoe,
        coil,
        transmission,
        antifreeze,
        cleanInj, 
        cleanAB }) {

    const context = useContext(appContext)   

    const aRef = useRef(); 

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

        `${hours}:${minutes}`
    }

    const openPDFWindow = (url) => window.open(url, "PDF", "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes");

    const getIDOrder = () => window.localStorage.getItem('@IDOrder')

    const returnNumberIDOrder = () => {
        let IDOrder = Number(getIDOrder())
        let IDOrderString = ''
        if(IDOrder >= 0){ IDOrderString = `000${IDOrder}` }
        if(IDOrder >= 10){ IDOrderString = `00${IDOrder}` }
        if(IDOrder >= 100){ IDOrderString = `0${IDOrder}` }
        if(IDOrder >= 1000){ IDOrderString = `${IDOrder}` }
        return IDOrderString
    }

    const downloadPDF = (e) => {
        e.preventDefault()
        aRef.current.click()
        resetIDORder()
        window.location.reload()
    }

    const resetIDORder = () => window.localStorage.setItem('@IDOrder', -1 )
    
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
                    IDOrder={returnNumberIDOrder()}
                />
            } 
            //fileName={`Orden de Servicio ${returnDate()} ${returnTime()}.pdf`}
        >
            {({ blob, url, loading, error }) =>{
                if(blob){
                    return (
                        <>
                        <button 
                            className="btn btn-primary" 
                            onClick={downloadPDF} 
                        >CREAR PDF</button>
                        <a 
                            href={url} 
                            download={`Orden de Servicio ${returnDate()} ${returnTime()}.pdf`} 
                            id="hidden-atag"
                            ref={aRef}
                        ></a>
                        </>
                    )
                }
                return <button className="btn btn-primary" disabled={true}>CREAR PDF</button>
            }}
        </BlobProvider>
        
        </>
    )
}

export default CreatePDF;
