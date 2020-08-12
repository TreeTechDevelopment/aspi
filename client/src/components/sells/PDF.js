import React from 'react';
import { Page, Text, View, Document, Image, Font  } from '@react-pdf/renderer';

import { styles } from '../serviceOrder/PDF'
import { url } from '../../../app.json';
import numberToLetter from '../../numberToLetter'

Font.register({ family: 'BlueHighWay', src: `${url}/fonts/blue-highway-rg.ttf` });
Font.register({ family: 'BlueHighWayBold', src: `${url}/fonts/blue-highway-bd.ttf` });

const PDF = ({ 
    date,
    total,
    products
}) => {

    const renderProducts = () => {
        let productsToRender = []
        for(let i = 0; i < products.length; i++){
            productsToRender.push(
                <View style={styles.productNameContainer} key={Math.random().toString()}>
                    <Text style={styles.text}>
                        { 
                            products[i].product.name ? (
                                `${products[i].product.name.split(' ')[0]} ${products[i].product.name.split(' ')[1]} \n ${products[i].product.name.split(' ')[2]} ${products[i].product.name.split(' ')[3]} ${products[i].product.name.split(' ')[4] ? products[i].product.name.split(' ')[4] : ''}`                            ):(
                                products[i].product.interfil ? products[i].product.interfil : products[i].product.NGK ? products[i].product.NGK : products[i].product.Roadstar ? products[i].product.Roadstar : products[i].product.Wagner
                            )
                        }
                    </Text>
                    <Text style={styles.text}>{products[i].quantity} x ${Number(products[i].price).toFixed(2)}</Text>
                </View>
            )
        }
        return productsToRender
    }

return(
    <Document> 
        <Page size={226.77} style={styles.page}>
            <View style={styles.header}>
                <Image source={{ uri: `${url}/images/logo.png`, method: 'GET', headers: {}, body: '' }} style={styles.logo}/>
                <Text style={styles.title}>Tornillos y lubricantes</Text>
            </View>
            <View style={styles.idContainer}>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>FECHA: {date}</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.productNameContainer}>
                    <Text style={styles.text}>PRODUCTO</Text>
                    <Text style={styles.text}>CANTIDAD</Text>
                </View> 
                {renderProducts()}
            </View>                      
            <View style={styles.section}>
                <Text style={styles.text}>TOTAL: ${Number(total).toFixed(2)}</Text>
                <Text style={styles.text}>TOTAL: {numberToLetter(Number(total), { plural: 'PESOS', singular: 'PESO', centPlural: 'CENTAVOS', centSingular: 'CENTAVO' })}</Text>
            </View>
            <View style={styles.footer}>                      
                <Text style={styles.text}>Av. Mina 1077 Sur Gómez Palacio Dgo.</Text>
                <Text style={styles.text}>Tel. (871) 714 4045</Text>
            </View>
        </Page>
    </Document>
)}


export default PDF
