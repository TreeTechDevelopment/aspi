import React, { useState, Component, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';


const Service = () => {
    const optionAirFiltter =[{ value: 'F-28A11', label: 'F-28A11'},
    { value: 'CA-10564', label: 'CA-10564'},
    { value: 'C2674/1', label: 'C2674/1'},
    { value: 'ECA-1000', label: 'ECA-1000'}];
    const optionOil =[{ value: 'Quacker', label: 'Quacker'},
    { value: 'Motorcracft', label: 'Motorcracft'},
    { value: 'Penzoil', label: 'Penzoil'},
    { value: 'Mobil', label: 'Mobil'}];
    const optionOillts =[{ value: '1 lts', label: '1 lts'},
    { value: '2 lts', label: '2 lts'},
    { value: '3 lts', label: '3 lts'},
    { value: '4 lts', label: '4 lts'}];
    
    return (
        <>
            <h3>Servicio</h3>
            <div>
            <h4>Limpieza de inyectores</h4>
            <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="CleaningInj1" value="option1" />
                    <label className="form-check-label" htmlFor="CleaningInj1">Si</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="CleaningInj0" value="option2" />
                    <label className="form-check-label" htmlFor="CleaningInj0">No</label>
                </div>
            </div>
            <div>
            <h4>Limpieza de cuerpo de aceleracion</h4>
            <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="CleaningAB1" value="option1" />
                    <label className="form-check-label" htmlFor="CleaningAB1">Si</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="CleaningAB0" value="option2" />
                    <label className="form-check-label" htmlFor="CleaningAB0">No</label>
                </div>
                <div>
            <h4>Aceite</h4>
            <Select 
                options={optionOil}
                placeholder="Aceite"
                />
            
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="Oil1" value="yes" />
                    <label className="form-check-label" htmlFor="Oil1">Si</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="AirFiltter0" value="no" />
                    <label className="form-check-label" htmlFor="Oil0">No</label>
                </div>
                <Select 
                options={optionOillts}
                placeholder="Litros"
                />
            </div>
            <div>
            <h4>Filtro de Aire</h4>
            <Select 
                options={optionAirFiltter}
                placeholder="Filtro de Aire"
                />
            
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="AirFiltter1" value="yes" />
                    <label className="form-check-label" htmlFor="AirFiltter1">Si</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="AirFiltter0" value="no" />
                    <label className="form-check-label" htmlFor="AirFiltter0">No</label>
                </div>

            
   
                
     
        </>
    );
}
export default Service;