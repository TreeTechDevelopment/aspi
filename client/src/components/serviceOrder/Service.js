import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";

import CreatePDF from './CreatePDF'
import { appContext } from '../../context/Provider'

const Service = ({order}) => { 

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
                        { value: 'Bardahl', label: 'Bardahl' }]

  const context = useContext(appContext)

  const [airFilterSelect, setAirFilterSelect] = useState([]);
  const [oilFilterSelect, setOilFilterSelect] = useState([]);
  const [fuelFilterSelect, setFuelFilterSelect] = useState([]);
  const [cabineFilterSelect, setCabineFilterSelect] = useState([]);
  const [sparkplugSelect, setSparkplugSelect] = useState([]);
  const [wiresetSelect, setWiresetSelect] = useState([]);
  const [brakeshoeBackSelect, setBrakeshoeBackSelect] = useState([]);
  const [brakeshoeFrontSelect, setBrakeshoeFrontSelect] = useState([]);
  const [oilNames, setOilNames] = useState([]);
  const [oilName, setOilName] = useState({});
  const [airFilter, setAirFilter] = useState({});
  const [oilFilter, setOilFilter] = useState({});
  const [fuelFilter, setFuelFilter] = useState({});
  const [cabineFilter, setCabineFilter] = useState({});
  const [sparkplug, setSparkplug] = useState({});
  const [wireset, setWireset] = useState({});
  const [brakeshoeBack, setBrakeshoeBack] = useState({});
  const [brakeshoeFront, setBrakeshoeFront] = useState({})
  const [lts, setLts] = useState('')
  const [viscosity, setViscosity] = useState(viscositySelect[0])
  const [presentation, setPresentation] = useState(oilPresentationSelect[0])
  const [oilMake, setOilMake] = useState(oilMakeSelect[0])
  const [oilType, setOilType] = useState(oilTypeSelect[0])
  const [phone, setPhone] = useState('')

  const [datos, guardarDatos] = useState({
    CleaningInj: "No",
    CleaningAB: "No",
    ChangeAirFiltter: "No",
    ChangeCabinAirFiltter: "No",
    Oil: "No",
    ChangeOilFiltter: "No",
    ChangeFuelFiltter: "No",
    plugs: "No",
    wiresets: "No",
    coil: "No",
    antifreeze: "No",
    transmission: "No",
    rectifyDisk: "No",
    changeBrakeshoeBack: "No",
    changeBrakeshoeFront: "No",
    note: '',
    total: 0,
    renderBTNPDF: false
  });

  const {
    rectifyDisk,
    changeBrakeshoeBack,
    changeBrakeshoeFront,
    CleaningInj,
    CleaningAB,
    ChangeAirFiltter,
    Oil,
    ChangeOilFiltter,
    ChangeCabinAirFiltter,
    ChangeFuelFiltter,
    plugs,
    wiresets,
    coil,
    antifreeze,
    transmission,
    note,
    renderBTNPDF,
    total
  } = datos;

  useEffect(() => {
    if (JSON.stringify(context.car) !== "{}" || order) {

        let airFilters = context.filters.filter( filterDB => filterDB.filterType === "air" )
        let oilFilters = context.filters.filter( filterDB => filterDB.filterType === "oil" )
        let fuelFilters = context.filters.filter( filterDB => filterDB.filterType === "fuel" )
        let cabineFilters = context.filters.filter( filterDB => filterDB.filterType === "cabine" )

        let airFiltersSelect = []
        if(order){ airFilters = airFilters.filter( filter => order.car.airFilter.some( airFilter => airFilter === filter.interfil ) ) }
        else{ airFilters = airFilters.filter( filter => context.car.airFilter.some( airFilter => airFilter == filter.interfil )  ) }
        for(let i = 0; i < airFilters.length; i++){
          airFiltersSelect = [...airFiltersSelect, airFilters[i].interfil, ...airFilters[i].OEM, ...airFilters[i].ACD,
                            ...airFilters[i].Fram, ...airFilters[i].Gonher, ...airFilters[i].Motorcraft, ...airFilters[i].Purolator,
                            ...airFilters[i].Wix, ...airFilters[i].Mann]
          airFiltersSelect = airFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${airFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let oilFiltersSelect = []
        if(order){ oilFilters = oilFilters.filter( filter => order.car.oilFilter.some( oilFilter => oilFilter == filter.interfil )  ) }
        else{ oilFilters = oilFilters.filter( filter => context.car.oilFilter.some( oilFilter => oilFilter == filter.interfil )  ) }
        for(let i = 0; i < oilFilters.length; i++){
          oilFiltersSelect = [...oilFiltersSelect, oilFilters[i].interfil, ...oilFilters[i].OEM, ...oilFilters[i].ACD,
                            ...oilFilters[i].Fram, ...oilFilters[i].Gonher, ...oilFilters[i].Motorcraft, ...oilFilters[i].Purolator,
                            ...oilFilters[i].Wix, ...oilFilters[i].Mann]
          oilFiltersSelect = oilFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${oilFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let fuelFiltersSelect = []
        if(order){ fuelFilters = fuelFilters.filter( filter => order.car.fuelFilter.some( fuelFilter => fuelFilter == filter.interfil )  ) }
        else{ fuelFilters = fuelFilters.filter( filter => context.car.fuelFilter.some( fuelFilter => fuelFilter == filter.interfil )  ) }
        for(let i = 0; i < fuelFilters.length; i++){
          fuelFiltersSelect = [...fuelFiltersSelect, fuelFilters[i].interfil, ...fuelFilters[i].OEM, ...fuelFilters[i].ACD,
                            ...fuelFilters[i].Fram, ...fuelFilters[i].Gonher, ...fuelFilters[i].Motorcraft, ...fuelFilters[i].Purolator,
                            ...fuelFilters[i].Wix, ...fuelFilters[i].Mann]
          fuelFiltersSelect = fuelFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${fuelFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let cabineFiltersSelect = []
        if(order){ cabineFilters = cabineFilters.filter( filter => order.car.cabineFilter.some( cabineFilter => cabineFilter == filter.interfil )  ) }
        else{ cabineFilters = cabineFilters.filter( filter => context.car.cabineFilter.some( cabineFilter => cabineFilter == filter.interfil )  ) }
        for(let i = 0; i < cabineFilters.length; i++){
          cabineFiltersSelect = [...cabineFiltersSelect, cabineFilters[i].interfil, ...cabineFilters[i].OEM, ...cabineFilters[i].ACD,
                            ...cabineFilters[i].Fram, ...cabineFilters[i].Gonher, ...cabineFilters[i].Motorcraft, ...cabineFilters[i].Purolator,
                            ...cabineFilters[i].Wix, ...cabineFilters[i].Mann]
          cabineFiltersSelect = cabineFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${cabineFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let sparkplugSelect = []
        let sparkplugsDB = []
        if(order){ sparkplugsDB = context.sparkplugs.filter( sparkplugDB => order.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugNGK => sparkplug == sparkplugNGK ) )  ) }
        else{ sparkplugsDB = context.sparkplugs.filter( sparkplugDB => context.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugNGK => sparkplug == sparkplugNGK ) )  ) }
        for(let i = 0; i < sparkplugsDB.length; i++){
          sparkplugSelect = [...sparkplugSelect, ...sparkplugsDB[i].NGK, ...sparkplugsDB[i].Champions, ...sparkplugsDB[i].ACD,
                            ...sparkplugsDB[i].Bosh, ...sparkplugsDB[i].Motorcraft]
          sparkplugSelect = sparkplugSelect.map( sparkplug => {
            if(typeof sparkplug === "object"){ return sparkplug }
            return { value: `${sparkplugsDB[i].price}-${Math.random().toString()}`, label: sparkplug };
          });
        }

        let wiresetSelect = []
        let wiresetsDB = []
        if(order){ wiresetsDB = context.wiresets.filter( wiresetDB => order.car.wiresets.some( wireset => wiresetDB.Roadstar.some( wiresetRoadstar => wireset == wiresetRoadstar ) )  ) }
        else{ wiresetsDB = context.wiresets.filter( wiresetDB => context.car.wiresets.some( wireset => wiresetDB.Roadstar.some( wiresetRoadstar => wireset == wiresetRoadstar ) )  ) }
        for(let i = 0; i < wiresetsDB.length; i++){
          wiresetSelect = [...wiresetSelect, ...wiresetsDB[i].NGK, ...wiresetsDB[i].LS, ...wiresetsDB[i].Roadstar, ...wiresetsDB[i].Bosh]
          wiresetSelect = wiresetSelect.map( wireset => {
            if(typeof wireset === "object"){ return wireset }
            return { value: `${wiresetsDB[i].price}-${Math.random().toString()}`, label: wireset };
          });
        }

        let brakeshoeBackSelect = []
        let brakeshoesBackDB = []
        if(order){ brakeshoesBackDB = context.brakeshoes.filter( brakeshoeDB => order.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        else{ brakeshoesBackDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        for(let i = 0; i < brakeshoesBackDB.length; i++){
          brakeshoeBackSelect = [...brakeshoeBackSelect, ...brakeshoesBackDB[i].Wagner ]
          brakeshoeBackSelect = brakeshoeBackSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesBackDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }

        let brakeshoeFrontSelect = []
        let brakeshoesFrontDB = []
        if(order){ brakeshoesFrontDB = context.brakeshoes.filter( brakeshoeDB => order.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        else{ brakeshoesFrontDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        for(let i = 0; i < brakeshoesFrontDB.length; i++){
          brakeshoeFrontSelect = [...brakeshoeFrontSelect, ...brakeshoesFrontDB[i].Wagner ]
          brakeshoeFrontSelect = brakeshoeFrontSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesFrontDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }

        airFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        oilFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        fuelFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        cabineFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        sparkplugSelect.push({ value: 'none', label: 'SIN BUJÍA' })
        wiresetSelect.push({ value: 'none', label: 'SIN CABLES' })
        brakeshoeBackSelect.push({ value: 'none', label: 'SIN BALATA' })
        brakeshoeFrontSelect.push({ value: 'none', label: 'SIN BALATA' })
        
        setAirFilterSelect(airFiltersSelect);
        setAirFilter(airFiltersSelect[0]);
        setOilFilterSelect(oilFiltersSelect);
        setOilFilter(oilFiltersSelect[0]);
        setFuelFilterSelect(fuelFiltersSelect);
        setFuelFilter(fuelFiltersSelect[0]);
        setCabineFilterSelect(cabineFiltersSelect);
        setCabineFilter(cabineFiltersSelect[0]);
        setSparkplugSelect(sparkplugSelect);
        setSparkplug(sparkplugSelect[0]);
        setWiresetSelect(wiresetSelect)
        setWireset(wiresetSelect[0])
        setBrakeshoeBackSelect(brakeshoeBackSelect)
        setBrakeshoeBack(brakeshoeBackSelect[0])
        setBrakeshoeFrontSelect(brakeshoeFrontSelect)
        setBrakeshoeFront(brakeshoeFrontSelect[0])

        if(order && context.services.length !== 0){
          let newDatos = { note: order.note }
          if(order.phone){ setPhone(order.phone) }
          if(order.antifreeze === "Si"){ newDatos.antifreeze = "Si" }
          if(order.cleanAB === "Si"){ newDatos.CleaningAB = "Si" }
          if(order.cleanInj === "Si"){ newDatos.CleaningInj = "Si" }
          if(order.coil === "Si"){ newDatos.coil = "Si" }
          if(order.transmission === "Si"){ newDatos.transmission = "Si" }
          if(order.brakeshoeBack !== ""){
            newDatos.changeBrakeshoeBack = "Si"
            let idx = brakeshoeBackSelect.findIndex( brakeshoe => brakeshoe.label == order.brakeshoeBack )
            setBrakeshoeBack(brakeshoeBackSelect[idx]);
          }
          if(order.brakeshoeFront !== ""){
            newDatos.changeBrakeshoeFront = "Si"
            let idx = brakeshoeFrontSelect.findIndex( brakeshoe => brakeshoe.label == order.brakeshoeFront )
            setBrakeshoeFront(brakeshoeFrontSelect[idx]);
          }
          if(order.filters.airFilter !== ""){
            newDatos.ChangeAirFiltter = "Si"
            let idx = airFiltersSelect.findIndex( filter => filter.label == order.filters.airFilter )
            setAirFilter(airFiltersSelect[idx]);
          }
          if(order.filters.oilFilter !== ""){
            newDatos.ChangeOilFiltter = "Si"
            let idx = oilFiltersSelect.findIndex( filter => filter.label == order.filters.oilFilter )
            setOilFilter(oilFiltersSelect[idx]);
          }
          if(order.filters.fuelFilter !== ""){
            newDatos.ChangeFuelFiltter = "Si"
            let idx = fuelFiltersSelect.findIndex( filter => filter.label == order.filters.fuelFilter )
            setFuelFilter(fuelFiltersSelect[idx]);
          }
          if(order.filters.cabineFilter !== ""){
            newDatos.ChangeCabinAirFiltter = "Si"
            let idx = cabineFiltersSelect.findIndex( filter => filter.label == order.filters.cabineFilter )
            setCabineFilter(cabineFiltersSelect[idx]);
          }
          if(order.sparkplugs !== ""){
            newDatos.plugs = "Si"
            let idx = sparkplugSelect.findIndex( sparkplug => sparkplug.label == order.sparkplugs )
            setSparkplug(sparkplugSelect[idx]);
          }
          if(order.wiresets !== ""){
            newDatos.wiresets = "Si"
            let idx = wiresetSelect.findIndex( wireset => wireset.label == order.wiresets )
            setWireset(wiresetSelect[idx]);
          }
          if(order.oil.oilRequired === "Si"){ 
            newDatos.Oil = "Si"
            let idxMake = oilMakeSelect.findIndex( make => make.label == order.oil.make )
            let idxPresentation = oilPresentationSelect.findIndex( presentation => presentation.label == order.oil.presentation )
            let idxType = oilTypeSelect.findIndex( type => type.label == order.oil.oilType )
            let idxViscosity = viscositySelect.findIndex( viscosity => viscosity.label == order.oil.viscosity )
            setOilMake(oilMakeSelect[idxMake])
            setPresentation(oilPresentationSelect[idxPresentation])
            setOilType(oilTypeSelect[idxType])
            setViscosity(viscositySelect[idxViscosity])
          }
          guardarDatos({
            ...datos,
            ...newDatos
          })
        }

    }
  }, [context.car, context.services, context.filters]);

  const obtenerInformacion = (e) => {
    if(context.services.length !== 0){
      let value = getValueOfCheckbox(e.target.name)
      guardarDatos({
        ...datos,
        [e.target.name]: value === "Si" ? 'No' : 'Si',
      });
    }
  };

  const handleTextArea = e => {
    guardarDatos({
      ...datos,
      note: e.target.value,
    });
  }

  const getValueOfCheckbox = name => {
    switch(name){
      case "CleaningInj": return CleaningInj
      case "CleaningAB": return CleaningAB
      case "Oil": return Oil
      case "ChangeAirFiltter": return ChangeAirFiltter
      case "ChangeCabinAirFiltter": return ChangeCabinAirFiltter
      case "ChangeOilFiltter": return ChangeOilFiltter
      case "ChangeFuelFiltter": return ChangeFuelFiltter
      case "wiresets": return wiresets
      case "plugs": return plugs
      case "coil": return coil
      case "antifreeze": return antifreeze
      case "transmission": return transmission
      case "rectifyDisk": return rectifyDisk
      case "changeBrakeshoeFront": return changeBrakeshoeFront
      case "changeBrakeshoeBack": return changeBrakeshoeBack
    }
  }

  const getTotalProducts  =() => {
    let total = 0
    if(plugs === "Si"){ 
      if(sparkplug?.value !== "none"){ total += Number(sparkplug?.value.split('-')[0]) }
    }if(ChangeAirFiltter === "Si"){ 
      if(airFilter?.value !== "none"){ total += Number(airFilter?.value.split('-')[0]) }
    }if(ChangeOilFiltter === "Si"){ 
      if(oilFilter?.value !== "none"){ total += Number(oilFilter?.value.split('-')[0]) }
    }if(ChangeFuelFiltter === "Si"){ 
      if(fuelFilter?.value !== "none"){ total += Number(fuelFilter?.value.split('-')[0]) }
    }if(ChangeCabinAirFiltter === "Si"){ 
      if(cabineFilter?.value !== "none"){ total += Number(cabineFilter?.value.split('-')[0]) }
    }if(wiresets === "Si"){ 
      if(wireset?.value !== "none"){ total += Number(wireset?.value.split('-')[0]) }
    }if(changeBrakeshoeBack === "Si"){ 
      if(brakeshoeBack?.value !== "none"){ total += Number(brakeshoeBack?.value.split('-')[0]) }
    }if(changeBrakeshoeFront === "Si"){ 
      if(brakeshoeFront?.value !== "none"){ total += Number(brakeshoeFront?.value.split('-')[0]) }
    }if( Oil === "Si" ){
      if(presentation.value !== "none"){
        let oil = context.oils.find( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value)
        if(presentation.value === "Suelto"){ total += oil ? oil.price * Number(lts) : 0}
          else{ total += oil ? oil.price : 0 }  
      }
    }
    return total
  }

  const createPDF = (e) => {
    e.preventDefault()
    let total = getTotal()
    guardarDatos({
      ...datos,
      total,
      renderBTNPDF: true,
    });
  }

  const getTotal = () => {
    let total = getTotalProducts()
    const services = context.services
    if(CleaningAB === "Si"){
        let idx = services.findIndex( service => service.name === "cleanAB" )
        total += services[idx].price
    }if(CleaningInj === "Si"){
        let idx = services.findIndex( service => service.name === "cleanInj" )
        total += services[idx].price
    }if(transmission === "Si"){
        let idx = services.findIndex( service => service.name === "transmission" )
        total += services[idx].price
    }if(coil === "Si"){
        let idx = services.findIndex( service => service.name === "coil" )
        total += services[idx].price
    }if(wiresets === "Si"){
        let idx = services.findIndex( service => service.name === "wiresets" )
        total += services[idx].price
    }if(ChangeAirFiltter === "Si"){
        let idx = services.findIndex( service => service.name === "changeAirFilter" )
        total += services[idx].price
    }if(ChangeOilFiltter === "Si"){
        let idx = services.findIndex( service => service.name === "changeOilFilter" )
        total += services[idx].price
    }if(ChangeFuelFiltter === "Si"){
        let idx = services.findIndex( service => service.name === "changeFuelFilter" )
        total += services[idx].price
    }if(ChangeCabinAirFiltter === "Si"){
        let idx = services.findIndex( service => service.name === "changeCabineFilter" )
        total += services[idx].price
    }if(plugs === "Si"){
        let idx = services.findIndex( service => service.name === "plugs" )
        total += services[idx].price
    }if(changeBrakeshoeBack === "Si"){
        let idx = services.findIndex( service => service.name === "changeBrakeshoeBack" )
        total += services[idx].price
    }if(changeBrakeshoeFront === "Si"){
        let idx = services.findIndex( service => service.name === "changeBrakeshoeFront" )
        total += services[idx].price
    }if(antifreeze === "Si"){
        let idx = services.findIndex( service => service.name === "antifreeze" )
        total += services[idx].price
    }if(rectifyDisk === "Si"){
        let idx = services.findIndex( service => service.name === "rectifyDisk" )
        total += services[idx].price
    }if(Oil === "Si"){
      let idx = services.findIndex( service => service.name === "changeOil" )
      total += services[idx].price
  }
    return total
} 

  const handleSelectAirFilter = newValue => setAirFilter(newValue)
  
  const handleSelectOilFilter = newValue => setOilFilter(newValue)
  
  const handleSelectFuelFilter = newValue => setFuelFilter(newValue)

  const handleSelectCabineFilter = newValue => setCabineFilter(newValue)

  const handleSelectSparkplug = newValue => setSparkplug(newValue)

  const handleSelectWireset = newValue =>  setWireset(newValue)

  const handleSelectBrakeshoeFront = newValue => setBrakeshoeFront(newValue)

  const handleSelectBrakeshoeBack = newValue => setBrakeshoeBack(newValue)

  const handleSelectViscosity = newValue => setViscosity(newValue)

  const handleSelectMakeOil = newValue => setOilMake(newValue)

  const handleSelectPresentation = newValue => setPresentation(newValue)

  const handleSelectOilType = newValue => setOilType(newValue)

  const handleSelectOilName = newValue => setOilName(newValue)

  const handleinputLts = e => setLts(e.target.value.replace( /[^0-9]/g, ''))

  const handlePhone = e => setPhone(e.target.value.replace( /[^0-9]/g, ''))

  const renderTotalProducts = product => {
    let total = 0
    switch(product){
      case "wireset":
        total += context.services.find( service => service.name === "wiresets" ).price
        if(wireset && wireset.value !== "none"){ total += Number(wireset.value.split('-')[0]) }
        break;
      case "brakeshoeBack":
        total += context.services.find( service => service.name === "changeBrakeshoeBack" ).price
        if(brakeshoeBack && brakeshoeBack.value !== "none"){ total += Number(brakeshoeBack.value.split('-')[0]) }
        break;
      case "brakeshoeFront":
        total += context.services.find( service => service.name === "changeBrakeshoeFront" ).price
        if(brakeshoeFront && brakeshoeFront.value !== "none"){ total += Number(brakeshoeFront.value.split('-')[0]) }
        break;
      case "sparkplug":
        total += context.services.find( service => service.name === "plugs" ).price
        if(sparkplug && sparkplug.value !== "none"){ total += Number(sparkplug.value.split('-')[0]) }
        break;
      case "fuelFilter":
        total += context.services.find( service => service.name === "changeFuelFilter" ).price
        if(fuelFilter && fuelFilter.value !== "none"){ total += Number(fuelFilter.value.split('-')[0]) }
        break;
      case "airFilter":
        total += context.services.find( service => service.name === "changeAirFilter" ).price
        if(airFilter && airFilter.value !== "none"){ total += Number(airFilter.value.split('-')[0]) }
        break;
      case "oilFilter":
        total += context.services.find( service => service.name === "changeOilFilter" ).price
        if(oilFilter && oilFilter.value !== "none"){ total += Number(oilFilter.value.split('-')[0]) }
        break;
      case "cabineFilter":
        total += context.services.find( service => service.name === "changeCabineFilter" ).price
        if(cabineFilter && cabineFilter.value !== "none"){ total += Number(cabineFilter.value.split('-')[0]) }
        break;
      case "oil":
        total += context.services.find( service => service.name === "changeOil" ).price
        if(presentation.value !== "none"){
          let oil = context.oils.find( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value)
          if(presentation.value === "Suelto"){ total += oil ? oil.price * Number(lts) : 0}
          else{ total += oil ? oil.price : 0 }  
        }
        
        break;
    }
    return total
  }

  useEffect(() => {
    if(Oil === "Si"){
      let oils = context.oils.filter( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value)
      oils = oils.map( oil => {
        return { value: oil.name ? oil.name : 'none', label: oil.name ? oil.name : 'SIN NOMBRE' }
      }) 
      setOilNames(oils)
    }
  }, [oilMake, oilType, presentation, viscosity, Oil])

  return (
    <>
      <div className="third-window padding-top">
        <form className="form align-items-start padding-left">
          <h1>SERVICIOS</h1>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="CleaningInj"
              checked={CleaningInj === "Si"}
              onClick={obtenerInformacion}
              id="cleanInj"
            />
            <label htmlFor="cleanInj">LIMPIEZA DE INYECTORES {CleaningInj === "Si" &&  `$${context.services.find( service => service.name == "cleanInj" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="CleaningAB"
              checked={CleaningAB === "Si"}
              onClick={obtenerInformacion}
              id="cleanAB"
            />
            <label htmlFor="cleanAB">LIMPIEZA DE CUERPO DE ACELERACIÓN {CleaningAB === "Si" &&  `$${context.services.find( service => service.name == "cleanAB" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="Oil"
              checked={Oil === "Si"}
              onClick={obtenerInformacion}
              id="changeOil"
            />
            <label htmlFor="changeOil">CAMBIO DE ACEITE {Oil === "Si" && `$${renderTotalProducts('oil')}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ChangeAirFiltter"
              checked={ChangeAirFiltter === "Si"}
              onClick={obtenerInformacion}
              id="changeAirFilter"
            />
            <label htmlFor="changeAirFilter">CAMBIO DE FILTRO DE AIRE {ChangeAirFiltter === "Si" && `$${renderTotalProducts('airFilter')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ChangeCabinAirFiltter"
              checked={ChangeCabinAirFiltter === "Si"}
              onClick={obtenerInformacion}
              id="changeCabineFilter"
            />
            <label htmlFor="changeCabineFilter">CAMBIO DE FILTRO DE AIRE DE CABINA {ChangeCabinAirFiltter === "Si" && `$${renderTotalProducts('cabineFilter')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ChangeOilFiltter"
              checked={ChangeOilFiltter === "Si"}
              onClick={obtenerInformacion}
              id="changeOilFilter"
            />
            <label htmlFor="changeOilFilter">CAMBIO DE FILTRO DE ACEITE {ChangeOilFiltter === "Si" && `$${renderTotalProducts('oilFilter')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="ChangeFuelFiltter"
              checked={ChangeFuelFiltter === "Si"}
              onClick={obtenerInformacion}
              id="changeFuelFilter"
            />
            <label htmlFor="changeFuelFilter">CAMBIO DE FILTRO DE GASOLINA {ChangeFuelFiltter === "Si" && `$${renderTotalProducts('fuelFilter')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="plugs"
              checked={plugs === "Si"}
              onClick={obtenerInformacion}
              id="sparkPlugs"
            />
            <label htmlFor="sparkPlugs">BUJÍAS {plugs === "Si" && `$${renderTotalProducts('sparkplug')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="wiresets"
              checked={wiresets === "Si"}
              onClick={obtenerInformacion}
              id="wireset"
            />
            <label htmlFor="wireset">JUEGO DE CABLES {wiresets === "Si" && `$${renderTotalProducts('wireset')}`}</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="coil"
              checked={coil === "Si"}
              onClick={obtenerInformacion}
              id="coils"
            />
            <label htmlFor="coils">BOBINAS {coil === "Si" &&  `$${context.services.find( service => service.name == "coil" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="antifreeze"
              checked={antifreeze === "Si"}
              onClick={obtenerInformacion}
              id="antifreeze-id"
            />
            <label htmlFor="antifreeze-id">ANTICONGELANTE {antifreeze === "Si" &&  `$${context.services.find( service => service.name == "antifreeze" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="transmission"
              checked={transmission === "Si"}
              onClick={obtenerInformacion}
              id="transmission-id"
            />
            <label htmlFor="transmission-id">CAMBIO DE ACEITE DE TRANSMISIÓN {transmission === "Si" &&  `$${context.services.find( service => service.name == "transmission" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="rectifyDisk"
              checked={rectifyDisk === "Si"}
              onClick={obtenerInformacion}
              id="rectifyDisk-id"
            />
            <label htmlFor="rectifyDisk-id">RECTIFICACIÓN DE DISCOS {rectifyDisk === "Si" &&  `$${context.services.find( service => service.name == "rectifyDisk" ).price}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="changeBrakeshoeFront"
              checked={changeBrakeshoeFront === "Si"}
              onClick={obtenerInformacion}
              id="changeBrakeshoeFront-id"
            />
            <label htmlFor="changeBrakeshoeFront-id">CAMBIO DE BALATAS DELANTERAS {changeBrakeshoeFront === "Si" &&  `$${renderTotalProducts('brakeshoeFront')}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="changeBrakeshoeBack"
              checked={changeBrakeshoeBack === "Si"}
              onClick={obtenerInformacion}
              id="changeBrakeshoeBack-id"
            />
            <label htmlFor="changeBrakeshoeBack-id">CAMBIO DE BALATAS TRASERAS {changeBrakeshoeBack === "Si" &&  `$${renderTotalProducts('brakeshoeBack')}` }</label>
          </div>
        </form>
      </div>
      <div className="third-window padding-top margin-bottom">
        <form className="form">
        {Oil === "Si" && (
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
            {presentation.value === "Suelto" && (
              <>
                <input 
                  value={lts}
                  onChange={handleinputLts}
                  className="input big margin-top"
                />
              </>
            )}
          </>
          )}
          {ChangeAirFiltter === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>F. DE AIRE</label>
              </div>
              <Select
                options={airFilterSelect}
                value={airFilter}
                onChange={handleSelectAirFilter}
                className="select"
              />
          </div>
          )}
          {ChangeCabinAirFiltter === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>F. DE CABINA</label>
              </div>
              <Select
                options={cabineFilterSelect} 
                value={cabineFilter}
                className="select"
                onChange={handleSelectCabineFilter}
              />
            </div>
          )}
          {ChangeOilFiltter === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>F. DE ACEITE</label>
              </div>
              <Select
                options={oilFilterSelect} 
                value={oilFilter}
                className="select"
                onChange={handleSelectOilFilter}
              />
            </div>
          )}
          {ChangeFuelFiltter === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>F. GASOLINA</label>
              </div>
              <Select
                options={fuelFilterSelect}
                value={fuelFilter}
                onChange={handleSelectFuelFilter}
                isDisabled={ChangeFuelFiltter === "No"}
                className="select" />
            </div>
          )}
          {plugs === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>BUJÍAS</label>
              </div>
              <Select
                options={sparkplugSelect}
                className="select"
                value={sparkplug}
                onChange={handleSelectSparkplug}
              />
            </div>
          )}
          {wiresets === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>CABLES</label>
              </div>
              <Select
                options={wiresetSelect}
                value={wireset}
                onChange={handleSelectWireset}
                className="select"
              />
            </div>
          )}
          {changeBrakeshoeFront === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>BALATAS D.</label>
              </div>
              <Select
                options={brakeshoeFrontSelect}
                className="select"
                value={brakeshoeFront}
                onChange={handleSelectBrakeshoeFront}
              />
            </div>
          )}
          {changeBrakeshoeBack === "Si" && (
            <div className="select-container big">
              <div className="label-container">
                  <label>BALATAS T.</label>
              </div>
              <Select
                options={brakeshoeBackSelect}
                className="select"
                value={brakeshoeBack}
                onChange={handleSelectBrakeshoeBack}
              />
            </div>
          )}
          <label>TELÉFONO</label>
          <input 
              className="input"
              value={phone}
              onChange={handlePhone}
            />
          <h2>NOTAS</h2>
          <textarea
            name="note"
            value={note}
            onChange={handleTextArea}
          />
          <button onClick={createPDF} className="btn-aspi">CREAR PDF</button>
          { renderBTNPDF && (
            <CreatePDF 
              aceite={{make: oilMake.value, type: oilType.value, viscosity: viscosity.value, presentation: presentation.value, name: oilName.value}}
              Oil={Oil}
              lts={lts}
              airFilter={ (ChangeAirFiltter === "Si" && airFilter )? airFilter.label : ''}
              oilFilter={ (ChangeOilFiltter === "Si" && oilFilter)? oilFilter.label : ''}
              fuelFilter={ (ChangeFuelFiltter === "Si" && fuelFilter) ? fuelFilter.label : ''}
              cabineFilter={ (ChangeCabinAirFiltter === "Si" && cabineFilter) ? cabineFilter.label : ''}
              cleanInj={CleaningInj}
              cleanAB={CleaningAB}
              sparkplug={(plugs === "Si" && sparkplug) ? sparkplug.label : ''}
              wiresets={(wiresets === "Si" && wireset) ? wireset.label : ''}
              brakeshoeBack={(changeBrakeshoeBack === "Si" && brakeshoeBack) ? brakeshoeBack.label : ''}
              brakeshoeFront={(changeBrakeshoeFront === "Si" && brakeshoeFront) ? brakeshoeFront.label : ''}
              coil={coil}
              antifreeze={antifreeze}
              transmission={transmission}
              note={note}
              total={total}
              rectifyDisk={rectifyDisk}
              orderToUpdate={order}
              phone={phone}
            />
          ) }
          
        </form>
      </div>
    </>
  );
};
export default Service;
