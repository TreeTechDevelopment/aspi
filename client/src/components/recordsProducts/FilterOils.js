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
    const [makeFilter, setMakeFilter] = useState(false)
    const [viscosityFilter, setViscosityFilter] = useState(false)
    const [presentationFilter, setPresentationFilter] = useState(false)
    const [oilTypeFilter, setOilTypeFilter] = useState(false)

    const applyFilter = () => setFilter(!filter)

    const handleSelectViscosity = newValue => setViscosity(newValue)

    const handleSelectMakeOil = newValue => setOilMake(newValue)

    const handleSelectPresentation = newValue => setPresentation(newValue)

    const handleSelectOilType = newValue => setOilType(newValue)

    const handleCheckboxMake = () => setMakeFilter(!makeFilter)
    
    const handleCheckboxOilType = () => setOilTypeFilter(!oilTypeFilter)
    
    const handleCheckboxPresentation = () => setPresentationFilter(!presentationFilter)
    
    const handleCheckboxViscosity = () => setViscosityFilter(!viscosityFilter)

    useEffect(() => {
        if(filter){
            let newProducts = [...allProducts]
            newProducts = newProducts.filter( oil => {
                let conditionMake = true
                let conditionType = true
                let conditionPresentation = true
                let conditionViscosity = true
                if(makeFilter){ conditionMake = oil.make == oilMake.value }
                if(oilTypeFilter){ conditionType = oil.oilType == oilType.value }
                if(presentationFilter){ conditionPresentation = oil.presentation == presentation.value }
                if(viscosityFilter){ conditionViscosity = oil.viscosity == viscosity.value }
                return conditionMake && conditionType && conditionPresentation && conditionViscosity
            } )
            setProducts(newProducts)
        }else{ setProducts(allProducts) }
    }, [ oilMake, oilType, viscosity, presentation, filter, makeFilter, oilTypeFilter, presentationFilter, viscosityFilter])
    
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
                <div className="checkbox-container w-select wo-padding padding-left-checkbox-container">
                    <input
                        type="checkbox"
                        checked={makeFilter}
                        onClick={handleCheckboxMake}
                    />
                    <label htmlFor="transmission-id">MARCA</label>
                    <div className="select-container wo-margin-top big">
                        <Select        
                            value={oilMake}
                            options={oilMakeSelect}
                            onChange={handleSelectMakeOil}
                            className="select-big select"
                        />
                    </div>
                </div>
                <div className="checkbox-container w-select wo-padding padding-left-checkbox-container">
                    <input
                        type="checkbox"
                        checked={oilTypeFilter}
                        onClick={handleCheckboxOilType}
                    />
                    <label htmlFor="transmission-id">TIPO</label>
                    <div className="select-container wo-margin-top big">
                        <Select        
                            value={oilType}
                            options={oilTypeSelect}
                            onChange={handleSelectOilType}
                            className="select-big select"
                        />
                    </div>
                </div>
                <div className="checkbox-container w-select wo-padding padding-left-checkbox-container">
                    <input
                        type="checkbox"
                        checked={presentationFilter}
                        onClick={handleCheckboxPresentation}
                    />
                    <label htmlFor="transmission-id">PRESENTACIÓN</label>
                    <div className="select-container wo-margin-top big">
                        <Select        
                            value={presentation}
                            options={oilPresentationSelect}
                            onChange={handleSelectPresentation}
                            className="select-big select"
                        />
                    </div>
                </div>
                <div className="checkbox-container w-select wo-padding padding-left-checkbox-container">
                    <input
                        type="checkbox"
                        checked={viscosityFilter}
                        onClick={handleCheckboxViscosity}
                    />
                    <label htmlFor="transmission-id">VISCOSIDAD</label>
                    <div className="select-container wo-margin-top big">
                        <Select        
                            value={viscosity}
                            options={viscositySelect}
                            onChange={handleSelectViscosity}
                            className="select-big select"
                        />
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default FilterOils
