import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from 'axios';

import CreatePDF from './CreatePDF'
import { appContext } from '../../context/Provider'
import { url, messageServerError } from '../../../app.json'

const Service = () => { 

  const context = useContext(appContext)

  const [airFilterSelect, setAirFilterSelect] = useState([]);
  const [oilFilterSelect, setOilFilterSelect] = useState([]);
  const [fuelFilterSelect, setFuelFilterSelect] = useState([]);
  const [cabineFilterSelect, setCabineFilterSelect] = useState([]);
  const [airFilter, setAirFilter] = useState({});
  const [oilFilter, setOilFilter] = useState({});
  const [fuelFilter, setFuelFilter] = useState({});
  const [cabineFilter, setCabineFilter] = useState({});

  useEffect(() => {
    if (context.car.airFilter) {
        let airFilters = context.car.airFilter.map((airFilter) => {
            return { value: airFilter, label: airFilter };
        });
        
        setAirFilterSelect(airFilters);
        setAirFilter(airFilters[0]);

        let oilFilters = context.car.oilFilter.map((oilFilter) => {
            return { value: oilFilter, label: oilFilter };
        });
        setOilFilterSelect(oilFilters);
        setOilFilter(oilFilters[0]);

        let fuelFilters = context.car.fuelFilter.map((fuelFilter) => {
            return { value: fuelFilter, label: fuelFilter };
        });
        setFuelFilterSelect(fuelFilters);
        setFuelFilter(fuelFilters[0]);

        if(context.car.cabineFilter){
          let cabineFilters = context.car.cabineFilter.map((cabineFilter) => {
            return { value: cabineFilter, label: cabineFilter };
          });
          setCabineFilterSelect(cabineFilters);
          setCabineFilter(cabineFilters[0]);
        }
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
        alert('Alguno de los filtros no existe en la base de datos. Registrelo y después podrá continuar.')
      }
    }).catch((e) => {
      console.log(e)
      alert(`${messageServerError}`)
    })
  }

  const handleSelectAirFilter = newValue => setAirFilter(newValue)
  
  const handleSelectOilFilter = newValue => setOilFilter(newValue)
  
  const handleSelectFuelFilter = newValue => setFuelFilter(newValue)

  const handleSelectCabineFilter = newValue => setCabineFilter(newValue)

  const fetchTotalFilters = async () => {
    const res = await axios({
      url: `${url}/products/total?${ 
        (ChangeAirFiltter === "Si" && airFilter ) ? `airFilter=${airFilter.value}` : ''
      }&${
        (ChangeOilFiltter === "Si" && oilFilter) ? `oilFilter=${oilFilter.value}` : ''
      }&${
        (ChangeAirFiltter === "Si" && fuelFilter) ? `fuelFilter=${fuelFilter.value}` : ''
      }&${
        (ChangeCabinAirFiltter === "Si" && cabineFilter) ? `cabineFilter=${cabineFilter.value}` : ''
      }`,
      method: 'GET',
      timeout: 5000
    })

    return res.data
  }

  return (
    <>
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
              onChange={handleSelectOil}
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
            totalFilters={totalFilters}
          />
        ) }
        
      </form>
    </>
  );
};
export default Service;
