import React,{ useEffect, useState } from 'react'
import Select from "react-select";
import axios from 'axios';

import CreatePDF from './CreatePDF';
import { url, messageServerError } from '../../../app.json'

function Order({ order, services }) {

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
    const [airFilter, setAirFilter] = useState({});
    const [oilFilter, setOilFilter] = useState({});
    const [fuelFilter, setFuelFilter] = useState({});
    const [cabineFilter, setCabineFilter] = useState({});
    const [datos, guardarDatos] = useState({
        CleaningInj: "Si",
        CleaningAB: "Si",
        aceite: optionOil[0],
        ChangeAirFiltter: "Si",
        ChangeCabinAirFiltter: "Si",
        Oil: "Si",
        aceiteLts: optionOillts[0],
        ChangeOilFiltter: "Si",
        ChangeFuelFiltter: "Si",
        plugs: "Si",
        wiresets: "Si",
        brakeshoe: "Si",
        coil: "Si",
        antifreeze: "Si",
        transmission: "Si",
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
        wiresets,
        brakeshoe,
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
    
      const handleSelectOilLts = (newOilLts) => {
        guardarDatos({
          ...datos,
          aceiteLts: newOilLts,
        });
      }
    
      const createPDF = (e) => {
        e.preventDefault()
        fetchTotalFilters().then(({ total, ok }) => {
            if(ok){
              guardarDatos({
                ...datos,
                renderBTNPDF: true,
                totalFilters: total
              });
            }else{
              alert('Ha alguno de los filtros no existe en la base de datos. Registrelo y después podrá continuar.')
            }
        }).catch(() => {
            alert(`${messageServerError}`)
        })
      }

    useEffect(() => {
        let airFilters = order.car.airFilter.map((airFilter) => {
            return { value: airFilter, label: airFilter };
        });
        let airFiltersIndex = order.car.airFilter.findIndex( filter => filter === order.filters.airFilter )
        
        setAirFilterSelect(airFilters);
        setAirFilter(airFilters[airFiltersIndex]);       

        let oilFilters = order.car.oilFilter.map((oilFilter) => {
            return { value: oilFilter, label: oilFilter };
        });
        let oilFiltersIndex = order.car.oilFilter.findIndex( filter => filter === order.filters.oilFilter )

        setOilFilterSelect(oilFilters);
        setOilFilter(oilFilters[oilFiltersIndex]);        

        let fuelFilters = order.car.fuelFilter.map((fuelFilter) => {
            return { value: fuelFilter, label: fuelFilter };
        });
        let fuelFiltersIndex = order.car.fuelFilter.findIndex( filter => filter === order.filters.fuelFilter )

        setFuelFilterSelect(fuelFilters);
        setFuelFilter(fuelFilters[fuelFiltersIndex]);       

        let cabineFiltersIndex = -1
        if(order.car.cabineFilter){
            let cabineFilters = order.car.cabineFilter.map((cabineFilter) => {
                return { value: cabineFilter, label: cabineFilter };
            });
            cabineFiltersIndex = order.car.cabineFilter.findIndex( filter => filter === order.filters.cabineFilter )
    
            setCabineFilterSelect(cabineFilters);
            setCabineFilter(cabineFilters[cabineFiltersIndex]);
        }

        let oil = optionOil.find( option => option.value === order.oil.oilType )
        let oilLTS = optionOillts.find( option => option.value === order.oil.oilLts )
        guardarDatos({
            ...datos,
            order,
            aceite: oil,
            aceiteLts: oilLTS,
            brakeshoe: order.brakeshoe,
            plugs: order.plugs,
            transmission: order.transmission,
            CleaningAB: order.cleanAB,
            CleaningInj: order.cleanInj,
            coil: order.coil,
            antifreeze: order.antifreeze,
            note: order.note,
            ChangeAirFiltter: airFiltersIndex === -1 ? 'No' : 'Si',
            ChangeOilFiltter: oilFiltersIndex === -1 ? 'No' : 'Si',
            ChangeFuelFiltter: fuelFiltersIndex === -1 ? 'No' : 'Si',
            ChangeCabinAirFiltter: (cabineFiltersIndex === -1) ? 'No' : 'Si'
        })
    }, [order])

    const fetchTotalFilters = async () => {
        const res = await axios({
          url: `${url}/filters/total?airFilter=${airFilter.value}&oilFilter=${oilFilter.value}&fuelFilter=${fuelFilter.value}`,
          method: 'GET',
          timeout: 5000
        })
    
        return res.data
    }

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
                    {/* <label className="form-check-label" htmlFor="CleaningInj">Si</label> */}
                    {/* className="form-check form-check-inline" */}
                    <input
                    /* className="form-check-input" */ type="radio"
                    name="CleaningInj"
                    value="No"
                    checked={CleaningInj === "No"}
                    onChange={obtenerInformacion}
                    />{" "}
                    No
                    {/*  <label className="form-check-label" htmlFor="CleaningInj0">No</label> */}
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
                    />{" "}
                    Si
                    {/* <label className="form-check-label" htmlFor="CleaningAB1">Si</label> */}
                    {/* className="form-check form-check-inline"  */}
                    <input
                    /* className="form-check-input" */ type="radio"
                    name="CleaningAB"
                    value="No"
                    checked={CleaningAB === "No"}
                    onChange={obtenerInformacion}
                    />{" "}
                    No
                    {/* <label className="form-check-label" htmlFor="CleaningAB0">No</label> */}
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
                <div /*  className="form-check form-check-inline" */>
                    <input
                    /* className="form-check-input"  */ type="radio"
                    name="Oil"
                    value="Si"
                    checked={Oil === "Si"}
                    onChange={obtenerInformacion}
                    />{" "}
                    Si
                    {/* <label className="form-check-label" htmlFor="Oil1">Si</label> */}
                    {/* </div>
                        <div className="form-check form-check-inline"> */}
                    <input
                    /* className="form-check-input"  */ type="radio"
                    name="Oil"
                    value="No"
                    checked={Oil === "No"}
                    onChange={obtenerInformacion}
                    />{" "}
                    No
                    {/* <label className="form-check-label" htmlFor="Oil0">No</label> */}
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
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                        <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="ChangeAirFiltter"
                    value="No"
                    checked={ChangeAirFiltter === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                {/*  <label className="form-check-label" htmlFor="AirFiltter0">No</label> */}
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
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                        <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="ChangeCabinAirFiltter"
                    value="No"
                    checked={ChangeCabinAirFiltter === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                {/*  <label className="form-check-label" htmlFor="AirFiltter0">No</label> */}
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
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                        <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="ChangeOilFiltter"
                    value="No"
                    checked={ChangeOilFiltter === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                {/*  <label className="form-check-label" htmlFor="AirFiltter0">No</label> */}
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
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                        <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="ChangeFuelFiltter"
                    value="No"
                    checked={ChangeFuelFiltter === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                {/*  <label className="form-check-label" htmlFor="AirFiltter0">No</label> */}
                </div>
                <div>
                <h4>Bujias</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="plugs"
                    value="Si"
                    checked={plugs === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="plugs"
                    value="No"
                    checked={plugs === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                </div>
                <div>
                <h4>Juego de cables</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="wiresets"
                    value="Si"
                    checked={wiresets === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="wiresets"
                    value="No"
                    checked={wiresets === "No"}
                    onChange={obtenerInformacion}
                />{" "}
                No
                </div>
                <div>
                <h4>Balatas</h4>
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="brakeshoe"
                    value="Si"
                    checked={brakeshoe === "Si"}
                    onChange={obtenerInformacion}
                />{" "}
                Si
                {/* <label className="form-check-label" htmlFor="AirFiltter1">Si</label> */}
                {/*  </div>
                            <div className="form-check form-check-inline"> */}
                <input
                    /* className="form-check-input"  */ type="radio"
                    name="brakeshoe"
                    value="No"
                    checked={brakeshoe === "No"}
                    onChange={obtenerInformacion}
                />{" "}
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
                    cabineFilter={ (ChangeCabinAirFiltter === "Si" && cabineFilter && cabineFilter.value) ? cabineFilter.value : ''}
                    cleanInj={CleaningInj}
                    cleanAB={CleaningAB}
                    plugs={plugs}
                    wiresets={wiresets}
                    brakeshoe={brakeshoe}
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
