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
import { appContext } from '../context/Provider';

function Sells() {

    const viscositySelect = [{ value: '5W30', label: '5W30' }, { value: '5W20', label: '5W20' }, { value: '5W40', label: '5W40' }, 
                            { value: '10W30', label: '10W30' }, { value: '15W40', label: '15W40' }, { value: '20W50', label: '20W50' },
                            { value: '25W50', label: '25W50' }, { value: '25W60', label: '25W60' }, { value: '0W20', label: '0W20' },
                            { value: '0W40', label: '0W40' }, { value: '5W50', label: '5W50' }, { value: '5W60', label: '5W60' },
                            { value: '10W40', label: '10W40' }, { value: '20W60', label: '20W60' }]

    const oilTypeSelect = [{ value: 'Mineral', label: 'Mineral' }, { value: 'Sintetico', label: 'Sintetico' }, { value: 'Semisintético', label: 'Semisintético' }]

    const oilPresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Garrafas 5 litros', label: 'Garrafas 5 litros' }, { value: 'Garrafas 4 litros', label: 'Garrafas 4 litros' },
                                { value: 'Cubetas 19 litros', label: 'Cubetas 19 litros' }, { value: 'Barril 208 litros', label: 'Barril 208 litros' }, { value: "Suelto", label: 'Suelto' },
                                { value: 'none', label: 'SIN ACEITE' }]
    
    const oilMakeSelect = [{ value: 'Shell', label: 'Shell' }, { value: 'Quaker State', label: 'Quaker State' }, { value: 'Roshfrans', label: 'Roshfrans' }, { value: 'LTH', label: 'LTH' },
                        { value: 'ACDelco', label: 'ACDelco' }, { value: 'Mopar', label: 'Mopar' }, { value: 'Castrol', label: 'Castrol' }, { value: 'Nissan', label: 'Nissan' }, 
                        { value: 'Phillips 66', label: 'Phillips 66' }, { value: 'Repsol', label: 'Repsol' }, { value: 'Mexlub', label: 'Mexlub' }, { value: 'Pemex', label: 'Pemex' }, 
                        { value: 'HM9', label: 'HM9' }, { value: 'Chevron', label: 'Chevron' }, { value: 'Presson', label: 'Presson' }, { value: 'Akron', label: 'Akron' },
                        { value: 'Bardahl', label: 'Bardahl' }, { value: 'Motorcraft', label: 'Motorcraft' }, { value: 'Mobil', label: 'Mobil' }, { value: 'Pennzoil', label: 'Pennzoil' }]

    const context = useContext(appContext)

    const [products, setProducts] = useState([])
    const [productsList, setProductsList] = useState([])
    const [typeProduct, setTypeProduct] = useState('filter')
    const [showList, setShowList] = useState(false)
    const [toastOpen, setToastOpen] = useState(false)
    const [viscosity, setViscosity] = useState(viscositySelect[0])
    const [presentation, setPresentation] = useState(oilPresentationSelect[0])
    const [oilMake, setOilMake] = useState(oilMakeSelect[0])
    const [oilType, setOilType] = useState(oilTypeSelect[0])
    const [oilNames, setOilNames] = useState([]);
    const [oilName, setOilName] = useState({});

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue)

    const handleSelectOilType = newValue => setOilType(newValue)

    const handleSelectOilName = newValue => setOilName(newValue)

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
            if(oil.length === 1){ addProductToList({ ...oil[0], name: `${oil[0].make} ${oil[0].oilType} ${oil[0].presentation} ${oil[0].viscosity} ${oils[0].name && oils[0].name}` }) }
            else{ alert('No existe ningun aceite con esas características') }
        }else if(oils.length === 1){
            addProductToList({ ...oils[0], name: `${oils[0].make} ${oils[0].oilType} ${oils[0].presentation} ${oils[0].viscosity} ${oils[0].name ? oils[0].name : ''}` })
        }else{ alert('No existe ningun aceite con esas características') }
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
    }, [oilMake, oilType, presentation, viscosity, typeProduct, oilName])

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
                    ) : typeProduct === "brakeShoe" && (
                        <BrakeshoeProducts 
                            brakeshoes={products}
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
            <button className="btn-shop" onClick={openList}>?</button>
            {toastOpen && (
                <Toast text="EL PRODUCTO HA SIDO AGREGADO EXCITOSAMENTE"/>
            )}
        </div>
    )
}

export default Sells
