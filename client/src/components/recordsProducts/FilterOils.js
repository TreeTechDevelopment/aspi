import React, { useState, useEffect } from 'react'
import Select from "react-select";

function FilterOils({ setProducts, products, allProducts }) {

    const viscositySelect = [{ value: '5W30', label: '5W30' }, { value: '5W20', label: '5W20' }, { value: '5W40', label: '5W40' }, 
                            { value: '10W30', label: '10W30' }, { value: '15W40', label: '15W40' }, { value: '20W50', label: '20W50' },
                            { value: '25W50', label: '25W50' }, { value: '25W60', label: '25W60' }, { value: '0W20', label: '0W20' },
                            { value: '0W40', label: '0W40' }, { value: '5W50', label: '5W50' }, { value: '5W60', label: '5W60' },
                            { value: '10W40', label: '10W40' }, { value: '20W60', label: '20W60' }]

    const oilTypeSelect = [{ value: 'Mineral', label: 'Mineral' }, { value: 'Sintetico', label: 'Sintetico' }, { value: 'Semisintético', label: 'Semisintético' }]

    const oilPresentationSelect = [{ value: 'Litros', label: 'Litros' }, { value: 'Galones', label: 'Galones' }, { value: 'Garrafas 5 litros', label: 'Garrafas 5 litros' }, { value: 'Garrafas 4 litros', label: 'Garrafas 4 litros' },
                                    { value: 'Cubetas 19 litros', label: 'Cubetas 19 litros' }, { value: 'Barril 208 litros', label: 'Barril 208 litros' }, { value: "Suelto", label: 'Suelto' }]
        
    const oilMakeSelect = [{ value: 'Shell', label: 'Shell' }, { value: 'Quaker State', label: 'Quaker State' }, { value: 'Roshfrans', label: 'Roshfrans' }, { value: 'LTH', label: 'LTH' },
                            { value: 'ACDelco', label: 'ACDelco' }, { value: 'Mopar', label: 'Mopar' }, { value: 'Castrol', label: 'Castrol' }, { value: 'Nissan', label: 'Nissan' }, 
                            { value: 'Phillips 66', label: 'Phillips 66' }, { value: 'Repsol', label: 'Repsol' }, { value: 'Mexlub', label: 'Mexlub' }, { value: 'Pemex', label: 'Pemex' }, 
                            { value: 'HM9', label: 'HM9' }, { value: 'Chevron', label: 'Chevron' }, { value: 'Presson', label: 'Presson' }, { value: 'Akron', label: 'Akron' },
                            { value: 'Bardahl', label: 'Bardahl' }]

    const filterTypeSelect = [{ value: 'make', label: 'MARCA' }, { value: 'viscosity', label: 'VISCOSIDAD' }, { value: 'type', label: 'TIPO' }, 
                        { value: 'presentation', label: 'PRESENTACIÓN' }]

    const [filter, setFilter] = useState(false)
    const [viscosity, setViscosity] = useState(viscositySelect[0])
    const [presentation, setPresentation] = useState(oilPresentationSelect[0])
    const [oilMake, setOilMake] = useState(oilMakeSelect[0])
    const [oilType, setOilType] = useState(oilTypeSelect[0])
    const [filterType, setFilterType] = useState(filterTypeSelect[0])

    const applyFilter = () => setFilter(!filter)

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue)

    const handleSelectOilType = newValue => setOilType(newValue)

    const handleSelectFilterType = newValue => setFilterType(newValue)

    const renderSelect = () => {
        switch(filterType.value){
            case "make":
                return (
                    <div className="select-container small">
                        <div className="label-container">
                            <label>MARCA</label>
                        </div>
                        <Select        
                            value={oilMake}
                            options={oilMakeSelect}
                            onChange={handleSelectMakeOil}
                            className="select"
                        />
                    </div>
                )
            case "viscosity":
                return(
                    <div className="select-container small">
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
                )
            case "type":
                return(
                    <div className="select-container small">
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
                )
            case "presentation":
                return(
                    <div className="select-container small">
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
                )
        }
    }

    useEffect(() => {
        if(filter){
            let newProducts = []
            switch(filterType.value){
                case "make":
                    newProducts = [...allProducts]
                    newProducts = newProducts.filter( oil => oil.make == oilMake.value )
                    setProducts(newProducts)
                    break;
                case "viscosity":
                    newProducts = [...allProducts]
                    newProducts = newProducts.filter( oil => oil.viscosity == viscosity.value )
                    setProducts(newProducts)
                    break;
                case "type":
                    newProducts = [...allProducts]
                    newProducts = newProducts.filter( oil => oil.oilType == oilType.value )
                    setProducts(newProducts)
                    break;
                case "presentation":
                    newProducts = [...allProducts]
                    newProducts = newProducts.filter( oil => oil.presentation == presentation.value )
                    setProducts(newProducts)
                    break;

            }
        }else{ setProducts(allProducts) }
    }, [filterType, oilMake, oilType, viscosity, presentation, filter])
    
    return (
        <div className="filter-table-container">
            <div className="checkbox-container margin-right">
                <input
                    type="checkbox"
                    checked={filter}
                    onClick={applyFilter}
                />
                <label htmlFor="coils">APLICAR FILTRO</label>
            </div>
            {filter && (
                <>
                <div className="select-container small margin-right">
                    <div className="label-container">
                        <label>TIPO</label>
                    </div>
                    <Select        
                        value={filterType}
                        options={filterTypeSelect}
                        onChange={handleSelectFilterType}
                        className="select"
                    />
                </div>
                {renderSelect()}
                </>
            )}
        </div>
    )
}

export default FilterOils
