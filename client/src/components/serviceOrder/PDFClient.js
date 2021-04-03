import React from 'react';
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';

import { styles } from './PDF'
import { url } from '../../../app.json';

const PDFClient = ({ 
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
    year,
    car,
    IDOrder,
    aceite,
    Oil,
    lts,
    rectifyDisk,
    note,
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
            { oilFilter !== "" && <Text style={styles.text}>FILTRO DE ACEITE: Si</Text>}
            { fuelFilter !== "" && <Text style={styles.text}>FILTRO DE GASOLINA: Si</Text>}
            { airFilter !== "" && <Text style={styles.text}>FILTRO DE AIRE: Si</Text>}
            { cabineFilter !== "" && <Text style={styles.text}>FILTRO DE AIRE DE CABINA: Si</Text>}
            {sparkplug !== "" && <Text style={styles.text}>BUJÍAS: Si</Text>}
            {wiresets !== "" && <Text style={styles.text}>JUEGO DE CABLES: Si</Text>}
            {coil === "Si" && <Text style={styles.text}>BOBINA: {coil}</Text>}
            {antifreeze === "Si" && <Text style={styles.text}>ANTICONGELANTE: {antifreeze}</Text>}
            {transmission === "Si" && <Text style={styles.text}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
        </View>
        {(rectifyDisk === "Si" || brakeshoeFront !== "" || brakeshoeBack !== "") && (
            <View style={styles.section}>
                <Text style={styles.text}>FRENOS</Text>
                {brakeshoeFront !== "" && <Text style={styles.text}>BALATAS DELANTERAS: Si</Text>}
                {brakeshoeBack !== "" && <Text style={styles.text}>BALATAS TRASERAS: Si</Text>}
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

export default PDFClient
