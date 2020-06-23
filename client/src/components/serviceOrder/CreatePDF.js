import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';

import { url } from '../../../app.json'

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
        car, 
        make, 
        model, 
        airFilter,
        oilFilter,
        fuelFilter,
        plugs,
        wiresets,
        year,
        brakeshoe,
        cleanInj, 
        cleanAB }){

    const renderMonth = () => {
        if(new Date().getMonth() + 1 < 10){ return `0${new Date().getMonth() + 1}` }
        else{ return new Date().getMonth() + 1 }
    }

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
                    <Text style={styles.textBody}>VEHÍCULO: {make} {model} {year} {car.motor} {car.cylinder}</Text>
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
}

function CreatePDF({ 
        car, 
        make, 
        model, 
        airFilter,
        oilFilter,
        fuelFilter,
        year,
        plugs,
        wiresets,
        brakeshoe,
        cleanInj, 
        cleanAB }) {
    
    return (
        <div>
            <PDFDownloadLink 
                document={
                    <PDF 
                        car={car}
                        make={make}
                        model={model}
                        cleanInj={cleanInj}
                        cleanAB={cleanAB}
                        airFilter={airFilter}
                        oilFilter={oilFilter}
                        fuelFilter={fuelFilter}
                        plugs={plugs}
                        wiresets={wiresets}
                        brakeshoe={brakeshoe}
                        year={year}
                    />
                } 
                fileName="somename.pdf"
            >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    )
}

export default CreatePDF;
