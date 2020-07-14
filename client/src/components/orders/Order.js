import React,{ useEffect, useState } from 'react'
import Select from "react-select";

import CreatePDF from './CreatePDF';

function Order({ order, services, sparkplugs, wiresets, brakeshoes, filters }) {

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
        changeWiresets: "No",
        rectifyDisk: "No",
        changeBrakeshoeBack: "No",
        changeBrakeshoeFront: "No",
        coil: "No",
        antifreeze: "No",
        transmission: "No",
        note: '',
        totalFilters: 0,
        renderBTNPDF: false
      });
    
      const {
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
        changeWiresets,
        changeBrakeshoeBack,
        changeBrakeshoeFront,
        rectifyDisk,
        coil,
        antifreeze,
        transmission,
        note,
        renderBTNPDF,
        totalFilters
      } = datos;
    
      const obtenerInformacion = (e) => {
        guardarDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSelectAceite = (newOil) => {
        guardarDatos({
          ...datos,
          aceite: newOil,
        });
      }

      const handleSelectOilFilter = (newOil) => setOilFilter(newOil)

      const handleSelectAirFilter = (newAirFilter) => setAirFilter(newAirFilter)

      const handleSelectFuelFilter = (newFuelFilter) => setFuelFilter(newFuelFilter)

      const handleSelectCabineFilter = newValue => setCabineFilter(newValue)

      const handleSelectSparkplug = newValue => setSparkplug(newValue)

  const handleSelectWireset = newValue =>  setWireset(newValue)

  const handleSelectBrakeshoeFront = newValue => setBrakeshoeFront(newValue)

  const handleSelectBrakeshoeBack = newValue => setBrakeshoeBack(newValue)
    
      const handleSelectOilLts = (newOilLts) => {
        guardarDatos({
          ...datos,
          aceiteLts: newOilLts,
        });
      }
    
      const createPDF = (e) => {
        e.preventDefault()
        let total = 0
        if(plugs === "Si"){ total += Number(sparkplug.value.split('-')[0]) }
        if(ChangeAirFiltter === "Si"){ total += Number(airFilter.value.split('-')[0]) }
        if(ChangeOilFiltter === "Si"){ total += Number(oilFilter.value.split('-')[0]) }
        if(ChangeFuelFiltter === "Si"){ total += Number(fuelFilter.value.split('-')[0]) }
        if(ChangeCabinAirFiltter === "Si"){ total += Number(cabineFilter.value.split('-')[0]) }
        if(changeWiresets === "Si"){ total += Number(wireset.value.split('-')[0]) }
        if(changeBrakeshoeBack === "Si"){ total += Number(brakeshoeBack.value.split('-')[0]) }
        if(changeBrakeshoeFront === "Si"){ total += Number(brakeshoeFront.value.split('-')[0]) }
        guardarDatos({
        ...datos,
        renderBTNPDF: true,
        totalFilters: total
        });
      }

    useEffect(() => {

        let airFilters = filters.filter( filterDB => filterDB.filterType === "air" )
        let oilFilters = filters.filter( filterDB => filterDB.filterType === "oil" )
        let fuelFilters = filters.filter( filterDB => filterDB.filterType === "fuel" )
        let cabineFilters = filters.filter( filterDB => filterDB.filterType === "cabine" )

        let airFiltersSelect = []
        airFilters = airFilters.filter( filter => order.car.airFilter.some( airFilter => airFilter == filter.interfil )  )
        for(let i = 0; i < airFilters.length; i++){
          airFiltersSelect = [...airFiltersSelect, airFilters[i].interfil, ...airFilters[i].OEM, ...airFilters[i].ACD,
                            ...airFilters[i].Fram, ...airFilters[i].Gonher, ...airFilters[i].Motorcraft, ...airFilters[i].Purolator,
                            ...airFilters[i].Wix, ...airFilters[i].Mann]
          airFiltersSelect = airFiltersSelect.map( filter => {
              return { value: `${airFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let oilFiltersSelect = []
        oilFilters = oilFilters.filter( filter => order.car.oilFilter.some( oilFilter => oilFilter == filter.interfil )  )
        for(let i = 0; i < oilFilters.length; i++){
          oilFiltersSelect = [...oilFiltersSelect, oilFilters[i].interfil, ...oilFilters[i].OEM, ...oilFilters[i].ACD,
                            ...oilFilters[i].Fram, ...oilFilters[i].Gonher, ...oilFilters[i].Motorcraft, ...oilFilters[i].Purolator,
                            ...oilFilters[i].Wix, ...oilFilters[i].Mann]
          oilFiltersSelect = oilFiltersSelect.map( filter => {
            return { value: `${oilFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let fuelFiltersSelect = []
        fuelFilters = fuelFilters.filter( filter => order.car.fuelFilter.some( fuelFilter => fuelFilter == filter.interfil )  )
        for(let i = 0; i < fuelFilters.length; i++){
          fuelFiltersSelect = [...fuelFiltersSelect, fuelFilters[i].interfil, ...fuelFilters[i].OEM, ...fuelFilters[i].ACD,
                            ...fuelFilters[i].Fram, ...fuelFilters[i].Gonher, ...fuelFilters[i].Motorcraft, ...fuelFilters[i].Purolator,
                            ...fuelFilters[i].Wix, ...fuelFilters[i].Mann]
          fuelFiltersSelect = fuelFiltersSelect.map( filter => {
            return { value: `${fuelFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let cabineFiltersSelect = []
        cabineFilters = cabineFilters.filter( filter => order.car.cabineFilter.some( cabineFilter => cabineFilter == filter.interfil )  )
        for(let i = 0; i < cabineFilters.length; i++){
          cabineFiltersSelect = [...cabineFiltersSelect, cabineFilters[i].interfil, ...cabineFilters[i].OEM, ...cabineFilters[i].ACD,
                            ...cabineFilters[i].Fram, ...cabineFilters[i].Gonher, ...cabineFilters[i].Motorcraft, ...cabineFilters[i].Purolator,
                            ...cabineFilters[i].Wix, ...cabineFilters[i].Mann]
          cabineFiltersSelect = cabineFiltersSelect.map( filter => {
            return { value: `${cabineFilters[i].price}-${Math.random().toString()}`, label: filter };
          });
        }

        let sparkplugSelect = []
        let sparkplugsDB = sparkplugs.filter( sparkplugDB => order.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugNGK => sparkplug == sparkplugNGK ) )  )
        for(let i = 0; i < sparkplugsDB.length; i++){
          sparkplugSelect = [...sparkplugSelect, ...sparkplugsDB[i].NGK, ...sparkplugsDB[i].Champions, ...sparkplugsDB[i].ACD,
                            ...sparkplugsDB[i].Bosh, ...sparkplugsDB[i].Motorcraft]
          sparkplugSelect = sparkplugSelect.map( sparkplug => {
            return { value: `${sparkplugsDB[i].price}-${Math.random().toString()}`, label: sparkplug };
          });
        }

        let wiresetSelect = []
        let wiresetsDB = wiresets.filter( wiresetDB => order.car.wiresets.some( wireset => wiresetDB.Roadstar.some( wiresetRoadstar => wireset == wiresetRoadstar ) )  )
        for(let i = 0; i < wiresetsDB.length; i++){
          wiresetSelect = [...wiresetSelect, ...wiresetsDB[i].NGK, ...wiresetsDB[i].LS, ...wiresetsDB[i].Roadstar, ...wiresetsDB[i].Bosh]
          wiresetSelect = wiresetSelect.map( wireset => {
            return { value: `${wiresetsDB[i].price}-${Math.random().toString()}`, label: wireset };
          });
        }

        let brakeshoeBackSelect = []
        let brakeshoesBackDB = brakeshoes.filter( brakeshoeDB => order.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
        for(let i = 0; i < brakeshoesBackDB.length; i++){
          brakeshoeBackSelect = [...brakeshoeBackSelect, ...brakeshoesBackDB[i].Wagner ]
          brakeshoeBackSelect = brakeshoeBackSelect.map( brakeshoe => {
            return { value: `${brakeshoesBackDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }

        let brakeshoeFrontSelect = []
        let brakeshoesFrontDB = brakeshoes.filter( brakeshoeDB => order.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
        for(let i = 0; i < brakeshoesFrontDB.length; i++){
          brakeshoeFrontSelect = [...brakeshoeFrontSelect, ...brakeshoesFrontDB[i].Wagner ]
          brakeshoeFrontSelect = brakeshoeFrontSelect.map( brakeshoe => {
            return { value: `${brakeshoesFrontDB[i].price}-${Math.random().toString()}`, label: brakeshoe };
          });
        }

        let airFilterSelectedidx = airFiltersSelect.findIndex( filter => filter.label == order.filters.airFilter )
        let oilFilterSelectedidx = oilFilterSelect.findIndex( filter => filter.label == order.filters.oilFilter )
        let fuelFilterSelectedidx = fuelFilterSelect.findIndex( filter => filter.label == order.filters.fuelFilter )
        let cabineFilterSelectedidx = cabineFilterSelect.findIndex( filter => filter.label == order.filters.cabineFilter )
        let sparkplugSelectedidx = sparkplugSelect.findIndex( sparkplug => sparkplug.label == order.sparkplugs )
        let wiresetsSelectedidx = wiresetSelect.findIndex( wireset => wireset.label == order.wiresets )
        let brakeshoeBackSelectedidx = brakeshoeBackSelect.findIndex( brakeshoe => brakeshoe.label == order.brakeshoeBack )
        let brakeshoeFrontSelectedidx = brakeshoeFrontSelect.findIndex( brakeshoe => brakeshoe.label == order.brakeshoeFront )
        
        setAirFilterSelect(airFiltersSelect);
        setAirFilter(airFiltersSelect[airFilterSelectedidx]);
        setOilFilterSelect(oilFiltersSelect);
        setOilFilter(oilFiltersSelect[oilFilterSelectedidx]);
        setFuelFilterSelect(fuelFiltersSelect);
        setFuelFilter(fuelFiltersSelect[fuelFilterSelectedidx]);
        setCabineFilterSelect(cabineFiltersSelect);
        setCabineFilter(cabineFiltersSelect[cabineFilterSelectedidx]);
        setSparkplugSelect(sparkplugSelect);
        setSparkplug(sparkplugSelect[sparkplugSelectedidx]);
        setWiresetSelect(wiresetSelect)
        setWireset(wiresetSelect[wiresetsSelectedidx])
        setBrakeshoeBackSelect(brakeshoeBackSelect)
        setBrakeshoeBack(brakeshoeBackSelect[brakeshoeBackSelectedidx])
        setBrakeshoeFrontSelect(brakeshoeFrontSelect)
        setBrakeshoeFront(brakeshoeFrontSelect[brakeshoeFrontSelectedidx])

        let oil = optionOil.find( option => option.value === order.oil.oilType )
        let oilLTS = optionOillts.find( option => option.value === order.oil.oilLts )
        guardarDatos({
            ...datos,
            order,
            aceite: oil,
            aceiteLts: oilLTS,
            changeBrakeshoeBack: order.brakeshoeBack === "" ? 'No' : 'Si',
            changeBrakeshoeFront: order.brakeshoeFron === "" ? 'No' : 'Si',
            changeWiresets: order.wiresets === "" ? 'No' : 'Si',
            plugs: order.sparkplugs === "" ? 'No' : 'Si',
            transmission: order.transmission,
            CleaningAB: order.cleanAB,
            CleaningInj: order.cleanInj,
            coil: order.coil,
            antifreeze: order.antifreeze,
            note: order.note,
            ChangeAirFiltter: order.filters.airFilter === "" ? 'No' : 'Si',
            ChangeOilFiltter: order.filters.oilFilter === "" ? 'No' : 'Si',
            ChangeFuelFiltter: order.filters.fuelFilter === "" ? 'No' : 'Si',
            ChangeCabinAirFiltter: order.filters.cabineFilter === "" ? 'No' : 'Si'
        })
    }, [order, filters, wiresets, brakeshoes])

    return (
        <div className="row">
            <div className="col">
                <p>Marca: { order.car.make.name }</p>
                <p>Model: { order.car.model.name }</p>
                <p>Año: { order.carYear }</p>
                <p>Motor: { order.car.motor }</p>
                <p>Cilindros: { order.car.cylinder }</p>
            </div>
            <div className="col">
                <h3>Servicio</h3>
                <form>
                    <div>
                        <h4>Limpieza de inyectores</h4>
                        <div /* className="form-check form-check-inline" */>
                            <input
                                /* className="form-check-input" */ type="radio"
                                name="CleaningInj"
                                value="Si"
                                checked={CleaningInj === "Si"}
                                onChange={obtenerInformacion}
                                />{" "}
                            Si
                            <input
                            /* className="form-check-input" */ type="radio"
                            name="CleaningInj"
                            value="No"
                            checked={CleaningInj === "No"}
                            onChange={obtenerInformacion}
                            />{" "}
                            No
                        </div>
                    </div>
                <div>
                    <h4>Limpieza de cuerpo de aceleracion</h4>
                    <div /* className="form-check form-check-inline" */>
                        <input
                        /* className="form-check-input" */ type="radio"
                        name="CleaningAB"
                        value="Si"
                        checked={CleaningAB === "Si"}
                        onChange={obtenerInformacion}
                        />
                        Si
                        <input
                        /* className="form-check-input" */ type="radio"
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
                            onChange={handleSelectAceite}
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
                            /* className="form-check-input"  */ type="radio"
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
                    <h4>Filtro de Aire</h4>
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
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeAirFiltter"
                        value="Si"
                        checked={ChangeAirFiltter === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeAirFiltter"
                        value="No"
                        checked={ChangeAirFiltter === "No"}
                        onChange={obtenerInformacion}
                    />
                    No
                </div>
                <div>
                    <h4>Filtro de Aire Cabina</h4>
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
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeCabinAirFiltter"
                        value="Si"
                        checked={ChangeCabinAirFiltter === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeCabinAirFiltter"
                        value="No"
                        checked={ChangeCabinAirFiltter === "No"}
                        onChange={obtenerInformacion}
                    />
                    No
                </div>
                <div>
                    <h4>Filtro de Aceite</h4>
                    <Select
                        options={oilFilterSelect}
                        placeholder="Filtro de Aceite"
                        value={oilFilter}
                        onChange={handleSelectOilFilter}
                        isDisabled={ChangeOilFiltter === "No"}
                    />
                </div>
                <div>
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeOilFiltter"
                        value="Si"
                        checked={ChangeOilFiltter === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeOilFiltter"
                        value="No"
                        checked={ChangeOilFiltter === "No"}
                        onChange={obtenerInformacion}
                    />
                    No
                </div>
                <div>
                    <h4>Filtro de Gasolina</h4>
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
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeFuelFiltter"
                        value="Si"
                        checked={ChangeFuelFiltter === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="ChangeFuelFiltter"
                        value="No"
                        checked={ChangeFuelFiltter === "No"}
                        onChange={obtenerInformacion}
                    />{" "}
                    No
                </div>
                <div>
                    <h4>Bujias</h4>
                    <Select
                        options={sparkplugSelect}
                        placeholder="Bujías"
                        value={sparkplug}
                        onChange={handleSelectSparkplug}
                        isDisabled={plugs === "No"}
                    />
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="plugs"
                        value="Si"
                        checked={plugs === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="plugs"
                        value="No"
                        checked={plugs === "No"}
                        onChange={obtenerInformacion}
                    />
                    No
                </div>
                <div>
                    <h4>Juego de cables</h4>
                    <Select
                        options={wiresetSelect}
                        placeholder="Juego de Cables"
                        value={wireset}
                        onChange={handleSelectWireset}
                        isDisabled={changeWiresets === "No"}
                    />
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="changeWiresets"
                        value="Si"
                        checked={changeWiresets === "Si"}
                        onChange={obtenerInformacion}
                    />
                    Si
                    <input
                        /* className="form-check-input"  */ type="radio"
                        name="changeWiresets"
                        value="No"
                        checked={changeWiresets === "No"}
                        onChange={obtenerInformacion}
                    />
                    No
                </div>
                <div>
                <h4>Bobinas</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="coil"
                    value="Si"
                    checked={coil === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="coil"
                    value="No"
                    checked={coil === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                </div>
                <div>
                <h4>Anticongelante</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="antifreeze"
                    value="Si"
                    checked={antifreeze === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="antifreeze"
                    value="No"
                    checked={antifreeze === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                </div>
                <div>
                <h4>Cambio de Aceite de Transmisión</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="transmission"
                    value="Si"
                    checked={transmission === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="transmission"
                    value="No"
                    checked={transmission === "No"}
                    onChange={obtenerInformacion}
                />
                No
                </div>
            <div>
                <h4>Rectificación de Discos</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="rectifyDisk"
                    value="Si"
                    checked={rectifyDisk === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="rectifyDisk"
                    value="No"
                    checked={rectifyDisk === "No"}
                    onChange={obtenerInformacion}
                />
                No
                </div>
                <div>
                <h4>Cambio de Balatas Delanteras</h4>
                <Select
                    options={brakeshoeFrontSelect}
                    placeholder="Juego de Cables"
                    value={brakeshoeFront}
                    onChange={handleSelectBrakeshoeFront}
                    isDisabled={changeBrakeshoeFront === "No"}
                />
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="changeBrakeshoeFront"
                    value="Si"
                    checked={changeBrakeshoeFront === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="changeBrakeshoeFront"
                    value="No"
                    checked={changeBrakeshoeFront === "No"}
                    onChange={obtenerInformacion}
                />
                No
                </div>
                <div>
                <h4>Cambio de Balatas Traseras</h4>
                <Select
                    options={brakeshoeBackSelect}
                    placeholder="Juego de Cables"
                    value={brakeshoeBack}
                    onChange={handleSelectBrakeshoeBack}
                    isDisabled={changeBrakeshoeBack === "No"}
                />
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="changeBrakeshoeBack"
                    value="Si"
                    checked={changeBrakeshoeBack === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
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
                    airFilter={ (ChangeAirFiltter === "Si" && airFilter )? airFilter.value : ''}
                    oilFilter={ (ChangeOilFiltter === "Si" && oilFilter)? oilFilter.value : ''}
                    fuelFilter={ (ChangeFuelFiltter === "Si" && fuelFilter) ? fuelFilter.value : ''}
                    cabineFilter={ (ChangeCabinAirFiltter === "Si" && cabineFilter) ? cabineFilter.value : ''}
                    cleanInj={CleaningInj}
                    cleanAB={CleaningAB}
                    plugs={plugs}
                    changeWiresets={changeWiresets}
                    sparkplug={(plugs === "Si" && sparkplug) ? sparkplug.label : ''}
                    wiresets={(changeWiresets === "Si" && wireset) ? wireset.label : ''}
                    brakeshoeBack={(changeBrakeshoeBack === "Si" && brakeshoeBack) ? brakeshoeBack.label : ''}
                    brakeshoeFront={(changeBrakeshoeFront === "Si" && brakeshoeFront) ? brakeshoeFront.label : ''}
                    coil={coil}
                    antifreeze={antifreeze}
                    transmission={transmission}
                    note={note}
                    order={order}
                    services={services}
                    totalFilters={totalFilters}
                />
                ) }
                
            </form>
            </div>
        </div>
    )
}

export default Order
