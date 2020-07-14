import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";

import CreatePDF from './CreatePDF'
import { appContext } from '../../context/Provider'

const Service = () => { 

  const context = useContext(appContext)

  const [airFilterSelect, setAirFilterSelect] = useState([]);
  const [oilFilterSelect, setOilFilterSelect] = useState([]);
  const [fuelFilterSelect, setFuelFilterSelect] = useState([]);
  const [cabineFilterSelect, setCabineFilterSelect] = useState([]);
  const [sparkplugSelect, setSparkplugSelect] = useState([]);
  const [wiresetSelect, setWiresetSelect] = useState([]);
  const [brakeshoeBackSelect, setBrakeshoeBackSelect] = useState([]);
  const [brakeshoeFrontSelect, setBrakeshoeFrontSelect] = useState([]);
  const [airFilter, setAirFilter] = useState({});
  const [oilFilter, setOilFilter] = useState({});
  const [fuelFilter, setFuelFilter] = useState({});
  const [cabineFilter, setCabineFilter] = useState({});
  const [sparkplug, setSparkplug] = useState({});
  const [wireset, setWireset] = useState({});
  const [brakeshoeBack, setBrakeshoeBack] = useState({});
  const [brakeshoeFront, setBrakeshoeFront] = useState({});

  useEffect(() => {
    if (context.car.airFilter) {

        let airFilters = context.filters.filter( filterDB => filterDB.filterType === "air" )
        let oilFilters = context.filters.filter( filterDB => filterDB.filterType === "oil" )
        let fuelFilters = context.filters.filter( filterDB => filterDB.filterType === "fuel" )
        let cabineFilters = context.filters.filter( filterDB => filterDB.filterType === "cabine" )

        let airFiltersSelect = []
        airFilters = airFilters.filter( filter => context.car.airFilter.some( airFilter => airFilter == filter.interfil )  )
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
        oilFilters = oilFilters.filter( filter => context.car.oilFilter.some( oilFilter => oilFilter == filter.interfil )  )
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
        fuelFilters = fuelFilters.filter( filter => context.car.fuelFilter.some( fuelFilter => fuelFilter == filter.interfil )  )
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
        cabineFilters = cabineFilters.filter( filter => context.car.cabineFilter.some( cabineFilter => cabineFilter == filter.interfil )  )
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
        let sparkplugsDB = context.sparkplugs.filter( sparkplugDB => context.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugNGK => sparkplug == sparkplugNGK ) )  )
        for(let i = 0; i < sparkplugsDB.length; i++){
          sparkplugSelect = [...sparkplugSelect, ...sparkplugsDB[i].NGK, ...sparkplugsDB[i].Champions, ...sparkplugsDB[i].ACD,
                            ...sparkplugsDB[i].Bosh, ...sparkplugsDB[i].Motorcraft]
          sparkplugSelect = sparkplugSelect.map( sparkplug => {
            if(typeof sparkplug === "object"){ return sparkplug }
            return { value: `${sparkplugsDB[i].price}-${Math.random().toString()}`, label: sparkplug };
          });
        }

        let wiresetSelect = []
        let wiresetsDB = context.wiresets.filter( wiresetDB => context.car.wiresets.some( wireset => wiresetDB.Roadstar.some( wiresetRoadstar => wireset == wiresetRoadstar ) )  )
        for(let i = 0; i < wiresetsDB.length; i++){
          wiresetSelect = [...wiresetSelect, ...wiresetsDB[i].NGK, ...wiresetsDB[i].LS, ...wiresetsDB[i].Roadstar, ...wiresetsDB[i].Bosh]
          wiresetSelect = wiresetSelect.map( wireset => {
            if(typeof wireset === "object"){ return wireset }
            return { value: `${wiresetsDB[i].price}-${Math.random().toString()}`, label: wireset };
          });
        }

        let brakeshoeBackSelect = []
        let brakeshoesBackDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
        for(let i = 0; i < brakeshoesBackDB.length; i++){
          brakeshoeBackSelect = [...brakeshoeBackSelect, ...brakeshoesBackDB[i].Wagner ]
          brakeshoeBackSelect = brakeshoeBackSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesBackDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }

        let brakeshoeFrontSelect = []
        let brakeshoesFrontDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
        for(let i = 0; i < brakeshoesFrontDB.length; i++){
          brakeshoeFrontSelect = [...brakeshoeFrontSelect, ...brakeshoesFrontDB[i].Wagner ]
          brakeshoeFrontSelect = brakeshoeFrontSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesFrontDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }
        
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

    }
  }, [context.car]);

  const optionOil = [
    { value: "Quacker", label: "Quacker" },
    { value: "Motorcracft", label: "Motorcracft" },
    { value: "Penzoil", label: "Penzoil" },
    { value: "Mobil", label: "Mobil" },
  ];
  const optionOillts = [
    { value: "1 lts", label: "1 lts" },
    { value: "2 lts", label: "2 lts" },
    { value: "3 lts", label: "3 lts" },
    { value: "4 lts", label: "4 lts" },
  ];

  const [datos, guardarDatos] = useState({
    CleaningInj: "No",
    CleaningAB: "No",
    aceite: optionOil[0],
    ChangeAirFiltter: "No",
    ChangeCabinAirFiltter: "No",
    Oil: "No",
    aceiteLts: optionOillts[0],
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
    aceite,
    aceiteLts,
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
    let total = getTotal()
    guardarDatos({
      ...datos,
      total
    })
  }, [plugs, changeBrakeshoeBack, changeBrakeshoeFront, wiresets, ChangeAirFiltter,
    ChangeCabinAirFiltter, ChangeFuelFiltter, ChangeFuelFiltter, ChangeOilFiltter,
    CleaningAB, CleaningInj, antifreeze, rectifyDisk, transmission, coil])

  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectOil = (newOil) => {
    guardarDatos({
      ...datos,
      aceite: newOil,
    });
  }

  const handleSelectOilLts = (newOilLts) => {
    guardarDatos({
      ...datos,
      aceiteLts: newOilLts,
    });
  }

  const getTotalProducts  =() => {
    let total = 0
    if(plugs === "Si"){ total += Number(sparkplug?.value.split('-')[0]) }
    if(ChangeAirFiltter === "Si"){ total += Number(airFilter.value.split('-')[0]) }
    if(ChangeOilFiltter === "Si"){ total += Number(oilFilter.value.split('-')[0]) }
    if(ChangeFuelFiltter === "Si"){ total += Number(fuelFilter.value.split('-')[0]) }
    if(ChangeCabinAirFiltter === "Si"){ total += Number(cabineFilter.value.split('-')[0]) }
    if(wiresets === "Si"){ total += Number(wireset?.value?.split('-')[0]) }
    if(changeBrakeshoeBack === "Si"){ total += Number(brakeshoeBack?.value.split('-')[0]) }
    if(changeBrakeshoeFront === "Si"){ total += Number(brakeshoeFront?.value.split('-')[0]) }
    return total
  }

  const createPDF = (e) => {
    e.preventDefault()
    guardarDatos({
      ...datos,
      renderBTNPDF: true
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

  const renderTotalProducts = product => {
    let total = 0
    switch(product){
      case "wireset":
        total += context.services.find( service => service.name === "wiresets" ).price
        if(wireset && wireset.value){ total += Number(wireset.value.split('-')[0]) }
        break;
      case "brakeshoeBack":
        total += context.services.find( service => service.name === "changeBrakeshoeBack" ).price
        if(brakeshoeBack && brakeshoeBack.value){ total += Number(brakeshoeBack.value.split('-')[0]) }
        break;
      case "brakeshoeFront":
        total += context.services.find( service => service.name === "changeBrakeshoeFront" ).price
        if(brakeshoeFront && brakeshoeFront.value){ total += Number(brakeshoeFront.value.split('-')[0]) }
        break;
      case "sparkplug":
        total += context.services.find( service => service.name === "plugs" ).price
        if(sparkplug && sparkplug.value){ total += Number(sparkplug.value.split('-')[0]) }
        break;
      case "fuelFilter":
        total += context.services.find( service => service.name === "changeFuelFilter" ).price
        if(fuelFilter && fuelFilter.value){ total += Number(fuelFilter.value.split('-')[0]) }
        break;
      case "airFilter":
        total += context.services.find( service => service.name === "changeAirFilter" ).price
        if(airFilter && airFilter.value){ total += Number(airFilter.value.split('-')[0]) }
        break;
      case "oilFilter":
        total += context.services.find( service => service.name === "changeOilFilter" ).price
        if(oilFilter && oilFilter.value){ total += Number(oilFilter.value.split('-')[0]) }
        break;
      case "cabineFilter":
        total += context.services.find( service => service.name === "changeCabineFilter" ).price
        if(cabineFilter && cabineFilter.value){ total += Number(cabineFilter.value.split('-')[0]) }
        break;

    }
    return total
  }

  return (
    <>
      <h3>Servicio</h3>
      <form>
        <div>
          <h4>Limpieza de inyectores {CleaningInj === "Si" &&  `$${services.findIndex( service => service.name === "cleanInj" ).price}` }</h4>
          <div >
            <input
              type="radio"
              name="CleaningInj"
              value="Si"
              checked={CleaningInj === "Si"}
              onChange={obtenerInformacion}
            />
            Si
            <input
              type="radio"
              name="CleaningInj"
              value="No"
              checked={CleaningInj === "No"}
              onChange={obtenerInformacion}
            />
            No
          </div>
        </div>
        <div>
          <h4>Limpieza de cuerpo de aceleracion {CleaningAB === "Si" &&  `$${services.findIndex( service => service.name === "cleanAB" ).price}` }</h4>
          <div>
            <input
              type="radio"
              name="CleaningAB"
              value="Si"
              checked={CleaningAB === "Si"}
              onChange={obtenerInformacion}
            />
            Si
            <input
              type="radio"
              name="CleaningAB"
              value="No"
              checked={CleaningAB === "No"}
              onChange={obtenerInformacion}
            />
            No
          </div>
          <div>
            <label>Aceite</label>
            <Select
              placeholder="Aceite"          
              value={aceite}
              options={optionOil}
              onChange={handleSelectOil}
              isDisabled={Oil === "No"}
            />
          </div>
          <div>
            <input
              type="radio"
              name="Oil"
              value="Si"
              checked={Oil === "Si"}
              onChange={obtenerInformacion}
            />
            Si
            <input
              type="radio"
              name="Oil"
              value="No"
              checked={Oil === "No"}
              onChange={obtenerInformacion}
            />
            No
          </div>
          <Select 
            options={optionOillts} 
            placeholder="Litros"             
            value={aceiteLts}
            onChange={handleSelectOilLts}
            isDisabled={Oil === "No"}
          />
        </div>
        <div>
          <h4>Filtro de Aire {ChangeAirFiltter === "Si" &&  `$${renderTotalProducts('airFilter')}` }</h4>
          <Select
            options={airFilterSelect}
            placeholder="Filtro de Aire"
            value={airFilter}
            onChange={handleSelectAirFilter}
            isDisabled={ChangeAirFiltter === "No"}
          />
        </div>
        <div>
          <input
            type="radio"
            name="ChangeAirFiltter"
            value="Si"
            checked={ChangeAirFiltter === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="ChangeAirFiltter"
            value="No"
            checked={ChangeAirFiltter === "No"} 
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Filtro de Aire Cabina {ChangeCabinAirFiltter === "Si" &&  `$${renderTotalProducts('cabineFilter')}` }</h4>
          <Select 
            options={cabineFilterSelect} 
            value={cabineFilter}
            placeholder="Filtro de Aire" 
            isDisabled={ChangeCabinAirFiltter === "No"}
            onChange={handleSelectCabineFilter}
          />
        </div>
        <div>
          <input
            type="radio"
            name="ChangeCabinAirFiltter"
            value="Si"
            checked={ChangeCabinAirFiltter === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="ChangeCabinAirFiltter"
            value="No"
            checked={ChangeCabinAirFiltter === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Filtro de Aceite {ChangeOilFiltter === "Si" &&  `$${renderTotalProducts('oilFilter')}` }</h4>
          <Select 
            options={oilFilterSelect} 
            value={oilFilter}
            placeholder="Filtro de Aceite" 
            isDisabled={ChangeOilFiltter === "No"}
            onChange={handleSelectOilFilter}
          />
        </div>
        <div>
          <input
            type="radio"
            name="ChangeOilFiltter"
            value="Si"
            checked={ChangeOilFiltter === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="ChangeOilFiltter"
            value="No"
            checked={ChangeOilFiltter === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
       <div>
          <h4>Filtro de Gasolina {ChangeFuelFiltter === "Si" &&  `$${renderTotalProducts('fuelFilter')}` }</h4>
          <Select
            options={fuelFilterSelect}
            placeholder="Filtro de Aceite"
            value={fuelFilter}
            onChange={handleSelectFuelFilter}
            isDisabled={ChangeFuelFiltter === "No"}
          />
        </div>
       <div>
          <input
            type="radio"
            name="ChangeFuelFiltter"
            value="Si"
            checked={ChangeFuelFiltter === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="ChangeFuelFiltter"
            value="No"
            checked={ChangeFuelFiltter === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Bujias {plugs === "Si" &&  `$${renderTotalProducts('sparkplug')}` }</h4>
           <Select
            options={sparkplugSelect}
            placeholder="Bujías"
            value={sparkplug}
            onChange={handleSelectSparkplug}
            isDisabled={plugs === "No"}
          />
          <input
            type="radio"
            name="plugs"
            value="Si"
            checked={plugs === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="plugs"
            value="No"
            checked={plugs === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>
            Juego de cables {wiresets === "Si" &&  `$${renderTotalProducts('wireset')}` }
          </h4>
          <Select
            options={wiresetSelect}
            placeholder="Juego de Cables"
            value={wireset}
            onChange={handleSelectWireset}
            isDisabled={wiresets === "No"}
          />
          <input
            type="radio"
            name="wiresets"
            value="Si"
            checked={wiresets === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="wiresets"
            value="No"
            checked={wiresets === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Bobinas {coil === "Si" &&  `$${context.services.find( service => service.name === "coil" ).price}` }</h4>
          <input
            type="radio"
            name="coil"
            value="Si"
            checked={coil === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="coil"
            value="No"
            checked={coil === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Anticongelante {antifreeze === "Si" &&  `$${context.services.find( service => service.name === "antifreeze" ).price}` }</h4>
          <input
            type="radio"
            name="antifreeze"
            value="Si"
            checked={antifreeze === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="antifreeze"
            value="No"
            checked={antifreeze === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Cambio de Aceite de Transmisión {transmission === "Si" &&  `$${context.services.find( service => service.name === "transmission" ).price}` }</h4>
          <input
            type="radio"
            name="transmission"
            value="Si"
            checked={transmission === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="transmission"
            value="No"
            checked={transmission === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Rectificación de Discos {rectifyDisk === "Si" &&  `$${context.services.find( service => service.name === "rectifyDisk" ).price}` }</h4>
          <input
            type="radio"
            name="rectifyDisk"
            value="Si"
            checked={rectifyDisk === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="rectifyDisk"
            value="No"
            checked={rectifyDisk === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Cambio de Balatas Delanteras {changeBrakeshoeFront === "Si" &&  `$${renderTotalProducts('brakeshoeFront')}` }</h4>
          <Select
            options={brakeshoeFrontSelect}
            placeholder="Juego de Cables"
            value={brakeshoeFront}
            onChange={handleSelectBrakeshoeFront}
            isDisabled={changeBrakeshoeFront === "No"}
          />
          <input
            type="radio"
            name="changeBrakeshoeFront"
            value="Si"
            checked={changeBrakeshoeFront === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="changeBrakeshoeFront"
            value="No"
            checked={changeBrakeshoeFront === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Cambio de Balatas Traseras {changeBrakeshoeBack === "Si" &&  `$${renderTotalProducts('brakeshoeBack')}` }</h4>
          <Select
            options={brakeshoeBackSelect}
            placeholder="Juego de Cables"
            value={brakeshoeBack}
            onChange={handleSelectBrakeshoeBack}
            isDisabled={changeBrakeshoeBack === "No"}
          />
          <input
            type="radio"
            name="changeBrakeshoeBack"
            value="Si"
            checked={changeBrakeshoeBack === "Si"}
            onChange={obtenerInformacion}
          />
          Si
          <input
            type="radio"
            name="changeBrakeshoeBack"
            value="No"
            checked={changeBrakeshoeBack === "No"}
            onChange={obtenerInformacion}
          />
          No
        </div>
        <div>
          <h4>Notas</h4>
          <textarea
            name="note"
            value={note}
            onChange={obtenerInformacion}
          />
        </div> 
        <button onClick={createPDF} className="btn btn-primary">CREAR PDF</button>
        { renderBTNPDF && (
          <CreatePDF 
            aceite={aceite.value}
            Oil={Oil}
            aceiteLts={aceiteLts.value}
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
          />
        ) }
        
      </form>
    </>
  );
};
export default Service;
