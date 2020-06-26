import React, { useContext } from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';

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

function PDF({ 
        airFilter,
        oilFilter,
        fuelFilter,
        plugs,
        wiresets,
        brakeshoe,
        cleanInj, 
        cleanAB }){

    const context = useContext(appContext)    

    const renderMonth = () => {
        if(new Date().getMonth() + 1 < 10){ return `0${new Date().getMonth() + 1}` }
        else{ return new Date().getMonth() + 1 }
    }

    if(context){
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
                        <Text>FECHA: {new Date().getDate()}/{renderMonth()}/{new Date().getFullYear()}</Text>
                        <Text>ORDEN DE TRABAJO: No. </Text>
                    </View>
                    <View style={styles.body}>                      
                        <Text style={styles.textBody}>VEHÍCULO: {context.make} {context.model} {context.year} {context.car.motor} {context.car.cylinder}</Text>
                        <Text style={styles.textBody}>LIMPIEZA DE INYECTORES: {cleanInj}</Text>
                        <Text style={styles.textBody}>LIMPIEZA DE CUERPO DE ACELERACIÓN: {cleanAB}</Text>
                        <Text style={styles.textBody}>FILTRO DE ACEITE: {oilFilter}</Text>
                        <Text style={styles.textBody}>FILTRO DE GASOLINA: {fuelFilter}</Text>
                        <Text style={styles.textBody}>FILTRO DE AIRE: {airFilter}</Text>
                        <Text style={styles.textBody}>BUJÍAS: {plugs}</Text>
                        <Text style={styles.textBody}>JUEGO DE CABLES: {wiresets}</Text>
                        <Text style={styles.textBody}>BALATAS: {brakeshoe}</Text>
                    </View>
                </Page>
            </Document>
        )
    }else{
        return <Document></Document>
    }

}

function CreatePDF({ 
        airFilter,
        oilFilter,
        fuelFilter,
        plugs,
        wiresets,
        brakeshoe,
        cleanInj, 
        cleanAB }) {

    const renderMonth = () => {
        if(new Date().getMonth() + 1 < 10){ return `0${new Date().getMonth() + 1}` }
        else{ return new Date().getMonth() + 1 }
    }
    
    
    return(
        <PDFDownloadLink 
            className="download-pdf-btn" 
            document={
                <PDF                      
                    cleanInj={cleanInj}
                    cleanAB={cleanAB}
                    airFilter={airFilter}
                    oilFilter={oilFilter}
                    fuelFilter={fuelFilter}
                    plugs={plugs}
                    wiresets={wiresets}
                    brakeshoe={brakeshoe}
                />
            } 
            fileName={`Orden ${new Date().getDate()}/${renderMonth()}/${new Date().getFullYear()} .pdf`}
        >
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Descargar')}
        </PDFDownloadLink>
    )
}

export default CreatePDF;
