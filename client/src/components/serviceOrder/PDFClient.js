import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';

import { styles } from './PDF'
import { url } from '../../../app.json';

const PDFClient = ({ 
    airFilter,
    oilFilter,
    fuelFilter,
    cabineFilter,
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
    IDOrder,
    aceite,
    Oil,
    aceiteLts,
    note,
    total
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
            {Oil === "Si" && <Text style={styles.textBody}>ACEITE: {aceite} {aceiteLts}</Text>}
            <Text style={styles.textBody}>FILTRO DE ACEITE: {oilFilter !== "" ? 'Si' : 'No'}</Text>
            <Text style={styles.textBody}>FILTRO DE GASOLINA: {fuelFilter !== "" ? 'Si' : 'No'}</Text>
            <Text style={styles.textBody}>FILTRO DE AIRE: {airFilter !== "" ? 'Si' : 'No'}</Text>
            <Text style={styles.textBody}>FILTRO DE AIRE DE CABINA: {cabineFilter !== "" ? 'Si' : 'No'}</Text>
            {plugs === "Si" && <Text style={styles.textBody}>BUJÍAS: {plugs}</Text>}
            {wiresets === "Si" && <Text style={styles.textBody}>JUEGO DE CABLES: {wiresets}</Text>}
            {brakeshoe === "Si" && <Text style={styles.textBody}>BALATAS: {brakeshoe}</Text>}
            {coil === "Si" && <Text style={styles.textBody}>BOBINA: {coil}</Text>}
            {antifreeze === "Si" && <Text style={styles.textBody}>ANTICONGELANTE: {antifreeze}</Text>}
            {transmission === "Si" && <Text style={styles.textBody}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
            <Text style={styles.textBody}>NOTAS: {note}</Text>
            <Text style={styles.textBody}>TOTAL: ${total}</Text>
        </View>
    </Page>
</Document>
)}

export default PDFClient
