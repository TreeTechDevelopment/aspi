import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font  } from '@react-pdf/renderer';

import { url } from '../../../app.json';
import numberToLetter from '../../numberToLetter'

Font.register({ family: 'BlueHighWay', src: `${url}/fonts/blue-highway-rg.ttf` });
Font.register({ family: 'BlueHighWayBold', src: `${url}/fonts/blue-highway-bd.ttf` });

export const styles = StyleSheet.create({
    section: {
      flex: 1,
      marginTop: 20,
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
        width: 40,
        height: 40,
    },  
    title: {
        fontFamily: 'BlueHighWay',
        fontSize: 15,
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
        fontFamily: 'BlueHighWayBold',
        fontSize: 13
    },
    text:{
        fontFamily: 'BlueHighWayBold',
        fontSize: 13
    },
    textProductType:{
        fontFamily: 'BlueHighWayBold',
        fontSize: 13,
        marginTop: 10
    },
    textProduct:{
        fontFamily: 'BlueHighWayBold',
        fontSize: 13,
        maxWidth: 120
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
    },
    productNameContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    Oil,
    year,
    car,
    note,
    IDOrder,
    rectifyDisk,
    total,
    phone,
    orderToUpdate,
    products
}) => {

const returnLabelService = productType => {
    switch(productType){
        case "wireset": return 'JUEGO DE CABLES'
        case "coil": return 'BOBINA'
        case "brakeshoeBack": return 'BALATAS TRASERAS'
        case "brakeshoeFront": return 'BALATAS DELANTERAS'
        case "sparkplug": return 'BUJÍAS'
        case "fuelFilter": return 'FILTRO DE GASOLINA'
        case "airFilter": return 'FILTRO DE AIRE'
        case "oilFilter": return 'FILTRO DE ACEITE'
        case "cabineFilter": return 'FILTRO DE CABINA'
        case "oil": return 'ACEITE'
        case "antifreeze": return 'ANTICONGELANTE'
    }
}

const returnHeight = (products, i) => {
    let text = products[i].product.name.replace(/_/g, ' ')
    console.log(21 * (Math.ceil(text.length / 15)))
    return 21 * (Math.ceil(text.length / 15))
}

const returnProducts = productType => {
    let productsRender = []
    productsRender.push(
        <View 
            style={productType != "oil" ? {...styles.productNameContainer, height: 21, marginTop: 10, alignItems: 'flex-end'} : {...styles.productNameContainer, height: 21, marginTop: 10} }
            key={Math.random().toString()}
        >
            <Text style={styles.textProduct}>{returnLabelService(productType)}</Text>
            <Text style={styles.text}></Text>
        </View>
    )
    for(let i=0; i < products.length; i++){
        if(products[i].product.type == productType){  
            productsRender.push(
                <View style={{...styles.productNameContainer, height: returnHeight(products, i)}} key={Math.random().toString()}>
                    <Text style={styles.textProduct}>
                        { products[i].product.name.replace(/_/g, ' ') }
                    </Text>
                    <Text style={styles.text}>{products[i].quantity} x ${Number(products[i].price).toFixed(2)}</Text>
                </View>
            )
        }
    }
    return productsRender
}

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
                {Oil === "Si" && ( returnProducts('oil') )}
                {antifreeze === "Si" && ( returnProducts('antifreeze') )}
                {oilFilter === "Si" && ( returnProducts('oilFilter') )}
                {fuelFilter === "Si" && ( returnProducts('fuelFilter') )}
                {airFilter === "Si" && ( returnProducts('airFilter') )}
                {cabineFilter === "Si" && ( returnProducts('cabineFilter') )}
                {sparkplug === "Si" && ( returnProducts('sparkplug') )}
                {wiresets === "Si" && ( returnProducts('wiresets') )}
                {coil === "Si" && ( returnProducts('coil') )}
                {transmission === "Si" && <Text style={styles.text}>CAMBIO DE ACEITE DE TRANSMISIÓN: {transmission}</Text>}
            </View>                      
            {(rectifyDisk === "Si" || brakeshoeFront == "Si" || brakeshoeBack == "Si") && (
                <View style={styles.section}>
                    <Text style={styles.text}>FRENOS</Text>
                    {brakeshoeFront !== "" && (returnProducts('brakeshoeFront'))}
                    {brakeshoeBack !== "" && (returnProducts('brakeshoeBack'))}
                    {rectifyDisk === "Si" && <Text style={styles.text}>RECTIFICADO DE DISCOS: {rectifyDisk}</Text>}
                </View>
            )}
            <View style={styles.section}>                      
                <Text style={styles.text}>NOTAS: {note}</Text>
                <Text style={styles.text}>TOTAL: ${total}</Text>
                <Text style={styles.text}>TOTAL: {numberToLetter(Number(total), { plural: 'PESOS', singular: 'PESO', centPlural: 'CENTAVOS', centSingular: 'CENTAVO' })}</Text>
            </View>
            <View style={styles.footer}>                      
                <Text style={styles.text}>Av. Mina 1077 Sur Gómez Palacio Dgo.</Text>
                <Text style={styles.text}>Tel. (871) 714 4045</Text>
            </View>
        </Page>
    </Document>
)}




export default React.memo(PDF)
