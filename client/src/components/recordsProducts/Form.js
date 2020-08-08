import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Loader from 'react-loader-spinner';
import Select from 'react-select';

import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'
import InputFilter from './InputProduct'
import BtnProduct from './BtnProduct'

function Form({ modalIsOpen, closeModal, filterType, addNewProduct, setProduct, typeProduct }) {
    
    const viscositySelect = [{ value: '5W30', label: '5W30' }, { value: '5W20', label: '5W20' }, { value: '5W40', label: '5W40' }, 
                            { value: '10W30', label: '10W30' }, { value: '15W40', label: '15W40' }, { value: '20W50', label: '20W50' },
                            { value: '25W50', label: '25W50' }, { value: '25W60', label: '25W60' }, { value: '0W20', label: '0W20' },
                            { value: '0W40', label: '0W40' }, { value: '5W50', label: '5W50' }, { value: '5W60', label: '5W60' },
                            { value: '10W40', label: '10W40' }, { value: '20W60', label: '20W60' }]

    const oilTypeSelect = [{ value: 'Mineral', label: 'Mineral' }, { value: 'Sintetico', label: 'Sintetico' }, { value: 'Semisintético', label: 'Semisintético' }]

    const oilPresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Garrafas 5 litros', label: 'Garrafas 5 litros' }, { value: 'Garrafas 4 litros', label: 'Garrafas 4 litros' },
                                { value: 'Cubetas 19 litros', label: 'Cubetas 19 litros' }, { value: 'Barril 208 litros', label: 'Barril 208 litros' }, { value: 'Suelto', label: 'Suelto' }]
    
    const oilMakeSelect = [{ value: 'Shell', label: 'Shell' }, { value: 'Quaker State', label: 'Quaker State' }, { value: 'Roshfrans', label: 'Roshfrans' }, { value: 'LTH', label: 'LTH' },
                        { value: 'ACDelco', label: 'ACDelco' }, { value: 'Mopar', label: 'Mopar' }, { value: 'Castrol', label: 'Castrol' }, { value: 'Nissan', label: 'Nissan' }, 
                        { value: 'Phillips 66', label: 'Phillips 66' }, { value: 'Repsol', label: 'Repsol' }, { value: 'Mexlub', label: 'Mexlub' }, { value: 'Pemex', label: 'Pemex' }, 
                        { value: 'HM9', label: 'HM9' }, { value: 'Chevron', label: 'Chevron' }, { value: 'Presson', label: 'Presson' }, { value: 'Akron', label: 'Akron' },
                        { value: 'Bardahl', label: 'Bardahl' }]

    const context = useContext(appContext)
    
    const [OEMToRender, setOEMToRender] = useState([Math.random().toString()])
    const [ACDToRender, setACDToRender] = useState([Math.random().toString()])
    const [FramToRender, setFramToRender] = useState([Math.random().toString()])
    const [GonherToRender, setGonherToRender] = useState([Math.random().toString()])
    const [MotorcraftToRender, setMotorcraftToRender] = useState([Math.random().toString()])
    const [PurolatorToRender, setPurolatorToRender] = useState([Math.random().toString()])
    const [WixToRender, setWixToRender] = useState([Math.random().toString()])
    const [MannToRender, setMannToRender] = useState([Math.random().toString()])
    const [NGKToRender, setNGKToRender] = useState([Math.random().toString()])
    const [ChampionsToRender, setChampionsToRender] = useState([Math.random().toString()])
    const [BoshToRender, setBoshToRender] = useState([Math.random().toString()])
    const [LSToRender, setLSToRender] = useState([Math.random().toString()])
    const [RoadstarToRender, setRoadstarToRender] = useState([Math.random().toString()])
    const [SkyToRender, setSkyToRender] = useState([Math.random().toString()])
    const [SeinecaToRender, setSeinecaToRender] = useState([Math.random().toString()])
    const [WalmiToRender, setWalmiToRender] = useState([Math.random().toString()])
    const [JoeToRender, setJoeToRender] = useState([Math.random().toString()])
    const [ECAToRender, setECAToRender] = useState([Math.random().toString()])
    const [WagnerToRender, setWagnerToRender] = useState([Math.random().toString()])

    const [OEM, setOEM] = useState([])
    const [ACD, setACD] = useState([])
    const [Fram, setFram] = useState([])
    const [Gonher, setGonher] = useState([])
    const [Motorcraft, setMotorcraft] = useState([])
    const [Purolator, setPurolator] = useState([])
    const [Wix, setWix] = useState([])
    const [Mann, setMann] = useState([])
    const [NGK, setNGK] = useState([])
    const [Champions, setChampions] = useState([])
    const [Bosh, setBosh] = useState([])
    const [LS, setLS] = useState([])
    const [Roadstar, setRoadstar] = useState([])
    const [Wagner, setWagner] = useState([])
    const [Sky, setSky] = useState([])
    const [Seineca, setSeineca] = useState([])
    const [Walmi, setWalmi] = useState([])
    const [Joe, setJoe] = useState([])
    const [ECA, setECA] = useState([])

    const [loading, setLoading] = useState(false)
    const [interfil, setInterfill] = useState('')
    const [price, setPrice] = useState('')
    const [oilName, setOilName] = useState('')
    
    const [viscosity, setViscosity] = useState(viscositySelect[0])
    const [presentation, setPresentation] = useState(oilPresentationSelect[0])
    const [oilMake, setOilMake] = useState(oilMakeSelect[0])
    const [oilType, setOilType] = useState(oilTypeSelect[0])

    const getArrayProductsRender = product => {

        let newProducts = {}
        if(product === "OEM"){ newProducts = {productsRender: [...OEMToRender], products: [...OEM]} } 
        else if( product === "ACD" ){ newProducts = {productsRender: [...ACDToRender], products: [...ACD]} }
        else if( product === "Fram" ){ newProducts = {productsRender: [...FramToRender], products: [...Fram]} }
        else if( product === "Gonher" ){ newProducts = {productsRender: [...GonherToRender], products: [...Gonher]} }
        else if( product === "Motorcraft" ){ newProducts = {productsRender: [...MotorcraftToRender], products: [...Motorcraft]} }
        else if( product === "Purolator" ){ newProducts = {productsRender: [...PurolatorToRender], products: [...Purolator]} }
        else if( product === "Wix" ){ newProducts = {productsRender: [...WixToRender], products: [...Wix]} }
        else if( product === "Mann" ){ newProducts = {productsRender: [...MannToRender], products: [...Mann]} }
        else if( product === "NGK" ){ newProducts = {productsRender: [...NGKToRender], products: [...NGK]} }
        else if( product === "Champions" ){ newProducts = {productsRender: [...ChampionsToRender], products: [...Champions]} }
        else if( product === "Bosh" ){ newProducts = {productsRender: [...BoshToRender], products: [...Bosh]} }
        else if( product === "LS" ){ newProducts = {productsRender: [...LSToRender], products: [...LS]} }
        else if( product === "Roadstar" ){ newProducts = {productsRender: [...RoadstarToRender], products: [...Roadstar]}}
        else if( product === "Wagner" ){ newProducts = {productsRender: [...WagnerToRender], products: [...Wagner]}}
        else if( product === "Sky" ){ newProducts = {productsRender: [...SkyToRender], products: [...Sky]}}
        else if( product === "Seineca" ){ newProducts = {productsRender: [...SeinecaToRender], products: [...Seineca]}}
        else if( product === "Walmi" ){ newProducts = {productsRender: [...WalmiToRender], products: [...Walmi]}}
        else if( product === "Joe" ){ newProducts = {productsRender: [...JoeToRender], products: [...Joe]}}
        else if( product === "ECA" ){ newProducts = {productsRender: [...ECAToRender], products: [...ECA]}}
        return newProducts

    }

    const setArrayProductsRender = (product, newProducts, products) => {
        if(product === "OEM"){ 
            setOEMToRender(newProducts) 
            if(products){ setOEM(products) }
        }else if( product === "ACD" ){ 
            setACDToRender(newProducts) 
            if(products){ setACD(products) }
        }else if( product === "Fram" ){ 
            setFramToRender(newProducts) 
            if(products){ setFram(products) }
        }else if( product === "Gonher" ){ 
            setGonherToRender(newProducts) 
            if(products){ setGonher(products) }
        }else if( product === "Motorcraft" ){ 
            setMotorcraftToRender(newProducts) 
            if(products){ setMotorcraft(products) }
        }else if( product === "Purolator" ){ 
            setPurolatorToRender(newProducts) 
            if(products){ setPurolator(products) }
        }else if( product === "Wix" ){ 
            setWixToRender(newProducts) 
            if(products){ setWix(products) }
        }else if( product === "Mann" ){ 
            setMannToRender(newProducts) 
            if(products){ setMann(products) }
        }else if( product === "NGK" ){ 
            setNGKToRender(newProducts) 
            if(products){ setNGK(products) }
        }else if( product === "Champions" ){ 
            setChampionsToRender(newProducts) 
            if(products){ setChampions(products) }
        }else if( product === "Bosh" ){ 
            setBoshToRender(newProducts) 
            if(products){ setBosh(products) }
        }else if( product === "LS" ){ 
            setLSToRender(newProducts) 
            if(products){ setLS(products) }
        }else if( product === "Roadstar" ){ 
            setRoadstarToRender(newProducts) 
            if(products){ setRoadstar(products) }
        }else if( product === "Wagner" ){ 
            setWagnerToRender(newProducts) 
            if(products){ setWagner(products) }
        }else if( product === "Sky" ){ 
            setSkyToRender(newProducts) 
            if(products){ setSky(products) }
        }else if( product === "Seineca" ){ 
            setSeinecaToRender(newProducts) 
            if(products){ setSeineca(products) }
        }else if( product === "Walmi" ){ 
            setWalmiToRender(newProducts) 
            if(products){ setWalmi(products) }
        }else if( product === "Joe" ){ 
            setJoeToRender(newProducts) 
            if(products){ setJoe(products) }
        }else if( product === "ECA" ){ 
            setECAToRender(newProducts) 
            if(products){ setECA(products) }
        }
    }

    const addProducts = product => {
        let { productsRender } = getArrayProductsRender(product)
        productsRender.push(Math.random().toString())
        setArrayProductsRender(product, productsRender)        
    }

    const removeProducts = product => {
        let { productsRender, products } = getArrayProductsRender(product)
        productsRender.splice(-1, 1)
        products.splice(-1, 1)
        setArrayProductsRender(product, productsRender, products)
    }

    const getArrayProducts = (product) => {
        let newProducts = []
        if(product === "OEM"){ newProducts = [...OEM]} 
        else if( product === "ACD" ){ newProducts = [...ACD] }
        else if( product === "Fram" ){ newProducts = [...Fram] }
        else if( product === "Gonher" ){ newProducts = [...Gonher] }
        else if( product === "Motorcraft" ){ newProducts = [...Motorcraft] }
        else if( product === "Purolator" ){ newProducts = [...Purolator] }
        else if( product === "Wix" ){ newProducts = [...Wix] }
        else if( product === "Mann" ){ newProducts = [...Mann] }
        else if( product === "NGK" ){ newProducts = [...NGK] }
        else if( product === "Champions" ){ newProducts = [...Champions] }
        else if( product === "Bosh" ){ newProducts = [...Bosh] }
        else if( product === "LS" ){ newProducts = [...LS] }
        else if( product === "Roadstar" ){ newProducts = [...Roadstar] }
        else if( product === "Wagner" ){ newProducts = [...Wagner] }
        else if( product === "Sky" ){ newProducts = [...Sky] }
        else if( product === "Seineca" ){ newProducts = [...Seineca] }
        else if( product === "Walmi" ){ newProducts = [...Walmi] }
        else if( product === "Joe" ){ newProducts = [...Joe] }
        else if( product === "ECA" ){ newProducts = [...ECA] }
        return newProducts
    }

    const setArrayProducts = (product, newProducts) => {
        if(product === "OEM"){ setOEM(newProducts) } 
        else if( product === "ACD" ){ setACD(newProducts) }
        else if( product === "Fram" ){ setFram(newProducts) }
        else if( product === "Gonher" ){ setGonher(newProducts) }
        else if( product === "Motorcraft" ){ setMotorcraft(newProducts) }
        else if( product === "Purolator" ){ setPurolator(newProducts) }
        else if( product === "Wix" ){ setWix(newProducts) }
        else if( product === "Mann" ){ setMann(newProducts) }
        else if( product === "NGK" ){ setNGK(newProducts) }
        else if( product === "Champions" ){ setChampions(newProducts) }
        else if( product === "Bosh" ){ setBosh(newProducts) }
        else if( product === "LS" ){ setLS(newProducts) }
        else if( product === "Roadstar" ){ setRoadstar(newProducts) }
        else if( product === "Wagner" ){ setWagner(newProducts) }
        else if( product === "Sky" ){ setSky(newProducts) }
        else if( product === "Seineca" ){ setSeineca(newProducts) }
        else if( product === "Walmi" ){ setWalmi(newProducts) }
        else if( product === "Joe" ){ setJoe(newProducts) }
        else if( product === "ECA" ){ setECA(newProducts) }
    }

    const setProducts = (value, idx, product) => {
        let newProducts = getArrayProducts(product)
        newProducts[idx] = value
        setArrayProducts(product, newProducts)
    }

    const handleInputInterfill = (e) => setInterfill(e.target.value)

    const handleInputOilName = (e) => setOilName(e.target.value)

    const saveFilter = () => {
        if(price !== ""){
            setLoading(true)
            let data = {
                interfil, OEM, ACD, Fram, Gonher, Motorcraft,
                Purolator, Wix, Mann, price, product: typeProduct.value,
                NGK, Champions, Bosh, LS, Roadstar, Wagner, oilMake: oilMake.value,
                presentation: presentation.value, viscosity: viscosity.value,
                oilType: oilType.value, filterType:filterType.value,
                Sky, Seineca, Walmi, Joe, ECA, name: oilName
            }
            if(JSON.stringify(context.product) !== "{}") {
                data.id = context.product._id
                updateProduct(data).then(({newProduct}) => {
                    setLoading(false)
                    setProduct(newProduct)
                    doBeforeCloseModal()
                }).catch((e) => {
                    console.log(e)
                    setLoading(false)
                    alert(`${messageServerError}`)
                })
            }else{
                createProduct(data).then(({newProduct}) => {
                    setLoading(false)
                    addNewProduct(newProduct)
                    doBeforeCloseModal()
                }).catch(() => {
                    setLoading(false)
                    alert(`${messageServerError}`)
                })
            }
        }else{ alert('El campo precio es necesario') }
    }

    const createProduct = async (data) => {
        const res = await axios({ 
            url: `${url}/products/`,
            method: 'POST',
            timeout: 5000,
            data
        })

        return res.data
    }

    const updateProduct = async (data) => {
        const res = await axios({
            url: `${url}/products/`,
            method: 'PUT',
            timeout: 5000,
            data
        })

        return res.data
    }

    useEffect(() => {
        if( JSON.stringify(context.product) !== "{}"){
            console.log(context.product)
            if(context.product.interfil){ setInterfill(context.product.interfil) }
            if(context.product.OEM){ 
                setOEM(context.product.OEM) 
                let newOEMFilters = []
                for(let i = 0; i < context.product.OEM.length; i++){ newOEMFilters.push(Math.random().toString()) }
                setOEMToRender(newOEMFilters)
            }
            if(context.product.ACD){ 
                setACD(context.product.ACD) 
                let newACDFilters = []
                for(let i = 0; i < context.product.ACD.length; i++){ newACDFilters.push(Math.random().toString()) }
                setACDToRender(newACDFilters)
            }
            if(context.product.Fram){ 
                setFram(context.product.Fram) 
                let newFramFilters = []
                for(let i = 0; i < context.product.Fram.length; i++){ newFramFilters.push(Math.random().toString()) }
                setFramToRender(newFramFilters)
            }
            if(context.product.Gonher){ 
                setGonher(context.product.Gonher) 
                let newGonherFilters = []
                for(let i = 0; i < context.product.Gonher.length; i++){ newGonherFilters.push(Math.random().toString()) }
                setGonherToRender(newGonherFilters)
            }
            if(context.product.Motorcraft){ 
                setMotorcraft(context.product.Motorcraft) 
                let newMotorcraftFilters = []
                for(let i = 0; i < context.product.Motorcraft.length; i++){ newMotorcraftFilters.push(Math.random().toString()) }
                setMotorcraftToRender(newMotorcraftFilters)
            }
            if(context.product.Purolator){ 
                setPurolator(context.product.Purolator) 
                let newPurolatorFilters = []
                for(let i = 0; i < context.product.Purolator.length; i++){ newPurolatorFilters.push(Math.random().toString()) }
                setPurolatorToRender(newPurolatorFilters)
            }
            if(context.product.Wix){ 
                setWix(context.product.Wix) 
                let newWixFilters = []
                for(let i = 0; i < context.product.Wix.length; i++){ newWixFilters.push(Math.random().toString()) }
                setWixToRender(newWixFilters)
            }
            if(context.product.Mann){ 
                setMann(context.product.Mann) 
                let newMannFilters = []
                for(let i = 0; i < context.product.Mann.length; i++){ newMannFilters.push(Math.random().toString()) }
                setMannToRender(newMannFilters)
            }
            if(context.product.NGK){ 
                setNGK(context.product.NGK) 
                let newNGKFilters = []
                for(let i = 0; i < context.product.NGK.length; i++){ newNGKFilters.push(Math.random().toString()) }
                setNGKToRender(newNGKFilters)
            }
            if(context.product.Champions){ 
                setChampions(context.product.Champions) 
                let newChampionsFilters = []
                for(let i = 0; i < context.product.Champions.length; i++){ newChampionsFilters.push(Math.random().toString()) }
                setChampionsToRender(newChampionsFilters)
            }
            if(context.product.Bosh){ 
                setBosh(context.product.Bosh) 
                let newBoshFilters = []
                for(let i = 0; i < context.product.Bosh.length; i++){ newBoshFilters.push(Math.random().toString()) }
                setBoshToRender(newBoshFilters)
            }
            if(context.product.LS){ 
                setLS(context.product.LS) 
                let newLSFilters = []
                for(let i = 0; i < context.product.LS.length; i++){ newLSFilters.push(Math.random().toString()) }
                setLSToRender(newLSFilters)
            }
            if(context.product.Roadstar){ 
                setRoadstar(context.product.Roadstar) 
                let newRoadstarFilters = []
                for(let i = 0; i < context.product.Roadstar.length; i++){ newRoadstarFilters.push(Math.random().toString()) }
                setRoadstarToRender(newRoadstarFilters)
            }
            if(context.product.Wagner){ 
                setWagner(context.product.Wagner) 
                let newWagnerFilters = []
                for(let i = 0; i < context.product.Wagner.length; i++){ newWagnerFilters.push(Math.random().toString()) }
                setWagnerToRender(newWagnerFilters)
            }
            if(context.product.Sky){ 
                setSky(context.product.Sky) 
                let newSkyFilters = []
                for(let i = 0; i < context.product.Sky.length; i++){ newSkyFilters.push(Math.random().toString()) }
                setSkyToRender(newSkyFilters)
            }
            if(context.product.Seineca){ 
                setSeineca(context.product.Seineca) 
                let newSeinecaFilters = []
                for(let i = 0; i < context.product.Seineca.length; i++){ newSeinecaFilters.push(Math.random().toString()) }
                setSeinecaToRender(newSeinecaFilters)
            }
            if(context.product.Walmi){ 
                setWalmi(context.product.Walmi) 
                let newWalmiFilters = []
                for(let i = 0; i < context.product.Walmi.length; i++){ newWalmiFilters.push(Math.random().toString()) }
                setWalmiToRender(newWalmiFilters)
            }
            if(context.product.Joe){ 
                setJoe(context.product.Joe) 
                let newJoeFilters = []
                for(let i = 0; i < context.product.Joe.length; i++){ newJoeFilters.push(Math.random().toString()) }
                setJoeToRender(newJoeFilters)
            }
            if(context.product.ECA){ 
                setECA(context.product.ECA) 
                let newECAFilters = []
                for(let i = 0; i < context.product.ECA.length; i++){ newECAFilters.push(Math.random().toString()) }
                setECAToRender(newECAFilters)
            }
            if(context.product.viscosity){ setViscosity({ value: context.product.viscosity, label: context.product.viscosity }) }
            if(context.product.oilMake){ setOilMake({ value: context.product.oilMake, label: context.product.oilMake }) }
            if(context.product.oilType){ setOilType({ value: context.product.oilType, label: context.product.oilType }) }
            if(context.product.presentation){ setOilType({ value: context.product.presentation, label: context.product.presentation }) }
            if(context.product.price){ setPrice(context.product.price.toString()) }

        }
    }, [context.product])

    const doBeforeCloseModal = () => {
        setPrice('')
        context.dispatchProduct({ type: 'SET', value: {} })
        resetForm()
        closeModal()
    }

    const resetForm = () => {
        setOEM([])
        setACD([])
        setFram([])
        setGonher([])
        setMotorcraft([])
        setPurolator([])
        setWix([])
        setMann([])
        setNGK([])
        setChampions([])
        setBosh([])
        setLS([])
        setRoadstar([])
        setWagner([])
        setSky([])
        setSeineca([])
        setWalmi([])
        setJoe([])
        setECA([])
        setOEMToRender([Math.random().toString()])
        setACDToRender([Math.random().toString()])
        setFramToRender([Math.random().toString()])
        setGonherToRender([Math.random().toString()])
        setMotorcraftToRender([Math.random().toString()])
        setPurolatorToRender([Math.random().toString()])
        setWixToRender([Math.random().toString()])
        setMannToRender([Math.random().toString()])
        setNGKToRender([Math.random().toString()])
        setChampionsToRender([Math.random().toString()])
        setBoshToRender([Math.random().toString()])
        setLSToRender([Math.random().toString()])
        setRoadstarToRender([Math.random().toString()])
        setWagnerToRender([Math.random().toString()])
        setSkyToRender([Math.random().toString()])
        setSeinecaToRender([Math.random().toString()])
        setWagnerToRender([Math.random().toString()])
        setJoeToRender([Math.random().toString()])
        setECAToRender([Math.random().toString()])
        setInterfill('')
        setPrice('')
        setOilName('')
        setViscosity(viscositySelect[0])
        setPresentation(oilPresentationSelect[0])
        setOilMake(oilMakeSelect[0])
        setOilType(oilTypeSelect[0])
    }

    const handleInputPrice = e => setPrice(e.target.value.replace(/[^0-9]/g, ''))

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue) 

    const handleSelectOilType = newValue => setOilType(newValue)

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={doBeforeCloseModal}
            style={{
                content: {
                    width: '70%',
                    height: (typeProduct.value === "filter" ?  '95%' :(typeProduct.value === "oil" ? '75%' : '55%' )),
                    top: (typeProduct.value === "filter" ?  '2%' :(typeProduct.value === "oil" ? '15%' :'30%')),
                    left: '15%'

                }
            }}
        >
            
            <div className="form-car">
                <h3>{ typeProduct.value === "filter" ?  filterType.label : typeProduct.label}</h3>
                <div>
                    <span className="span-only">{ presentation.value === "Suelto" ? 'Precio por litro' : 'Precio' }</span>
                    <div className="si-filter-container">
                    <div className="si-filter-price">

                    <input 
                        value={price}
                        onChange={handleInputPrice}
                        className="input-price"
                        />
                    </div>
                </div>
                
                {typeProduct.value === "oil" && (
                    <div className="input-container">
                        <span className="span-filter">NOMBRE</span>
                        <div className="si-filter-container">
                            <div className="si-filter-price">
                                <input 
                                    value={oilName}
                                    onChange={handleInputOilName}
                                    className="input-price"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className="RGB">
                
                    </div>   
                </div>               
                <div className="input-filters-container-group">
                    { typeProduct.value === 'filter' ? (
                        <>

                        <div className="input-filters-container-products">
                            <div className="input-container padding-right">

                            <span className="span-filter">Interfil</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            <input 
                                value={interfil}
                                onChange={handleInputInterfill}
                                
                                />
                        
                                </div>
                            </div>
                        </div>                        <div className="input-container">
                            <span className="span-filter">OEM</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {OEMToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="OEM"
                                />
                                ))}
                            </div>
                            <BtnProduct product="OEM" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">ACDelco</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {ACDToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="ACD"
                                
                                />
                                ))}
                            </div>
                            <BtnProduct product="ACD" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                    </div>
                        </>
                    ) : typeProduct.value === "sparkPlug" ? (
                        <>
                        <div className="input-container">
                            <span className="span-filter">NGK</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {NGKToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="NGK"
                                />
                                ))}
                                </div>
                            <BtnProduct product="NGK" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">Champions</span>
                            <div className="si-filter-container">
                            <div className="si-filter">
                            {ChampionsToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Champions"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Champions" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        
                        <div className="input-container">
                            <span className="span-filter">Bosh</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {BoshToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Bosh"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Bosh" addProduct={addProducts} removeProduct={removeProducts}/>
                                    </div>
                        </div>
                        </>
                    ) : typeProduct.value === "brakeShoe" ? (
                        <>
                        <div className="input-container">
                            <span className="span-filter">Wagner</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {WagnerToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Wagner"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Wagner" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        </>
                    ): typeProduct.value === "wiresets" ? (
                        <>
                        
                        <div className="input-container">
                            <span className="span-filter">Bosh</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {WagnerToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Bosh"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Bosh" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">Lancer & Silverline</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {LSToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="LS"
                                />
                                ))}
                                </div>
                            <BtnProduct product="LS" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">NGK</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {NGKToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="NGK"
                                />
                                ))}
                                </div>
                            <BtnProduct product="NGK" addProduct={addProducts} removeProduct={removeProducts}/>
                                    </div>
                        </div>
                        </>
                    ): (
                        <>  
                        <div className="input-container">
                            <span className="span-filter">Marca</span>
                            
                            
                            <Select 
                                options={oilMakeSelect}
                                value={oilMake}
                                onChange={handleSelectMakeOil}
                                className="select-oil"
                            />
                            
                            
                        </div>
                        <div className="input-container">
                            <span className="span-filter">Tipo de aceite</span>
                            
                            <Select 
                                options={oilTypeSelect}
                                value={oilType}
                                onChange={handleSelectOilType}
                                className="select-car-records"
                                />
                                
                        </div>
                        <div className="input-container">
                            <span className="span-filter">Presentación</span>
                            
                            <Select 
                                options={oilPresentationSelect}
                                value={presentation}
                                onChange={handleSelectPresentation}
                                className="select-car-records"
                            />
                        
                        </div>
                        </>
                    )}
                    
                </div>
                <div className="input-filters-container-group">
                { typeProduct.value === 'filter' ? (
                        <>
                        <div className="input-filters-container-products">
                        <div className="input-container">

                            <span className="span-filter">Fram</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {FramToRender.map((key,idx) => (
                                <InputFilter 
                                idx={idx}
                                setProducts={setProducts}
                                key={key}
                                type="Fram"
                                />
                                ))}
                            </div>
                            <BtnProduct product="Fram" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                        <div className="input-container">

                            <span className="span-filter">Gonher</span>
                            <div className="si-filter-container">
                            <div className="si-filter">
                            {GonherToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Gonher"
                                />
                                ))}
                            </div>  
                            <BtnProduct product="Gonher" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                    </div>
                        <div className="input-container">
                            <span className="span-filter">Motorcraft</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {MotorcraftToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Motorcraft"
                                />
                                ))}
                            </div>
                            <BtnProduct product="Motorcraft" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                    </div>
                        </>
                    ) : typeProduct.value === "sparkPlug" ? (
                        <>
                        <div className="input-container">
                            <span className="span-filter">Motorcraft</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {MotorcraftToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Motorcraft"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Motorcraft" addProduct={addProducts} removeProduct={removeProducts}/>
                                    </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">ACDelco</span>
                            <div className="si-filter-container">
                            <div className="si-filter">
                            {ACDToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="ACD"
                                />
                                ))}
                                </div>
                            <BtnProduct product="ACD" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        </>
                    ) : typeProduct.value === "wiresets" && (
                        <>
                        <div className="input-container">

                            <span className="span-filter">Roadstar</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {RoadstarToRender.map((key, idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Roadstar"
                                />
                                ))}
                                </div>
                            <BtnProduct product="Roadstar" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                        </div>
                        </>
                    )}
                </div>
                { typeProduct.value === 'filter' ? (
                        <div className="input-filters-container-group">
                        <div className="input-filters-container-products">
                        <div className="input-container">

                            <span className="span-filter">Purolator</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {PurolatorToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Purolator"
                                />
                                ))}
                                </div>
                           <BtnProduct product="Purolator" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                            </div>
                        <div className="input-container">
                            <span className="span-filter">Wix</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {WixToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Wix"
                                />
                                ))}
                            </div>
                            <BtnProduct product="Wix" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                        <div className="input-container">
                            <span className="span-filter">Mann</span>
                            <div className="si-filter-container">
                            <div className="si-filter">

                            {MannToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Mann"
                                />
                                ))}
                            </div>
                           <BtnProduct product="Mann" addProduct={addProducts} removeProduct={removeProducts}/>
                            </div>
                        </div>
                    </div>
                    </div>
                    ): typeProduct.value === "oil" && (
                        <div className="input-filters-container-group">
                            <div className="input-container">
                                <span className="span-filter">Viscosidad</span>
                                
                                <Select 
                                    options={viscositySelect}
                                    value={viscosity}
                                    onChange={handleSelectViscosity}
                                    className="select-car-records"
                                />
                                
                            </div>
                        </div>
                    )}
                {typeProduct.value === 'filter' && (
                    <div className="input-filters-container-group">
                     <div className="input-filters-container-products">
                        <div className="input-container">
                            <span className="span-filter">Sky</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {SkyToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Sky"
                                />
                                ))}
                                </div>
                        <BtnProduct product="Sky" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                            </div>
                             <div className="input-container">
                                 <span className="span-filter">Seineca</span>
                                 <div className="si-filter-container">
                                 <div className="si-filter">
     
     
                                 {SeinecaToRender.map((key,idx) => (
                                     <InputFilter 
                                     key={key}
                                     idx={idx}
                                     setProducts={setProducts}
                                     type="Seineca"
                                     />
                                     ))}
                                 </div>
                                 <BtnProduct product="Seineca" addProduct={addProducts} removeProduct={removeProducts}/>
                                 </div>
                             </div>
                             <div className="input-container">
                                 <span className="span-filter">Walmi</span>
                                 <div className="si-filter-container">
                                 <div className="si-filter">
     
                                 {WalmiToRender.map((key,idx) => (
                                     <InputFilter 
                                     key={key}
                                     idx={idx}
                                     setProducts={setProducts}
                                     type="Walmi"
                                     />
                                     ))}
                                 </div>
                                <BtnProduct product="Walmi" addProduct={addProducts} removeProduct={removeProducts}/>
                                 </div>
                             </div>
                         </div>
                    </div>
                )}
                {typeProduct.value === 'filter' && (
                    <div className="input-filters-container-group">
                     <div className="input-filters-container-products">
                        <div className="input-container">
                            <span className="span-filter">Joe</span>
                            <div className="si-filter-container">
                            <div className="si-filter">


                            {JoeToRender.map((key,idx) => (
                                <InputFilter 
                                key={key}
                                idx={idx}
                                setProducts={setProducts}
                                type="Joe"
                                />
                                ))}
                                </div>
                        <BtnProduct product="Joe" addProduct={addProducts} removeProduct={removeProducts}/>
                                </div>
                            </div>
                             <div className="input-container">
                                 <span className="span-filter">Roadstar</span>
                                 <div className="si-filter-container">
                                 <div className="si-filter">
     
     
                                 {RoadstarToRender.map((key,idx) => (
                                     <InputFilter 
                                     key={key}
                                     idx={idx}
                                     setProducts={setProducts}
                                     type="Seineca"
                                     />
                                     ))}
                                 </div>
                                 <BtnProduct product="Roadstar" addProduct={addProducts} removeProduct={removeProducts}/>
                                 </div>
                             </div>
                             <div className="input-container">
                                 <span className="span-filter">ECA</span>
                                 <div className="si-filter-container">
                                 <div className="si-filter">
     
                                 {ECAToRender.map((key,idx) => (
                                     <InputFilter 
                                     key={key}
                                     idx={idx}
                                     setProducts={setProducts}
                                     type="ECA"
                                     />
                                     ))}
                                 </div>
                                <BtnProduct product="ECA" addProduct={addProducts} removeProduct={removeProducts}/>
                                 </div>
                             </div>
                         </div>
                    </div>
                )}
                <div className="btn-guardar">

                <button className="btn-aspi" onClick={saveFilter}>GUARDAR</button>
                </div>
                {loading && (
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={50}
                        width={50}
                    />
                )}
            </div>
        </Modal>
    )
}

export default Form
