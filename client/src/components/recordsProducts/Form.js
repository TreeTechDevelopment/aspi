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
                            { value: '5W60', label: '5W60' }, { value: '5W60', label: '5W60' }, { value: '5W60', label: '5W60' },
                            { value: '10W40', label: '10W40' }, { value: '20W60', label: '20W60' }]

    const oilTypeSelect = [{ value: 'Mineral', label: 'Mineral' }, { value: 'Sintetico', label: 'Sintetico' }, { value: 'Semisintético', label: 'Semisintético' }]

    const oilPresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Garrafas 5 litros', label: 'Garrafas 5 litros' },
                                { value: 'Cubetas 19 litros', label: 'Cubetas 19 litros' }, { value: 'Barril 208 litros', label: 'Barril 208 litros' }]
    
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

    const [loading, setLoading] = useState(false)
    const [interfil, setInterfill] = useState('')
    const [price, setPrice] = useState('')
    const [lts, setLts] = useState('')
    
    const [viscosity, setViscosity] = useState(viscositySelect[0])
    const [presentation, setPresentation] = useState(oilPresentationSelect[0])
    const [oilMake, setOilMake] = useState(oilMakeSelect[0])
    const [oilType, setOilType] = useState(oilTypeSelect[0])

    const getArrayProductsRender = product => {

        let newProducts = []
        if(product === "OEM"){ newProducts = [...OEMToRender]} 
        else if( product === "ACD" ){ newProducts = [...ACDToRender] }
        else if( product === "Fram" ){ newProducts = [...FramToRender] }
        else if( product === "Gonher" ){ newProducts = [...GonherToRender] }
        else if( product === "Motorcraft" ){ newProducts = [...MotorcraftToRender] }
        else if( product === "Purolator" ){ newProducts = [...PurolatorToRender] }
        else if( product === "Wix" ){ newProducts = [...WixToRender] }
        else if( product === "Mann" ){ newProducts = [...MannToRender] }
        else if( product === "NGK" ){ newProducts = [...NGKToRender] }
        else if( product === "Champions" ){ newProducts = [...ChampionsToRender] }
        else if( product === "Bosh" ){ newProducts = [...BoshToRender] }
        else if( product === "LS" ){ newProducts = [...LSToRender] }
        else if( product === "Roadstar" ){ newProducts = [...RoadstarToRender] }
        else if( product === "Wagner" ){ newProducts = [...WagnerToRender] }
        return newProducts

    }

    const setArrayProductsRender = (product, newProducts) => {
        if(product === "OEM"){ setOEMToRender(newProducts) } 
        else if( product === "ACD" ){ setACDToRender(newProducts) }
        else if( product === "Fram" ){ setFramToRender(newProducts) }
        else if( product === "Gonher" ){ setGonherToRender(newProducts) }
        else if( product === "Motorcraft" ){ setMotorcraftToRender(newProducts) }
        else if( product === "Purolator" ){ setPurolatorToRender(newProducts) }
        else if( product === "Wix" ){ setWixToRender(newProducts) }
        else if( product === "Mann" ){ setMannToRender(newProducts) }
        else if( product === "NGK" ){ setNGKToRender(newProducts) }
        else if( product === "Champions" ){ setChampionsToRender(newProducts) }
        else if( product === "Bosh" ){ setBoshToRender(newProducts) }
        else if( product === "LS" ){ setLSToRender(newProducts) }
        else if( product === "Roadstar" ){ setRoadstarToRender(newProducts) }
        else if( product === "Wagner" ){ setWagnerToRender(newProducts) }
    }

    const addProducts = product => {
        let newProducts = getArrayProductsRender(product)
        newProducts.push(Math.random().toString())
        setArrayProductsRender(product, newProducts)        
    }

    const removeProducts = product => {
        let newProducts = getArrayProductsRender(product)
        newProducts.splice(-1, 1)
        setArrayProductsRender(product, newProducts)
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
    }

    const setProducts = (value, idx, product) => {
        let newProducts = getArrayProducts(product)
        newProducts[idx] = value
        setArrayProducts(product, newProducts)
    }

    const handleInputInterfill = (e) => setInterfill(e.target.value)

    const saveFilter = () => {
        if(price !== ""){
            setLoading(true)
            let data = {
                interfil, OEM, ACD, Fram, Gonher, Motorcraft,
                Purolator, Wix, Mann, price, product: typeProduct.value,
                NGK, Champions, Bosh, LS, Roadstar, Wagner
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
            if(context.product.price){ setPrice(context.product.price.toString()) }

        }
    }, [context.product])

    const doBeforeCloseModal = () => {
        setPrice('')
        context.dispatchProduct({ type: 'SET', value: {} })
        closeModal()
    }

    const handleInputPrice = e => setPrice(e.target.value.replace(/[^0-9]/g, ''))

    const handleInputLts = e => setLts(e.target.value.replace(/[^0-9]/g, ''))

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue)

    const handleSelectOilType = newValue => setOilType(newValue)
    

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={doBeforeCloseModal}
        >
            <div className="form-car">
                <span>{ filterType.label }</span>
                <div className="input-filters-container">
                    <span>Precio</span>
                    <input 
                        value={price}
                        onChange={handleInputPrice}
                    />
                </div>               
                <div id="input-filters-container-group">
                    { typeProduct.value === 'filter' ? (
                        <>
                        <div className="input-filters-container">
                            <span>interfil</span>
                            <input 
                                value={interfil}
                                onChange={handleInputInterfill}
                            />
                        </div>                        <div className="input-filters-container">
                            <span>OEM</span>
                            {OEMToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="OEM"
                                />
                            ))}
                            <BtnProduct product="OEM" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>ACDelco</span>
                            {ACDToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="ACD"
                                />
                            ))}
                            <BtnProduct product="ACD" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ) : typeProduct.value === "sparkPlug" ? (
                        <>
                        <div className="input-filters-container">
                            <span>NGK</span>
                            {NGKToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="NGK"
                                />
                            ))}
                            <BtnProduct product="NGK" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Champions</span>
                            {ChampionsToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Champions"
                                />
                            ))}
                            <BtnProduct product="Champions" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Bosh</span>
                            {BoshToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Bosh"
                                />
                            ))}
                            <BtnProduct product="Bosh" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ) : typeProduct.value === "brakeShoe" ? (
                        <>
                        <div className="input-filters-container">
                            <span>Wagner</span>
                            {WagnerToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Wagner"
                                />
                            ))}
                            <BtnProduct product="Wagner" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ): typeProduct.value === "wiresets" ? (
                        <>
                        <div className="input-filters-container">
                            <span>Bosh</span>
                            {WagnerToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Bosh"
                                />
                            ))}
                            <BtnProduct product="Bosh" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Lancer & Silverline</span>
                            {LSToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="LS"
                                />
                            ))}
                            <BtnProduct product="LS" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>NGK</span>
                            {NGKToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="NGK"
                                />
                            ))}
                            <BtnProduct product="NGK" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ): (
                        <>  
                        <div className="input-filters-container">
                            <span>Marca</span>
                            <Select 
                                options={oilMakeSelect}
                                value={oilMake}
                                onChange={handleSelectMakeOil}
                            />
                        </div>
                        <div className="input-filters-container">
                            <span>Viscosidad</span>
                            <Select 
                                options={viscositySelect}
                                value={viscosity}
                                onChange={handleSelectViscosity}
                            />
                        </div>
                        <div className="input-filters-container">
                            <span>Presentación</span>
                            <Select 
                                options={oilPresentationSelect}
                                value={presentation}
                                onChange={handleSelectPresentation}
                            />
                        </div>
                        </>
                    )}
                    
                </div>
                <div id="input-filters-container-group">
                { typeProduct.value === 'filter' ? (
                        <>
                        <div className="input-filters-container">
                            <span>Fram</span>
                            {FramToRender.map((key,idx) => (
                                <InputFilter 
                                    idx={idx}
                                    setProducts={setProducts}
                                    key={key}
                                    type="Fram"
                                />
                            ))}
                            <BtnProduct product="Fram" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Gonher</span>
                            {GonherToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Gonher"
                                />
                            ))}
                            <BtnProduct product="Gonher" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Motorcraft</span>
                            {MotorcraftToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Motorcraft"
                                />
                            ))}
                            <BtnProduct product="Motorcraft" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ) : typeProduct.value === "sparkPlug" ? (
                        <>
                        <div className="input-filters-container">
                            <span>Motorcraft</span>
                            {MotorcraftToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Motorcraft"
                                />
                            ))}
                            <BtnProduct product="Motorcraft" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>ACDelco</span>
                            {ACDToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="ACD"
                                />
                            ))}
                            <BtnProduct product="ACD" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ) : typeProduct.value === "wiresets" && (
                        <>
                        <div className="input-filters-container">
                            <span>Roadstar</span>
                            {RoadstarToRender.map((key, idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Roadstar"
                                />
                            ))}
                            <BtnProduct product="Roadstar" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    )}
                </div>
                <div id="input-filters-container-group">
                { typeProduct.value === 'filter' ? (
                        <>
                        <div className="input-filters-container">
                            <span>Purolator</span>
                            {PurolatorToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Purolator"
                                />
                            ))}
                           <BtnProduct product="Purolator" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Wix</span>
                            {WixToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Wix"
                                />
                            ))}
                            <BtnProduct product="Wix" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        <div className="input-filters-container">
                            <span>Mann</span>
                            {MannToRender.map((key,idx) => (
                                <InputFilter 
                                    key={key}
                                    idx={idx}
                                    setProducts={setProducts}
                                    type="Mann"
                                />
                            ))}
                           <BtnProduct product="Mann" addProduct={addProducts} removeProduct={removeProducts}/>
                        </div>
                        </>
                    ): typeProduct.value === "oil" && (
                        <>
                        <div className="input-filters-container">
                            <span>Tipo de aceite</span>
                            <Select 
                                options={oilTypeSelect}
                                value={oilType}
                                onChange={handleSelectOilType}
                            />
                        </div>
                        <div className="input-filters-container">
                            <span>Litros/Galon</span>
                            <input 
                                value={lts}
                                onChange={handleInputLts}
                            />
                        </div>
                        </>
                    )}
                </div>
                <button className="btn btn-primary" onClick={saveFilter}>GUARDAR</button>
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
