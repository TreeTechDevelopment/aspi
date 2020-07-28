import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { url } from '../../../app.json';

export const styles = StyleSheet.create({
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
    subTitle: {
        fontWeight: 'semibold'
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
    cabineFilter,
    sparkplug,
    wiresets,
    brakeshoeBack,
    brakeshoeFront,
    cleanInj, 
    cleanAB,
    coil,
    transmission,
    antifreeze,
    date,
    make,
    model,
    aceite,
    Oil,
    lts,
    year,
    car,
    note,
    IDOrder,
    rectifyDisk,
    total
}) => {

return(
    <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.header}>
            <Image source={{ uri: `${url}/images/logo.png`, method: 'GET', headers: {}, body: '' }} style={styles.logo}/>
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
            {cleanInj === "Si" && <Text style={styles.textBody}>LIMPIEZA DE INYECTORES: {cleanInj}</Text>}
            {cleanAB === "Si" && <Text style={styles.textBody}>LIMPIEZA DE CUERPO DE ACELERACIÓN: {cleanAB}</Text>}
            {Oil === "Si" && (
                <Text style={styles.textBody}>
                    ACEITE: {aceite.presentation === "Suelto" ? `${aceite.presentation} ${lts} ${aceite.make} ${aceite.viscosity} ${aceite.type}` : 
                    `${aceite.presentation} ${aceite.make} ${aceite.viscosity} ${aceite.type}` }
                </Text>
            )}
            { oilFilter !== "" && <Text style={styles.textBody}>FILTRO DE ACEITE: {oilFilter}</Text>}
            { fuelFilter !== "" && <Text style={styles.textBody}>FILTRO DE GASOLINA: {fuelFilter}</Text>}
            { airFilter !== "" && <Text style={styles.textBody}>FILTRO DE AIRE: {airFilter}</Text>}
            { cabineFilter !== "" && <Text style={styles.textBody}>FILTRO DE AIRE DE CABINA: {cabineFilter}</Text>}
            {sparkplug !== "" && <Text style={styles.textBody}>BUJÍAS: {sparkplug}</Text>}
            {wiresets !== "" && <Text style={styles.textBody}>JUEGO DE CABLES: {wiresets}</Text>}
            {coil === "Si" && <Text style={styles.textBody}>BOBINA: {coil}</Text>}
            {antifreeze === "Si" && <Text style={styles.textBody}>ANTICONGELANTE: {antifreeze}</Text>}
            {transmission === "Si" && <Text style={styles.textBody}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
            {(rectifyDisk === "Si" || brakeshoeFront !== "" || brakeshoeBack !== "") && (
                <>
                <Text style={styles.subTitle}>FRENOS</Text>
                {brakeshoeFront !== "" && <Text style={styles.textBody}>BALATAS DELANTERAS: {brakeshoeFront}</Text>}
                {brakeshoeBack !== "" && <Text style={styles.textBody}>BALATAS TRASERAS: {brakeshoeBack}</Text>}
                {rectifyDisk === "Si" && <Text style={styles.textBody}>RECTIFICADO DE DISCOS: {rectifyDisk}</Text>}
                </>
            )}
            <Text style={styles.textBody}>NOTAS: {note}</Text>
            <Text style={styles.textBody}>TOTAL: ${total}</Text>
        </View>
    </Page>
</Document>
)}


export default PDF
