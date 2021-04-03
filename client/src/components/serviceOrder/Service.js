import React, { useState, useEffect, useContext } from "react";
import Select, { components } from "react-select";

import CreatePDF from './CreatePDF'
import ShopList from '../sells/ShopList'
import { appContext } from '../../context/Provider' 
import Toast from '../Toast';

const Service = ({order}) => {

  const colorStyles = {
    option: (styles, state) => {
        return {
            ...styles,
            backgroundColor: state.data.color,
            color: state.isFocused ? state.data.color === "rgb(50,50,50)" ? 'rgb(254, 177, 0)' : 'white' : 'black'
        };
    },
  };

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

  const colors = ["rgb(200,200,200)", "rgb(100,100,100)", "rgb(150,150,150)", "rgb(50,50,50)"]

  const context = useContext(appContext)

  const [airFilterSelect, setAirFilterSelect] = useState([]);
  const [oilFilterSelect, setOilFilterSelect] = useState([]);
  const [fuelFilterSelect, setFuelFilterSelect] = useState([]);
  const [cabineFilterSelect, setCabineFilterSelect] = useState([]);
  const [sparkplugSelect, setSparkplugSelect] = useState([]);
  const [wiresetSelect, setWiresetSelect] = useState([]);
  const [brakeshoeBackSelect, setBrakeshoeBackSelect] = useState([]);
  const [brakeshoeFrontSelect, setBrakeshoeFrontSelect] = useState([]);
  const [coilSelect, setCoilSelect] = useState([]);
  const [oilNames, setOilNames] = useState([]);
  const [antifreezeSpecifications, setAntifreezeSpecifications] = useState([]);
  const [products, setProducts] = useState([]);
  const [oilMakes, setOilMakes] = useState([]);
  const [oilTypes, setOilTypes] = useState([]);
  const [oilViscositys, setOilViscositys] = useState([]);
  const [oilPresentations, setOilPresentations] = useState([]);
  const [oilName, setOilName] = useState({});
  const [antifreezeSpecification, setAntifreezeSpecification] = useState({});
  const [coil, setCoil] = useState({});
  const [airFilter, setAirFilter] = useState({});
  const [oilFilter, setOilFilter] = useState({});
  const [fuelFilter, setFuelFilter] = useState({});
  const [cabineFilter, setCabineFilter] = useState({});
  const [sparkplug, setSparkplug] = useState({});
  const [wireset, setWireset] = useState({});
  const [brakeshoeBack, setBrakeshoeBack] = useState({});
  const [brakeshoeFront, setBrakeshoeFront] = useState({})
  const [viscosity, setViscosity] = useState(viscositySelect[0])
  const [presentation, setPresentation] = useState(oilPresentationSelect[0])
  const [oilMake, setOilMake] = useState({})
  const [oilType, setOilType] = useState(oilTypeSelect[0])
  const [antifreezePresentation, setAntifreezePresentation] = useState(antifreezePresentationSelect[0])
  const [antifreezeMake, setAntifreezeMake] = useState(antifreezeMakeSelect[0])
  const [antifreezeType, setAntifreezeType] = useState(antifreezeTypeSelect[0])
  const [phone, setPhone] = useState('')
  const [showList, setShowList] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

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
    changeCoil: "No",
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
    changeCoil,
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
        if(order){ airFilters = airFilters.filter( filter => order.car.airFilter.some( airFilter => airFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == airFilter ) ||
                                                filter.ACD.some( filterMake => filterMake == airFilter ) || filter.Fram.some( filterMake => filterMake == airFilter )  || 
                                                filter.Gonher.some( filterMake => filterMake == airFilter ) || filter.Motorcraft.some( filterMake => filterMake == airFilter ) ||
                                                filter.Purolator.some( filterMake => filterMake == airFilter ) || filter.Wix.some( filterMake => filterMake == airFilter ) || 
                                                filter.Mann.some( filterMake => filterMake == airFilter )  || filter.Sky.some( filterMake => filterMake == airFilter ) ||
                                                filter.Seineca.some( filterMake => filterMake == airFilter ) || filter.Walmi.some( filterMake => filterMake == airFilter ) || 
                                                filter.Roadstar.some( filterMake => filterMake == airFilter ) || filter.ECA.some( filterMake => filterMake == airFilter )) ) }
        else{ airFilters = airFilters.filter( filter => context.car.airFilter.some( airFilter => airFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == airFilter ) ||
          filter.ACD.some( filterMake => filterMake == airFilter ) || filter.Fram.some( filterMake => filterMake == airFilter )  || 
          filter.Gonher.some( filterMake => filterMake == airFilter ) || filter.Motorcraft.some( filterMake => filterMake == airFilter ) ||
          filter.Purolator.some( filterMake => filterMake == airFilter ) || filter.Wix.some( filterMake => filterMake == airFilter ) || 
          filter.Mann.some( filterMake => filterMake == airFilter )  || filter.Sky.some( filterMake => filterMake == airFilter ) ||
          filter.Seineca.some( filterMake => filterMake == airFilter ) || filter.Walmi.some( filterMake => filterMake == airFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == airFilter ) || filter.ECA.some( filterMake => filterMake == airFilter ) )  ) }
        for(let i = 0; i < airFilters.length; i++){
          airFiltersSelect = [...airFiltersSelect, airFilters[i].interfil, ...airFilters[i].OEM, ...airFilters[i].ACD,
                            ...airFilters[i].Fram, ...airFilters[i].Gonher, ...airFilters[i].Motorcraft, ...airFilters[i].Purolator,
                            ...airFilters[i].Wix, ...airFilters[i].Mann, ...airFilters[i].Sky, ...airFilters[i].Seineca, ...airFilters[i].Walmi,
                            ...airFilters[i].Joe, ...airFilters[i].Roadstar, ...airFilters[i].ECA]
          airFiltersSelect = airFiltersSelect.filter( filter => filter !== "" )
          airFiltersSelect = airFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${airFilters[i].price}-${Math.random().toString()}-${filter._id}`, label: filter, color: colors[i] };
          });
        }

        let oilFiltersSelect = []
        if(order){ oilFilters = oilFilters.filter( filter => order.car.oilFilter.some( oilFilter => oilFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == oilFilter ) ||
          filter.ACD.some( filterMake => filterMake == oilFilter ) || filter.Fram.some( filterMake => filterMake == oilFilter )  || 
          filter.Gonher.some( filterMake => filterMake == oilFilter ) || filter.Motorcraft.some( filterMake => filterMake == oilFilter ) ||
          filter.Purolator.some( filterMake => filterMake == oilFilter ) || filter.Wix.some( filterMake => filterMake == oilFilter ) || 
          filter.Mann.some( filterMake => filterMake == oilFilter )  || filter.Sky.some( filterMake => filterMake == oilFilter ) ||
          filter.Seineca.some( filterMake => filterMake == oilFilter ) || filter.Walmi.some( filterMake => filterMake == oilFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == oilFilter ) || filter.ECA.some( filterMake => filterMake == oilFilter ) )  ) }
        else{ oilFilters = oilFilters.filter( filter => context.car.oilFilter.some( oilFilter => oilFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == oilFilter ) ||
          filter.ACD.some( filterMake => filterMake == oilFilter ) || filter.Fram.some( filterMake => filterMake == oilFilter )  || 
          filter.Gonher.some( filterMake => filterMake == oilFilter ) || filter.Motorcraft.some( filterMake => filterMake == oilFilter ) ||
          filter.Purolator.some( filterMake => filterMake == oilFilter ) || filter.Wix.some( filterMake => filterMake == oilFilter ) || 
          filter.Mann.some( filterMake => filterMake == oilFilter )  || filter.Sky.some( filterMake => filterMake == oilFilter ) ||
          filter.Seineca.some( filterMake => filterMake == oilFilter ) || filter.Walmi.some( filterMake => filterMake == oilFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == oilFilter ) || filter.ECA.some( filterMake => filterMake == oilFilter ) )  ) }
        for(let i = 0; i < oilFilters.length; i++){
          oilFiltersSelect = [...oilFiltersSelect, oilFilters[i].interfil, ...oilFilters[i].OEM, ...oilFilters[i].ACD,
                            ...oilFilters[i].Fram, ...oilFilters[i].Gonher, ...oilFilters[i].Motorcraft, ...oilFilters[i].Purolator,
                            ...oilFilters[i].Wix, ...oilFilters[i].Mann, ...oilFilters[i].Sky, ...oilFilters[i].Seineca, ...oilFilters[i].Walmi,
                            ...oilFilters[i].Joe, ...oilFilters[i].Roadstar, ...oilFilters[i].ECA]
          oilFiltersSelect = oilFiltersSelect.filter( filter => filter !== "" )
          oilFiltersSelect = oilFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${oilFilters[i].price}-${Math.random().toString()}-${filter._id}`, label: filter, color: colors[i] };
          });
        }

        let fuelFiltersSelect = []
        if(order){ fuelFilters = fuelFilters.filter( filter => order.car.fuelFilter.some( fuelFilter => fuelFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == fuelFilter ) ||
          filter.ACD.some( filterMake => filterMake == fuelFilter ) || filter.Fram.some( filterMake => filterMake == fuelFilter )  || 
          filter.Gonher.some( filterMake => filterMake == fuelFilter ) || filter.Motorcraft.some( filterMake => filterMake == fuelFilter ) ||
          filter.Purolator.some( filterMake => filterMake == fuelFilter ) || filter.Wix.some( filterMake => filterMake == fuelFilter ) || 
          filter.Mann.some( filterMake => filterMake == fuelFilter )  || filter.Sky.some( filterMake => filterMake == fuelFilter ) ||
          filter.Seineca.some( filterMake => filterMake == fuelFilter ) || filter.Walmi.some( filterMake => filterMake == fuelFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == fuelFilter ) || filter.ECA.some( filterMake => filterMake == fuelFilter ) )  ) }
        else{ fuelFilters = fuelFilters.filter( filter => context.car.fuelFilter.some( fuelFilter => fuelFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == fuelFilter ) ||
          filter.ACD.some( filterMake => filterMake == fuelFilter ) || filter.Fram.some( filterMake => filterMake == fuelFilter )  || 
          filter.Gonher.some( filterMake => filterMake == fuelFilter ) || filter.Motorcraft.some( filterMake => filterMake == fuelFilter ) ||
          filter.Purolator.some( filterMake => filterMake == fuelFilter ) || filter.Wix.some( filterMake => filterMake == fuelFilter ) || 
          filter.Mann.some( filterMake => filterMake == fuelFilter )  || filter.Sky.some( filterMake => filterMake == fuelFilter ) ||
          filter.Seineca.some( filterMake => filterMake == fuelFilter ) || filter.Walmi.some( filterMake => filterMake == fuelFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == fuelFilter ) || filter.ECA.some( filterMake => filterMake == fuelFilter ) )  ) }
        for(let i = 0; i < fuelFilters.length; i++){
          fuelFiltersSelect = [...fuelFiltersSelect, fuelFilters[i].interfil, ...fuelFilters[i].OEM, ...fuelFilters[i].ACD,
                            ...fuelFilters[i].Fram, ...fuelFilters[i].Gonher, ...fuelFilters[i].Motorcraft, ...fuelFilters[i].Purolator,
                            ...fuelFilters[i].Wix, ...fuelFilters[i].Mann, ...fuelFilters[i].Sky, ...fuelFilters[i].Seineca, ...fuelFilters[i].Walmi,
                            ...fuelFilters[i].Joe, ...fuelFilters[i].Roadstar, ...fuelFilters[i].ECA]
          fuelFiltersSelect = fuelFiltersSelect.filter( filter => filter !== "" )
          fuelFiltersSelect = fuelFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${fuelFilters[i].price}-${Math.random().toString()}-${filter._id}`, label: filter, color: colors[i] };
          });
        }

        let cabineFiltersSelect = []
        if(order){ cabineFilters = cabineFilters.filter( filter => order.car.cabineFilter.some( cabineFilter => cabineFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == cabineFilter ) ||
          filter.ACD.some( filterMake => filterMake == cabineFilter ) || filter.Fram.some( filterMake => filterMake == cabineFilter )  || 
          filter.Gonher.some( filterMake => filterMake == cabineFilter ) || filter.Motorcraft.some( filterMake => filterMake == cabineFilter ) ||
          filter.Purolator.some( filterMake => filterMake == cabineFilter ) || filter.Wix.some( filterMake => filterMake == cabineFilter ) || 
          filter.Mann.some( filterMake => filterMake == cabineFilter )  || filter.Sky.some( filterMake => filterMake == cabineFilter ) ||
          filter.Seineca.some( filterMake => filterMake == cabineFilter ) || filter.Walmi.some( filterMake => filterMake == cabineFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == cabineFilter ) || filter.ECA.some( filterMake => filterMake == cabineFilter ) )  ) }
        else{ cabineFilters = cabineFilters.filter( filter => context.car.cabineFilter.some( cabineFilter => cabineFilter === filter.interfil || filter.OEM.some( filterMake => filterMake == cabineFilter ) ||
          filter.ACD.some( filterMake => filterMake == cabineFilter ) || filter.Fram.some( filterMake => filterMake == cabineFilter )  || 
          filter.Gonher.some( filterMake => filterMake == cabineFilter ) || filter.Motorcraft.some( filterMake => filterMake == cabineFilter ) ||
          filter.Purolator.some( filterMake => filterMake == cabineFilter ) || filter.Wix.some( filterMake => filterMake == cabineFilter ) || 
          filter.Mann.some( filterMake => filterMake == cabineFilter )  || filter.Sky.some( filterMake => filterMake == cabineFilter ) ||
          filter.Seineca.some( filterMake => filterMake == cabineFilter ) || filter.Walmi.some( filterMake => filterMake == cabineFilter ) || 
          filter.Roadstar.some( filterMake => filterMake == cabineFilter ) || filter.ECA.some( filterMake => filterMake == cabineFilter ) )  ) }
        for(let i = 0; i < cabineFilters.length; i++){
          cabineFiltersSelect = [...cabineFiltersSelect, cabineFilters[i].interfil, ...cabineFilters[i].OEM, ...cabineFilters[i].ACD,
                            ...cabineFilters[i].Fram, ...cabineFilters[i].Gonher, ...cabineFilters[i].Motorcraft, ...cabineFilters[i].Purolator,
                            ...cabineFilters[i].Wix, ...cabineFilters[i].Mann, ...cabineFilters[i].Sky, ...cabineFilters[i].Seineca, ...cabineFilters[i].Walmi,
                            ...cabineFilters[i].Joe, ...cabineFilters[i].Roadstar, ...cabineFilters[i].ECA]
          cabineFiltersSelect = cabineFiltersSelect.filter( filter => filter !== "" )
          cabineFiltersSelect = cabineFiltersSelect.map( filter => {
            if(typeof filter === "object"){ return filter }
            return { value: `${cabineFilters[i].price}-${Math.random().toString()}-${filter._id}`, label: filter, color: colors[i] };
          });
        }

        let sparkplugSelect = []
        let sparkplugsDB = []
        if(order){ sparkplugsDB = context.sparkplugs.filter( sparkplugDB => order.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugMake => sparkplug == sparkplugMake ) || 
                            sparkplugDB.Champions.some( sparkplugMake => sparkplug == sparkplugMake ) || sparkplugDB.ACD.some( sparkplugMake => sparkplug == sparkplugMake ) ||
                            sparkplugDB.Bosh.some( sparkplugMake => sparkplug == sparkplugMake ) || sparkplugDB.Motorcraft.some( sparkplugMake => sparkplug == sparkplugMake )  )) }
        else{ sparkplugsDB = context.sparkplugs.filter( sparkplugDB => context.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugMake => sparkplug == sparkplugMake ) || 
                            sparkplugDB.Champions.some( sparkplugMake => sparkplug == sparkplugMake ) || sparkplugDB.ACD.some( sparkplugMake => sparkplug == sparkplugMake ) ||
                            sparkplugDB.Bosh.some( sparkplugMake => sparkplug == sparkplugMake ) || sparkplugDB.Motorcraft.some( sparkplugMake => sparkplug == sparkplugMake  )  ) )}
        for(let i = 0; i < sparkplugsDB.length; i++){
          sparkplugSelect = [...sparkplugSelect, ...sparkplugsDB[i].NGK, ...sparkplugsDB[i].Champions, ...sparkplugsDB[i].ACD,
                            ...sparkplugsDB[i].Bosh, ...sparkplugsDB[i].Motorcraft]
          sparkplugSelect = sparkplugSelect.filter( sparkplug => sparkplug !== "" )
          sparkplugSelect = sparkplugSelect.map( sparkplug => {
            if(typeof sparkplug === "object"){ return sparkplug }
            return { value: `${sparkplugsDB[i].price}-${Math.random().toString()}-${sparkplug._id}`, label: sparkplug, color: colors[i] };
          });
        }

        let wiresetSelect = []
        let wiresetsDB = []
        if(order){ wiresetsDB = context.wiresets.filter( wiresetDB => order.car.wiresets.some( wireset => wiresetDB.NGK.some( wiresetMake => wireset == wiresetMake ) || 
          wiresetDB.LS.some( wiresetMake => wireset == wiresetMake ) || wiresetDB.Roadstar.some( wiresetMake => wireset == wiresetMake ) ||
          wiresetDB.Bosh.some( wiresetMake => wireset == wiresetMake ) )  ) }
        else{ wiresetsDB = context.wiresets.filter( wiresetDB => context.car.wiresets.some( wireset => wiresetDB.NGK.some( wiresetMake => wireset == wiresetMake ) || 
          wiresetDB.LS.some( wiresetMake => wireset == wiresetMake ) || wiresetDB.Roadstar.some( wiresetMake => wireset == wiresetMake ) ||
          wiresetDB.Bosh.some( wiresetMake => wireset == wiresetMake ) )  ) }
        for(let i = 0; i < wiresetsDB.length; i++){
          wiresetSelect = [...wiresetSelect, ...wiresetsDB[i].NGK, ...wiresetsDB[i].LS, ...wiresetsDB[i].Roadstar, ...wiresetsDB[i].Bosh]
          wiresetSelect = wiresetSelect.filter( wireset => wireset !== "" )
          wiresetSelect = wiresetSelect.map( wireset => {
            if(typeof wireset === "object"){ return wireset }
            return { value: `${wiresetsDB[i].price}-${Math.random().toString()}-${wireset._id}`, label: wireset, color: colors[i] };
          });
        }

        let brakeshoeBackSelect = []
        let brakeshoesBackDB = []
        if(order){ brakeshoesBackDB = context.brakeshoes.filter( brakeshoeDB => order.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        else{ brakeshoesBackDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        for(let i = 0; i < brakeshoesBackDB.length; i++){
          brakeshoeBackSelect = [...brakeshoeBackSelect, ...brakeshoesBackDB[i].Wagner ]
          brakeshoeBackSelect = brakeshoeBackSelect.filter( brakeshoe => brakeshoe !== "" )
          brakeshoeBackSelect = brakeshoeBackSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesBackDB[i].price}-${Math.random().toString()}-${brakeshoe._id}`, label: brakeshoe, color: colors[i] };
          });
        }

        let brakeshoeFrontSelect = []
        let brakeshoesFrontDB = []
        if(order){ brakeshoesFrontDB = context.brakeshoes.filter( brakeshoeDB => order.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        else{ brakeshoesFrontDB = context.brakeshoes.filter( brakeshoeDB => context.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  ) }
        for(let i = 0; i < brakeshoesFrontDB.length; i++){
          brakeshoeFrontSelect = [...brakeshoeFrontSelect, ...brakeshoesFrontDB[i].Wagner ]
          brakeshoeFrontSelect = brakeshoeFrontSelect.filter( brakeshoe => brakeshoe !== "" )
          brakeshoeFrontSelect = brakeshoeFrontSelect.map( brakeshoe => {
            if(typeof brakeshoe === "object"){ return brakeshoe }
            return { value: `${brakeshoesFrontDB[i].price}-${Math.random().toString()}-${brakeshoe._id}`, label: brakeshoe, color: colors[i] };
          });
        }

        let coilSelect = []
        let coilDB = []
        if(order){ coilDB = context.coils.filter( coilDB => order.car.coil.some( coil => coilDB.Injecth.some( coilInjecth => coil == coilInjecth ) || coilDB.Kem.some( coilKem => coil == coilKem ) )  ) }
        else{ coilDB = context.coils.filter( coilDB => context.car.coil.some( coil => coilDB.Injecth.some( coilInjecth => coil == coilInjecth ) || coilDB.Kem.some( coilKem => coil == coilKem ) )  ) }
        for(let i = 0; i < coilDB.length; i++){
          coilSelect = [...coilSelect, ...coilDB[i].Injecth, ...coilDB[i].Kem ]
          coilSelect = coilSelect.filter( coil => coil !== "" )
          coilSelect = coilSelect.map( coil => {
            if(typeof coil === "object"){ return coil }
            return { value: `${coilDB[i].price}-${Math.random().toString()}-${coil._id}`, label: coil, color: colors[i] };
          });
        }

        let oilMakesSelect = [... new Set(context.oils.map( item => item.make ))]
        oilMakesSelect = oilMakesSelect.map( item => { return { value: item, label: item } } )

        airFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        oilFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        fuelFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        cabineFiltersSelect.push({ value: 'none', label: 'SIN FILTRO' })
        sparkplugSelect.push({ value: 'none', label: 'SIN BUJÍA' })
        wiresetSelect.push({ value: 'none', label: 'SIN CABLES' })
        brakeshoeBackSelect.push({ value: 'none', label: 'SIN BALATA' })
        brakeshoeFrontSelect.push({ value: 'none', label: 'SIN BALATA' })
        coilSelect.push({ value: 'none', label: 'SIN BOBINA' })
        
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
        setCoilSelect(coilSelect)
        setCoil(coilSelect[0])
        setOilMakes(oilMakesSelect)
        if(!order){ setOilMake(oilMakesSelect[0]) }

        if(order && context.services.length !== 0){
          let newDatos = { note: order.note }
          if(order.phone){ setPhone(order.phone) }
          if(order.antifreeze === "Si"){ newDatos.antifreeze = "Si" }
          if(order.cleanAB === "Si"){ newDatos.CleaningAB = "Si" }
          if(order.cleanInj === "Si"){ newDatos.CleaningInj = "Si" }
          if(order.transmission === "Si"){ newDatos.transmission = "Si" }
          if(order.brakeshoeBack == "Si"){ newDatos.changeBrakeshoeBack = "Si" }
          if(order.coil === "Si"){ newDatos.changeCoil = "Si" }
          if(order.brakeshoeFront === "Si"){ newDatos.changeBrakeshoeFront = "Si" }
          if(order.airFilter === "Si"){ newDatos.ChangeAirFiltter = "Si" }
          if(order.oilFilter === "Si"){ newDatos.ChangeOilFiltter = "Si" }
          if(order.fuelFilter === "Si"){ newDatos.ChangeFuelFiltter = "Si" }
          if(order.cabineFilter === "Si"){ newDatos.ChangeCabinAirFiltter = "Si" }
          if(order.sparkplug === "Si"){ newDatos.plugs = "Si" }
          if(order.wiresets === "Si"){ newDatos.plugs = "Si" }
          if(order.oil === "Si"){ newDatos.Oil = "Si" }
          if(order.antifreeze === "Si"){ newDatos.antifreeze = "Si" }
          context.dispatchProductsPrice({ type: 'SET', value: order.products })
          updateProductsFromOrder(order.products)
          guardarDatos({
            ...datos,
            ...newDatos
          })
        }

    }
  }, [context.car, context.services, context.filters, context.coils, context.oils]);


  useEffect(() => {
      if(JSON.stringify(oilMake) !== "{}" && oilMake){
        let oilsViscosity = context.oils.filter( item => item.make === oilMake?.value )
        oilsViscosity = [... new Set(oilsViscosity.map(item => item.viscosity))]
        oilsViscosity = oilsViscosity.map(item => {  return { value: item, label: item } })
        setOilViscositys(oilsViscosity)
        if(!order){ setViscosity(oilsViscosity[0]) }
      }
  }, [oilMake, context.oils])

  useEffect(() => {
    if(JSON.stringify(oilMake) !== "{}" && JSON.stringify(viscosity) !== "{}" && oilMake && viscosity){
      console.log('a')
      let oilsPresentation = context.oils.filter( item => item.make === oilMake?.value && item.viscosity === viscosity?.value )
      oilsPresentation = [... new Set(oilsPresentation.map(item => item.presentation))]
      oilsPresentation = oilsPresentation.map(item => {  return { value: item, label: item } })
      oilsPresentation.push({ value: 'none', label: 'SIN ACEITE' })
      setOilPresentations(oilsPresentation)
      if(!order){ setPresentation(oilsPresentation[0]) }
    }
  }, [oilMake, viscosity, context.oils])

  useEffect(() => {
    if(JSON.stringify(oilMake) !== "{}" && JSON.stringify(viscosity) !== "{}" && JSON.stringify(presentation) !== "{}" && oilMake && viscosity && presentation){
      let oilsType = context.oils.filter( item => item.make === oilMake?.value && item.viscosity === viscosity?.value && item.presentation === presentation?.value )
      oilsType = [... new Set(oilsType.map(item => item.oilType))]
      oilsType = oilsType.map(item => {  return { value: item, label: item } })
      setOilTypes(oilsType)
      if(!order){ setOilType(oilsType[0]) }
    }
  }, [oilMake, viscosity, presentation, context.oils])

  useEffect(() => {
    if(Oil === "Si"){
      let oils = context.oils.filter( oilDB => oilDB.make == oilMake?.value && oilDB.oilType == oilType?.value && oilDB.presentation == presentation?.value && oilDB.viscosity == viscosity?.value)
      oils = oils.map( oil => {
        return { value: oil.name ? oil.name : 'none', label: oil.name ? oil.name : 'SIN NOMBRE' }
      }) 
      setOilNames(oils)
      if(oils.length !== 0){ setOilName(oils[0]) }
      else{  setOilName({ value: 'none', label: 'SIN NOMBRE' }) }
    }
  }, [oilMake, oilType, presentation, viscosity, Oil])

  useEffect(() => {
    if(antifreeze === "Si"){
      let antifreezes = context.antifreezes.filter( antifreezeDB => antifreezeDB.antifreezeMake == antifreezeMake.value && antifreezeDB.antifreezePresentation == antifreezePresentation.value && 
        antifreezeDB.antifreezeType == antifreezeType.value)
        antifreezes = antifreezes.map( antifreeze => {
        return { value: antifreeze.specification ? antifreeze.specification : 'none', label: antifreeze.specification ? antifreeze.specification : 'SIN ESPECIFICACIONES' }
      }) 
      setAntifreezeSpecifications(antifreezes)
      if(antifreezes.length !== 0){ setAntifreezeSpecification(antifreezes[0]) }
      else{ setAntifreezeSpecification({ value: 'none', label: 'SIN ESPECIFICACIONES' }) }
    }
  }, [antifreezeMake, antifreezePresentation, antifreezeType, antifreeze])

  const updateProductsFromOrder = products => {
    for(let i = 0; i < products.length; i++){
      switch(products[i].product.type){
        case "wireset":
          let wireset = wiresetSelect.find( w => w.label == products[i]._id )
          setWireset(wireset)
          break;
        case "coil":
          let coil = coilSelect.find( c => c.label == products[i]._id )
          setCoil(coil)
          break;
        case "brakeshoeBack":
          let brakeshoeBack = brakeshoeBackSelect.find( b => b.label == products[i]._id )
          setBrakeshoeBack(brakeshoeBack)
          break;
        case "brakeshoeFront":
          let brakeshoeFron = brakeshoeFrontSelect.find( b => b.label == products[i]._id )
          setBrakeshoeFront(brakeshoeFron)
          break;
        case "sparkplug":
          let sparkplug = sparkplug.find( s => s.label == products[i]._id )
          setSparkplug(sparkplug)
          break;
        case "fuelFilter":
          let fuelFilter = fuelFilterSelect.find( f => f.label == products[i]._id )
          setFuelFilter(fuelFilter)
          break;
        case "airFilter":
          let airFilter = airFilterSelect.find( f => f.label == products[i]._id )
          setAirFilter(airFilter)
          break;
        case "oilFilter":
          let oilFilter = oilFilterSelect.find( f => f.label == products[i]._id )
          setOilFilter(oilFilter)
          break;
        case "cabineFilter":
          let cabineFilter = cabineFilterSelect.find( f => f.label == products[i]._id )
          setCabineFilter(cabineFilter)
          break;
        case "oil":
          let makeOilProduct = products[i].product.name.split('_')[0]
          let visocsityOilProduct = products[i].product.name.split('_')[1]
          let presentationOilProduct = products[i].product.name.split('_')[2]
          let typeOilProduct = products[i].product.name.split('_')[3]
          let nameOilProduct = products[i].product.name.split('_')[4]
          let makeOil = oilMakeSelect.find( i => i.value == makeOilProduct )
          let viscosityOil = viscositySelect.find( i => i.value == visocsityOilProduct )
          let presentationOil = oilPresentationSelect.find( i => i.value == presentationOilProduct )
          let typeOil = oilTypeSelect.find( i => i.value == typeOilProduct )
          setOilMake(makeOil)
          setViscosity(viscosityOil)
          setPresentation(presentationOil)
          setOilType(typeOil)
          if(nameOilProduct){
            let nameOil = oilNames.find( i => i.value == nameOilProduct)
            setOilName(nameOil)
          }
          break;
        case "antifreeze":
          let makeAntifreezeProduct = products[i].product.name.split('_')[0]
          let presentationAntifreezeProduct = products[i].product.name.split('_')[1]
          let typeAntifreezeProduct = products[i].product.name.split('_')[2]
          let specificationAntifreezeProduct = products[i].product.name.split('_')[3]
          let makeAntifreeze = antifreezeMakeSelect.find( i => i.value == makeAntifreezeProduct )
          let presentationAntifreeze = antifreezePresentationSelect.find( i => i.value == presentationAntifreezeProduct )
          let typeAntifreeze = antifreezeTypeSelect.find( i => i.value == typeAntifreezeProduct )
          setAntifreezeMake(makeAntifreeze)
          setAntifreezePresentation(presentationAntifreeze)
          setAntifreezeType(typeAntifreeze)
          setOilType(typeOil)
          if(specificationAntifreezeProduct){
            let specificationAntifreeze = antifreezeSpecifications.find( i => i.value == specificationAntifreezeProduct)
            setAntifreezeSpecification(specificationAntifreeze)
          }
          break;
      }
    }
  }

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
      case "changeCoil": return changeCoil
      case "antifreeze": return antifreeze
      case "transmission": return transmission
      case "rectifyDisk": return rectifyDisk
      case "changeBrakeshoeFront": return changeBrakeshoeFront
      case "changeBrakeshoeBack": return changeBrakeshoeBack
    }
  }

  const createPDF = (e) => {
    e.preventDefault()
    guardarDatos({
      ...datos,
      renderBTNPDF: true,
    });
  }

  const getTotalServices = () => {
    const services = context.services
    let total = 0
    if(CleaningAB === "Si"){
        let idx = services.findIndex( service => service.name === "cleanAB" )
        total += services[idx].price
    }if(CleaningInj === "Si"){
        let idx = services.findIndex( service => service.name === "cleanInj" )
        total += services[idx].price
    }if(transmission === "Si"){
        let idx = services.findIndex( service => service.name === "transmission" )
        total += services[idx].price
    }if(changeCoil === "Si"){
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

  const handleSelectCoil = newValue => setCoil(newValue)

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

  const handleSelectAntifreezeType = newValue => setAntifreezeType(newValue)

  const handleSelectAntifreezeMake = newValue => setAntifreezeMake(newValue)

  const handleSelectAntifrezePresentation = newValue => setAntifreezePresentation(newValue)

  const handleSelectAntifrezeSpecification = newValue => setAntifreezeSpecification(newValue)

  const handlePhone = e => setPhone(e.target.value.replace( /[^0-9]/g, ''))

  const getTotalProducts = product => {
    let total = 0
    for(let i=0; i < context.productsPrice.length; i++){
      if(context.productsPrice[i].product.type == product){ total += context.productsPrice[i].price * context.productsPrice[i].quantity }
    }
    return total
  }

  const renderTotalProducts = product => {
    let total = 0
    total += getTotalProducts(product)
    switch(product){
      case "wireset":
        total += context.services.find( service => service.name === "wiresets" ).price
        break;
      case "coil":
        total += context.services.find( service => service.name === "coil" ).price
        break;
      case "brakeshoeBack":
        total += context.services.find( service => service.name === "changeBrakeshoeBack" ).price
        break;
      case "brakeshoeFront":
        total += context.services.find( service => service.name === "changeBrakeshoeFront" ).price
        break;
      case "sparkplug":
        total += context.services.find( service => service.name === "plugs" ).price
        break;
      case "fuelFilter":
        total += context.services.find( service => service.name === "changeFuelFilter" ).price
        break;
      case "airFilter":
        total += context.services.find( service => service.name === "changeAirFilter" ).price
        break;
      case "oilFilter":
        total += context.services.find( service => service.name === "changeOilFilter" ).price
        break;
      case "cabineFilter":
        total += context.services.find( service => service.name === "changeCabineFilter" ).price
        break;
      case "oil":
        total += context.services.find( service => service.name === "changeOil" ).price
        break;
      case "antifreeze":
        total += context.services.find( service => service.name === "antifreeze" ).price
        break;
    }
    return total.toFixed(2)
  }

  const showShopList = e => {
    e.preventDefault()
    setShowList(true)
  }

  const closeShopList = () => setShowList(false)

  const addProducts = (product) => {
    let newProducts = [...products]
    let idx = newProducts.findIndex( p => p._id == product._id)
    if(idx < 0){
      newProducts.push(product)
      setProducts(newProducts)
      showToast()
    }
  }

  const removeProduct = productDeleted => {
    let newProductsList = [...products]
    let idx = newProductsList.findIndex( product => product._id == productDeleted._id )
    newProductsList.splice(idx, 1)
    setProducts(newProductsList)
  }

  const showToast = () => {
    setToastOpen(true)
    setTimeout(() => {
        setToastOpen(false)
    }, 2000);
  }

  const addProductToShopList = (e, product) => {
    e.preventDefault()
    switch(product){
      case "oil":
        let oil = context.oils.find( oilDB => oilDB.make == oilMake.value && oilDB.oilType == oilType.value && oilDB.presentation == presentation.value && oilDB.viscosity == viscosity.value && (oilName.value === "none" ? true : (oilDB.name == oilName.value)))
        if(oil){ addProducts({ name: `${oil.make}_${oil.viscosity}_${oil.presentation}_${oil.oilType}${oil.name ? `_${oil.name}`: ''}`, price: oil.price, _id: oil._id, type: product }) }
        else{ alert('No se ha encontrado ningún aceite que cumpla con esas características') }
        break;
      case "antifreeze":
        let antifreeze = context.antifreezes.find( antifreezeDB => antifreezeDB.antifreezeMake == antifreezeMake.value && antifreezeDB.antifreezePresentation == antifreezePresentation.value && 
          antifreezeDB.antifreezeType == antifreezeType.value && (antifreezeSpecification.value === "none" ? true : (antifreezeDB.specification == antifreezeSpecification.value)))
        if(antifreeze){ addProducts({ name: `${antifreeze.antifreezeMake}_${antifreeze.antifreezeType}_${antifreeze.antifreezePresentation}_${antifreeze.specification ? `_${antifreeze.specification}`: ''}`, price: antifreeze.price, _id: antifreeze._id, type: product }) }
        else{ alert('No se ha encontrado ningún anticongelante que cumpla con esas características') }
        break;
      case "airFilter":
        if(airFilter.value !== "none"){
          addProducts({ name: airFilter.label, price: Number(airFilter.value.split('-')[0]), _id: airFilter.label, type: product })
        }
        break;
      case "oilFilter":
        if(oilFilter.value !== "none"){
          addProducts({ name: oilFilter.label, price: Number(oilFilter.value.split('-')[0]), _id: oilFilter.label, type: product })
        }
        break;
      case "fuelFilter":
        if(fuelFilter.value !== "none"){
          addProducts({ name: fuelFilter.label, price: Number(fuelFilter.value.split('-')[0]), _id: fuelFilter.label, type: product })
        }
        break;
      case "cabineFilter":
        if(cabineFilter.value !== "none"){
          addProducts({ name: cabineFilter.label, price: Number(cabineFilter.value.split('-')[0]), _id: cabineFilter.label, type: product })
        }
        break;
      case "sparkplug":
        if(sparkplug.value !== "none"){
          addProducts({ name: sparkplug.label, price: Number(sparkplug.value.split('-')[0]), _id: sparkplug.label, type: product })
        }
        break;
      case "wiresets":
        if(wireset.value !== "none"){
          addProducts({ name: wireset.label, price: Number(wireset.value.split('-')[0]), _id: wireset.label, type: product })
        }
        break;
      case "brakeshoeBack":
        if(brakeshoeBack.value !== "none"){
          addProducts({ name: brakeshoeBack.label, price: Number(brakeshoeBack.value.split('-')[0]), _id: brakeshoeBack.label, type: product })
        }
        break;
      case "brakeshoeFront":
        if(brakeshoeFront.value !== "none"){
          addProducts({ name: brakeshoeFront.label, price: Number(brakeshoeFront.value.split('-')[0]), _id: brakeshoeFront.label, type: product })
        }
        break;
      case "coil":
        if(coil.value !== "none"){
          addProducts({ name: coil.label, price: Number(coil.value.split('-')[0]), _id: coil.label, type: product })
        }
        break;

    }
  }

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
              name="changeCoil"
              checked={changeCoil === "Si"}
              onClick={obtenerInformacion}
              id="changeCoil"
            />
            <label htmlFor="changeCoil">BOBINAS {changeCoil === "Si" &&  `$${renderTotalProducts('coil')}` }</label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="antifreeze"
              checked={antifreeze === "Si"}
              onClick={obtenerInformacion}
              id="antifreeze-id"
            />
            <label htmlFor="antifreeze-id">ANTICONGELANTE {antifreeze === "Si" &&  `$${renderTotalProducts('antifreeze')}` }</label>
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
          <div className="service-products-container">
            <div className="direction-column width-90">
              {presentation.value !== "none" && (
                <>
                <div className="select-container big">
                  <div className="label-container">
                      <label>ACEITE</label>
                  </div>
                  <Select        
                    value={oilMake}
                    options={oilMakes}
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
                    options={oilViscositys}
                    onChange={handleSelectViscosity}
                    className="select"
                  />
                </div>
                </>
              )}
              <div className="select-container big">
                <div className="label-container">
                    <label>PRESENTACIÓN</label>
                </div>
                <Select        
                  value={presentation}
                  options={oilPresentations}
                  onChange={handleSelectPresentation}
                  className="select"
                />
              </div>
              {presentation.value !== "none" && (
                <>
                <div className="select-container big">
                  <div className="label-container">
                      <label>TIPO</label>
                  </div>
                  <Select        
                    value={oilType}
                    options={oilTypes}
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
                </>
              )}
            </div>
            <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'oil')}>+</button>
          </div>
          )}
          {antifreeze === "Si" && (
          <div className="service-products-container">
            <div className="direction-column width-90">
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
            </div>
            <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'antifreeze')}>+</button>
          </div>
          )}
          {ChangeAirFiltter === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big"> 
                  <div className="label-container">
                      <label>F. DE AIRE</label>
                  </div>
                  <Select
                    options={airFilterSelect}
                    styles={colorStyles}
                    value={airFilter}
                    onChange={handleSelectAirFilter}
                    className="select"
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'airFilter')}>+</button>
            </div>
          )}
          {ChangeCabinAirFiltter === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>F. DE CABINA</label>
                  </div>
                  <Select
                    options={cabineFilterSelect} 
                    value={cabineFilter}
                    styles={colorStyles}
                    className="select"
                    onChange={handleSelectCabineFilter}
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'cabineFilter')}>+</button>
            </div>
          )}
          {ChangeOilFiltter === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>F. DE ACEITE</label>
                  </div>
                  <Select
                    options={oilFilterSelect} 
                    value={oilFilter}
                    styles={colorStyles}
                    className="select"
                    onChange={handleSelectOilFilter}
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'oilFilter')}>+</button>
            </div>
          )}
          {ChangeFuelFiltter === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>F. GASOLINA</label>
                  </div>
                  <Select
                    options={fuelFilterSelect}
                    value={fuelFilter}
                    styles={colorStyles}
                    onChange={handleSelectFuelFilter}
                    className="select" />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'fuelFilter')}>+</button>
            </div>
            
          )}
          {plugs === "Si" && (
             <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                    <div className="label-container">
                        <label>BUJÍAS</label>
                    </div>
                    <Select
                      options={sparkplugSelect}
                      className="select"
                      styles={colorStyles}
                      value={sparkplug}
                      onChange={handleSelectSparkplug}
                    />
                  </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'sparkplug')}>+</button>
            </div>
          )}
          {wiresets === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>CABLES</label>
                  </div>
                  <Select
                    options={wiresetSelect}
                    value={wireset}
                    styles={colorStyles}
                    onChange={handleSelectWireset}
                    className="select"
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'wiresets')}>+</button>
            </div>
          )}
          {changeBrakeshoeFront === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>BALATAS D.</label>
                  </div>
                  <Select
                    options={brakeshoeFrontSelect}
                    className="select"
                    styles={colorStyles}
                    value={brakeshoeFront}
                    onChange={handleSelectBrakeshoeFront}
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'brakeshoeFront')}>+</button>
            </div>
          )}
          {changeBrakeshoeBack === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>BALATAS T.</label>
                  </div>
                  <Select
                    options={brakeshoeBackSelect}
                    className="select"
                    value={brakeshoeBack}
                    styles={colorStyles}
                    onChange={handleSelectBrakeshoeBack}
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'brakeshoeBack')}>+</button>
            </div>
          )}
          {changeCoil === "Si" && (
            <div className="service-products-container">
              <div className="direction-column width-90">
                <div className="select-container big">
                  <div className="label-container">
                      <label>BOBINAS</label>
                  </div>
                  <Select
                    options={coilSelect}
                    className="select"
                    value={coil}
                    onChange={handleSelectCoil}
                  />
                </div>
              </div>
              <button className="btn-aspi-circle" onClick={(e) => addProductToShopList(e, 'coil')}>+</button>
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
          <button onClick={showShopList} className="btn-aspi">VER ORDEN</button> 
          <ShopList 
              modalIsOpen={showList}
              closeModal={closeShopList}
              productsList={products}
              removeProduct={removeProduct}
              textSuccessButton="CREAR PDF"
              successFunction={createPDF}
              totalServices={getTotalServices()}
          />
          {toastOpen && (
            <Toast text="EL PRODUCTO HA SIDO AGREGADO EXCITOSAMENTE"/>
          )}
          { renderBTNPDF && (
            <CreatePDF 
              Oil={Oil}
              airFilter={ChangeAirFiltter}
              oilFilter={ChangeOilFiltter}
              fuelFilter={ChangeFuelFiltter}
              cabineFilter={ChangeCabinAirFiltter}
              cleanInj={CleaningInj}
              cleanAB={CleaningAB}
              sparkplug={plugs}
              wiresets={wiresets}
              brakeshoeBack={changeBrakeshoeBack}
              brakeshoeFront={changeBrakeshoeFront}
              coil={changeCoil}
              antifreeze={antifreeze}
              transmission={transmission}
              note={note}
              total={getTotalServices()}
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
