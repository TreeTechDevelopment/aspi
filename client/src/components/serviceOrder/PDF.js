import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font  } from '@react-pdf/renderer';

import { url } from '../../../app.json';

console.log(url)

Font.register({ family: 'BlueHighWay', src: `${url}/fonts/blue-highway-rg.ttf` });
Font.register({ family: 'BlueHighWayBold', src: `${url}/fonts/blue-highway-bd.ttf` });

export const styles = StyleSheet.create({
    section: {
      flex: 1,
      marginTop: 30,
      paddingHorizontal: 20,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    logo: {
        width: 25,
        height: 25,
    },  
    title: {
        fontFamily: 'BlueHighWay',
        fontSize: 10,
        marginLeft: 10
    },
    textHeaderContainer: {
        alignItems: 'center'
    },
    idContainer:{
        flex: 1,
        backgroundColor: '#feb201',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingVertical: 10
    },
    idText:{
        color: 'white',
        fontFamily: 'BlueHighWayBold',
        fontSize: 13
    },
    text:{
        fontFamily: 'BlueHighWayBold',
        fontSize: 13
    },
    footer:{
        marginTop: 30,
        borderTop: 5,
        borderTopColor: '#feb201',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5
    }
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
    total,
    phone,
    orderToUpdate
}) => {

return(
    <Document> 
    <Page size={226.77} style={styles.page}>
        <View style={styles.header}>
            <Image source={{ uri: `${url}/images/logo.png`, method: 'GET', headers: {}, body: '' }} style={styles.logo}/>
            <Text style={styles.title}>Tornillos y lubricantes</Text>
        </View>
        <View style={styles.idContainer}>
            <Text style={styles.idText}>FOLIO: {IDOrder}</Text>
        </View>
        <View style={styles.section}>                      
            <Text style={styles.text}>TELÉFONO: {phone}</Text>
            <Text style={styles.text}>FECHA: {date}</Text>
        </View>
        <View style={styles.section}>                      
            <Text style={styles.text}>
                VEHÍCULO: {orderToUpdate ? `${orderToUpdate.car.make.name} ${orderToUpdate.car.model.name} ${orderToUpdate.carYear} ${orderToUpdate.car.motor} ${orderToUpdate.car.cylinder}` : 
                `${make} ${model} ${year} ${car.motor} ${car.cylinder}`}
            </Text>
        </View>
        <View style={styles.section}>                      
            {cleanInj === "Si" && <Text style={styles.text}>LIMPIEZA DE INYECTORES: {cleanInj}</Text>}
            {cleanAB === "Si" && <Text style={styles.text}>LIMPIEZA DE CUERPO DE ACELERACIÓN: {cleanAB}</Text>}
            {Oil === "Si" && (
                <Text style={styles.text}>
                    ACEITE: {aceite.presentation === "Suelto" ? `${aceite.presentation} ${lts} ${aceite.make} ${aceite.viscosity} ${aceite.type}` : 
                    `${aceite.presentation} ${aceite.make} ${aceite.viscosity} ${aceite.type} ${ (aceite.name && aceite.name !== "none") ? aceite.name : '' }` }
                </Text>
            )}
            { oilFilter !== "" && <Text style={styles.text}>FILTRO DE ACEITE: {oilFilter}</Text>}
            { fuelFilter !== "" && <Text style={styles.text}>FILTRO DE GASOLINA: {fuelFilter}</Text>}
            { airFilter !== "" && <Text style={styles.text}>FILTRO DE AIRE: {airFilter}</Text>}
            { cabineFilter !== "" && <Text style={styles.text}>FILTRO DE AIRE DE CABINA: {cabineFilter}</Text>}
            {sparkplug !== "" && <Text style={styles.text}>BUJÍAS: {sparkplug}</Text>}
            {wiresets !== "" && <Text style={styles.text}>JUEGO DE CABLES: {wiresets}</Text>}
            {coil === "Si" && <Text style={styles.text}>BOBINA: {coil}</Text>}
            {antifreeze === "Si" && <Text style={styles.text}>ANTICONGELANTE: {antifreeze}</Text>}
            {transmission === "Si" && <Text style={styles.text}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
        </View>                      
        {(rectifyDisk === "Si" || brakeshoeFront !== "" || brakeshoeBack !== "") && (
            <View style={styles.section}>
                <Text style={styles.text}>FRENOS</Text>
                {brakeshoeFront !== "" && <Text style={styles.text}>BALATAS DELANTERAS: {brakeshoeFront}</Text>}
                {brakeshoeBack !== "" && <Text style={styles.text}>BALATAS TRASERAS: {brakeshoeBack}</Text>}
                {rectifyDisk === "Si" && <Text style={styles.text}>RECTIFICADO DE DISCOS: {rectifyDisk}</Text>}
            </View>
        )}
        <View style={styles.section}>                      
            <Text style={styles.text}>NOTAS: {note}</Text>
            <Text style={styles.text}>TOTAL: ${total}</Text>
        </View>
        <View style={styles.footer}>                      
            <Text style={styles.text}>Av. Mina 1077 Sur Gómez Palacio Dgo.</Text>
            <Text style={styles.text}>Tel. (871) 714 4045</Text>
        </View>
    </Page>
</Document>
)}


export default PDF
