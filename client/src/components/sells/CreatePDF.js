import React, { useRef, useCallback, useContext } from 'react'
import { BlobProvider } from '@react-pdf/renderer';

import PDF from './PDF';
import { appContext } from '../../context/Provider'

function CreatePDF() {

    const context = useContext(appContext)

    function useHookWithRefCallback() {
        const ref = useRef(null)
        const setRef = useCallback(node => {          
            if (node) {
                node.click()
                context.dispatchProductsPrice({ type: 'SET', value: [] })
                window.location.reload()
            }            
            ref.current = node
        }, [])
        
        return [setRef]
    }

    const [aRef] = useHookWithRefCallback(); 

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

    const getTotal = () => {
        let total = 0
        for(let i=0; i < context.productsPrice.length; i++){
            total += context.productsPrice[i].price * context.productsPrice[i].quantity
        }
        return total
    }

    return (
        <BlobProvider 
            document={
                <PDF                      
                    date={returnDate()}
                    total={getTotal()}
                    products={context.productsPrice}
                />
            }             
        >
            {({ blob, url, loading, error }) =>{

                return(
                    !loading ? (
                        <a 
                            href={url} 
                            download={`Venta ${returnDate()} ${returnTime()}.pdf`} 
                            className="hidden-atag"
                            id="atag1"
                            ref={aRef}
                        ></a>
                    ): ( <></> )
                )
            }}
        </BlobProvider>
    )
}

export default CreatePDF
