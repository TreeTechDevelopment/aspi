import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";

import CreatePDF from './CreatePDF'

const Service = ({ car, make, model, year }) => {
  const [airFilterSelect, setAirFilterSelect] = useState([]);
  const [oilFilterSelect, setOilFilterSelect] = useState([]);
  const [fuelFilterSelect, setFuelFilterSelect] = useState([]);
  const [airFilter, setAirFilter] = useState({});
  const [oilFilter, setOilFilter] = useState({});
  const [fuelFilter, setFuelFilter] = useState({});

  useEffect(() => {
    if (car.airFilter) {
        let airFilters = car.airFilter.map((airFilter) => {
            return { value: airFilter, label: airFilter };
        });
        
        setAirFilterSelect(airFilters);
        setAirFilter(airFilters[0]);

        let oilFilters = car.oilFilter.map((oilFilter) => {
            return { value: oilFilter, label: oilFilter };
        });
        setOilFilterSelect(oilFilters);
        setOilFilter(oilFilters[0]);

        let fuelFilters = car.fuelFilter.map((fuelFilter) => {
            return { value: fuelFilter, label: fuelFilter };
        });
        setFuelFilterSelect(fuelFilters);
        setFuelFilter(fuelFilters[0]);
    }
  }, [car]);

  const optionAirFiltter = [
    { value: "F-28A11", label: "F-28A11" },
    { value: "CA-10564", label: "CA-10564" },
    { value: "C2674/1", label: "C2674/1" },
    { value: "ECA-1000", label: "ECA-1000" },
  ];
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
    aceite: "",
    ChangeAirFiltter: "Si",
    ChangeCabinAirFiltter: "Si",
    Oil: "",
    ChangeOilFiltter: "Si",
    ChangeFuelFiltter: "Si",
    plugs: "Si",
    wiresets: "Si",
    brakeshoe: "Si",
  });

  const {
    CleaningInj,
    CleaningAB,
    aceite,
    ChangeAirFiltter,
    Oil,
    ChangeOilFiltter,
    ChangeCabinAirFiltter,
    ChangeFuelFiltter,
    plugs,
    wiresets,
    brakeshoe,
  } = datos;
  const obtenerInformacion = (e) => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

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
              name="aceite"
              value={aceite}
              options={optionOil}
              onChange={obtenerInformacion}
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
          <Select options={optionOillts} placeholder="Litros" />
        </div>
        <div>
          <h4>Filtro de Aire</h4>
          <Select
            options={airFilterSelect}
            placeholder="Filtro de Aire"
            value={airFilter}
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
          <Select options={optionAirFiltter} placeholder="Filtro de Aire" />
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
        <CreatePDF 
          car={car}
          make={make}
          model={model}
          year={year}
          airFilter={ (ChangeAirFiltter === "Si" && airFilter )? airFilter.value : ''}
          oilFilter={ (ChangeOilFiltter === "Si" && oilFilter)? oilFilter.value : ''}
          fuelFilter={ (ChangeFuelFiltter === "Si" && fuelFilter) ? fuelFilter.value : ''}
          cleanInj={CleaningInj}
          cleanAB={CleaningAB}
          plugs={plugs}
          wiresets={wiresets}
          brakeshoe={brakeshoe}
        />
      </form>
    </>
  );
};
export default Service;
