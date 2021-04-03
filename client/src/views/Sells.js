import React, { useState, useEffect, useContext} from 'react'
import Select from "react-select";

import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import Searcher from '../components/sells/Searcher';
import ShopList from '../components/sells/ShopList';
import FilterProducts from '../components/recordsProducts/FilterProducts';
import SparkPlugProducts from '../components/recordsProducts/SparkPlugProducts';
import WiresetsProducts from '../components/recordsProducts/WiresetsProducts';
import BrakeshoeProducts from '../components/recordsProducts/BrakeshoeProducts';
import CoilProducts from '../components/recordsProducts/CoilProducts';
import { appContext } from '../context/Provider';
import { url } from '../../app.json'

function Sells() {

    const viscositySelect = [{ value: '5W30', label: '5W30' }, { value: '5W20', label: '5W20' }, { value: '5W40', label: '5W40' }, 
                            { value: '10W30', label: '10W30' }, { value: '15W40', label: '15W40' }, { value: '20W50', label: '20W50' },
                            { value: '25W50', label: '25W50' }, { value: '25W60', label: '25W60' }, { value: '0W20', label: '0W20' },
                            { value: '0W40', label: '0W40' }, { value: '5W50', label: '5W50' }, { value: '5W60', label: '5W60' },
                            { value: '10W40', label: '10W40' }, { value: '20W60', label: '20W60' }, { value: '80W90', label: '80W90' }, 
                            { value: '85W140', label: '85W140' }, { value: '140', label: '140' }, { value: '190', label: '190' },
                            { value: '250', label: '250' }, { value: '50', label: '50' },{ value: '40', label: '40' },{ value: 'H300', label: 'H300' },
                            { value: '68', label: '68' },{ value: '303', label: '303' },{ value: '90', label: '90' },{ value: '75W140', label: '75W140' },
                            { value: '75W90', label: '75W90' },{ value: 'Mercon V', label: 'Mercon V' },{ value: 'Mercon LV', label: 'Mercon LV' },
                            { value: 'Mercon SP', label: 'Mercon SP' }, { value: 'Dexron III', label: 'Dexron III' },{ value: 'ATF +4', label: 'ATF +4' },
                            { value: 'Dexron VI', label: 'Dexron VI' },{ value: 'Multivehiculo', label: 'Multivehiculo' },{ value: '30', label: '30' }, 
                            { value: '60', label: '60' }]

    const oilTypeSelect = [{ value: 'Mineral', label: 'Mineral' }, { value: 'Sintetico', label: 'Sintetico' }, { value: 'Semisintético', label: 'Semisintético' },
                            { value: 'Transmisión Automática', label: 'Transmisión Automática' }, { value: 'Transmisión Manual', label: 'Transmisión Manual' }]

    const oilPresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Garrafas 5 litros', label: 'Garrafas 5 litros' }, { value: 'Garrafas 4 litros', label: 'Garrafas 4 litros' },
                                { value: 'Cubetas 19 litros', label: 'Cubetas 19 litros' }, { value: 'Barril 208 litros', label: 'Barril 208 litros' }, { value: "Suelto", label: 'Suelto' },
                                { value: 'none', label: 'SIN ACEITE' }]
    
    const oilMakeSelect = [{ value: 'Shell', label: 'Shell' }, { value: 'Quaker State', label: 'Quaker State' }, { value: 'Roshfrans', label: 'Roshfrans' }, { value: 'LTH', label: 'LTH' },
                        { value: 'ACDelco', label: 'ACDelco' }, { value: 'Mopar', label: 'Mopar' }, { value: 'Castrol', label: 'Castrol' }, { value: 'Nissan', label: 'Nissan' }, 
                        { value: 'Phillips 66', label: 'Phillips 66' }, { value: 'Repsol', label: 'Repsol' }, { value: 'Mexlub', label: 'Mexlub' }, { value: 'Pemex', label: 'Pemex' }, 
                        { value: 'HM9', label: 'HM9' }, { value: 'Chevron', label: 'Chevron' }, { value: 'Presson', label: 'Presson' }, { value: 'Akron', label: 'Akron' },
                        { value: 'Bardahl', label: 'Bardahl' }, { value: 'Motorcraft', label: 'Motorcraft' }, { value: 'Mobil', label: 'Mobil' }, { value: 'Pennzoil', label: 'Pennzoil' }]

    const antifreezeMakeSelect = [{ value: 'Quaker State', label: 'Quaker State' }, { value: 'Bardahl', label: 'Bardahl' }, { value: 'Roshfrans', label: 'Roshfrans' }, { value: 'Peak', label: 'Peak' },
                        { value: 'Prestone', label: 'Prestone' }, { value: 'TBreaker', label: 'TBreaker' }, { value: 'Mopar', label: 'Mopar' }, { value: 'Motorcraft', label: 'Motorcraft' }, 
                        { value: 'Gonher', label: 'Gonher' }]
    
    const antifreezePresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Suelto', label: 'Suelto' }]

    const antifreezeTypeSelect = [{ value: 'Concentrado', label: 'Concentrado' }, { value: 'Coolant', label: 'Coolant' }]

    const context = useContext(appContext)

    const [products, setProducts] = useState([])
    const [productsList, setProductsList] = useState([])
    const [antifreezeSpecifications, setAntifreezeSpecifications] = useState([]);
    const [oilNames, setOilNames] = useState([]);
    const [typeProduct, setTypeProduct] = useState('filter')
    const [showList, setShowList] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [buy, setBuy] = useState(false)
    const [viscosity, setViscosity] = useState(viscositySelect[0])
    const [presentation, setPresentation] = useState(oilPresentationSelect[0])
    const [oilMake, setOilMake] = useState(oilMakeSelect[0])
    const [oilType, setOilType] = useState(oilTypeSelect[0])
    const [antifreezePresentation, setAntifreezePresentation] = useState(antifreezePresentationSelect[0])
    const [antifreezeMake, setAntifreezeMake] = useState(antifreezeMakeSelect[0])
    const [antifreezeType, setAntifreezeType] = useState(antifreezeTypeSelect[0])
    const [oilName, setOilName] = useState({});
    const [antifreezeSpecification, setAntifreezeSpecification] = useState({});

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue)

    const handleSelectOilType = newValue => setOilType(newValue)

    const handleSelectOilName = newValue => setOilName(newValue)

    const handleSelectAntifreezeType = newValue => setAntifreezeType(newValue)

    const handleSelectAntifreezeMake = newValue => setAntifreezeMake(newValue)

    const handleSelectAntifrezePresentation = newValue => setAntifreezePresentation(newValue)

    const handleSelectAntifrezeSpecification = newValue => setAntifreezeSpecification(newValue)

    const closeList = () => setShowList(false)

    const addProductToList = product => {
        let newProductsList = [...productsList]
        let idx = newProductsList.findIndex( p => p._id == product._id )
        if(idx < 0){
            newProductsList.push(product)
            setProductsList(newProductsList)
            showToast()
        }
    }

    const openList = () => {
        setShowList(true)
    }

    const removeProduct = productDeleted => {
        let newProductsList = [...productsList]
        let idx = newProductsList.findIndex( product => product._id == productDeleted._id )
        newProductsList.splice(idx, 1)
        setProductsList(newProductsList)
    }

    const showToast = () => {
        setToastOpen(true)
        setTimeout(() => {
            setToastOpen(false)
        }, 2000);
    }

    const addOil = () => {
        let oils = context.oils.filter( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value)
        if(oils.length > 1){
            let oil = oils.filter( oilDB =>  oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value && oil.name == oilName.value)            
            if(oil.length === 1){ addProductToList({ ...oil[0], name: `${oil[0].make}_${oil[0].oilType}_${oil[0].presentation}_${oil[0].viscosity}${oil[0].name ? `_${oil[0].name}` : ''}` }) }
            else{ alert('No existe ningun aceite con esas características') }
        }else if(oils.length === 1){
            addProductToList({ ...oils[0], name: `${oils[0].make}_${oils[0].oilType}_${oils[0].presentation}_${oils[0].viscosity}${oils[0].name ? `_${oil[0].name}` : ''}` })
        }else{ alert('No existe ningun aceite con esas características') }
    }

    const addAntifreeze = () => {
        let antifreezes = context.antifreezes.filter( antifreezeDB => antifreezeDB.antifreezeMake == antifreezeMake.value && antifreezeDB.antifreezePresentation == antifreezePresentation.value && 
            antifreezeDB.antifreezeType == antifreezeType.value)
        if(antifreezes.length > 1){
            console.log(antifreezes)
            let antifreeze = antifreezes.filter( antifreezeDB => antifreezeDB.antifreezeMake == antifreezeMake.value && antifreezeDB.antifreezePresentation == antifreezePresentation.value && 
                antifreezeDB.antifreezeType == antifreezeType.value && (antifreezeSpecification.value === "none" ? !antifreezeDB.specification : antifreezeDB.specification == antifreezeSpecification.value))            
            if(antifreeze.length === 1){ addProductToList({ ...antifreeze[0], name: `${antifreeze[0].antifreezeMake}_${antifreeze[0].antifreezeType}_${antifreeze[0].antifreezePresentation}${antifreeze[0].specification ? `_${antifreeze[0].specification}` : ''}` }) }
            else{ alert('No existe ningun anticongelante con esas características') }
        }else if(antifreezes.length === 1){
            addProductToList({ ...antifreezes[0], name: `${antifreezes[0].antifreezeMake}_${antifreezes[0].antifreezeType}_${antifreezes[0].antifreezePresentation}${antifreezes[0].specification ? `_${antifreezes[0].specification}` : ''}` })
        }else{ alert('No existe ningun anticongelante con esas características') }
    }

    const buyFunction = (e)  => {
        e.preventDefault()
        setBuy(true)
    }

    useEffect(() => {
        if(typeProduct === "oil"){
            let oils = context.oils.filter( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value)
            if(oils.length > 1){
                let oil = oils.filter( oilDB =>  oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value && oil.name == oilName.value)
                oils = oils.map( oil => {
                    return { value: oil.name ? oil.name : 'none', label: oil.name ? oil.name : 'SIN NOMBRE' }
                }) 
                setOilNames(oils)
            }
        }
    }, [oilMake, oilType, presentation, viscosity, typeProduct, oilName, context.oils])

    useEffect(() => {
        if(typeProduct === "antifreeze"){
            let antifreezes = context.antifreezes.filter( antifreezeDB => antifreezeDB.antifreezeMake == antifreezeMake.value && antifreezeDB.antifreezePresentation == antifreezePresentation.value && 
                antifreezeDB.antifreezeType == antifreezeType.value)
                antifreezes = antifreezes.map( antifreeze => {
                return { value: antifreeze.specification ? antifreeze.specification : 'none', label: antifreeze.specification ? antifreeze.specification : 'SIN ESPECIFICACIONES' }
            }) 
            setAntifreezeSpecifications(antifreezes)
            setAntifreezeSpecification(antifreezes[0])
        }
    }, [antifreezeMake, antifreezePresentation, antifreezeType, typeProduct, context.antifreezes])

    return (
        <div className="bg-white direction-column justify-content-start padding-top bg-repeat">
            <Navbar />
            <Searcher 
                typeProduct={typeProduct}
                setProducts={setProducts}
                setTypeProduct={setTypeProduct}
            />
            <ShopList 
                modalIsOpen={showList}
                closeModal={closeList}
                productsList={productsList}
                removeProduct={removeProduct}
                textSuccessButton="COMPRAR"
                buy={buy}
                successFunction={buyFunction}
            />
            {products.length !== 0 && (
                <div className={`table-container table-products flex-start`}>
                    {typeProduct === "filter" ? (
                        <FilterProducts 
                            filters={products}
                            sell={true}
                            sellFunction={addProductToList}
                        />
                    ) : typeProduct === "sparkPlug" ? (
                        <SparkPlugProducts 
                            sparkplugs={products}
                            sell={true}
                            sellFunction={addProductToList}
                        />
                    ) : typeProduct === "wiresets" ? (
                        <WiresetsProducts 
                            wiresets={products}
                            sell={true}
                            sellFunction={addProductToList}
                        />
                    ) : typeProduct === "brakeShoe" ? (
                        <BrakeshoeProducts 
                            brakeshoes={products}
                            sell={true}
                            sellFunction={addProductToList}
                        />
                    ) : typeProduct === "coil" && (
                        <CoilProducts 
                            coils={products}
                            sell={true}
                            sellFunction={addProductToList}
                        />
                    )}
                </div>
            )}
            {typeProduct === "oil" && (
                <>
                <div className="select-container big">
                    <div className="label-container">
                        <label>ACEITE</label>
                    </div>
                    <Select        
                        value={oilMake}
                        options={oilMakeSelect}
                        onChange={handleSelectMakeOil}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>VISCOSIDAD</label>
                    </div>
                    <Select        
                        value={viscosity}
                        options={viscositySelect}
                        onChange={handleSelectViscosity}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>PRESENTACIÓN</label>
                    </div>
                    <Select        
                        value={presentation}
                        options={oilPresentationSelect}
                        onChange={handleSelectPresentation}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>TIPO</label>
                    </div>
                    <Select        
                        value={oilType}
                        options={oilTypeSelect}
                        onChange={handleSelectOilType}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>NOMBRE</label>
                    </div>
                    <Select        
                        value={oilName}
                        options={oilNames}
                        onChange={handleSelectOilName}
                        className="select"
                    />
                </div>
                <button className="btn-aspi margin-top" onClick={addOil}>AGREGAR</button>
                </>
            )}
            {typeProduct === "antifreeze" && (
                <>
                <div className="select-container big">
                    <div className="label-container">
                        <label>ANTI. MARCA</label>
                    </div>
                    <Select        
                        value={antifreezeMake}
                        options={antifreezeMakeSelect}
                        onChange={handleSelectAntifreezeMake}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>ANTI. PRESEN.</label>
                    </div>
                    <Select        
                        value={antifreezePresentation}
                        options={antifreezePresentationSelect}
                        onChange={handleSelectAntifrezePresentation}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>ANTI. TIPO</label>
                    </div>
                    <Select        
                        value={antifreezeType}
                        options={antifreezeTypeSelect}
                        onChange={handleSelectAntifreezeType}
                        className="select"
                    />
                </div>
                <div className="select-container big">
                    <div className="label-container">
                        <label>ANTI. ESPEC.</label>
                    </div>
                    <Select        
                        value={antifreezeSpecification}
                        options={antifreezeSpecifications}
                        onChange={handleSelectAntifrezeSpecification}
                        className="select"
                    />
                </div>
                <button className="btn-aspi margin-top" onClick={addAntifreeze}>AGREGAR</button>
                </>
            )}
            <button className="btn-shop" onClick={openList}>
                <img src={`${url}/images/shopping.png`}/>
            </button>
            {toastOpen && (
                <Toast text="EL PRODUCTO HA SIDO AGREGADO EXCITOSAMENTE"/>
            )}
        </div>
    )
}

export default Sells
