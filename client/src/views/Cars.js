import React, { useContext, useState, useEffect } from 'react'

import Form from '../components/serviceOrder/Form'
import Navbar from '../components/Navbar'
import { appContext } from '../context/Provider' 

function Cars() {

    const context = useContext(appContext)

    const [airFilters, setAirFilters] = useState([])
    const [oilFilters, setOilFilters] = useState([])
    const [fuelFilters, setFuelFilters] = useState([])
    const [cabineFilters, setCabineFilters] = useState([])
    const [wiresets, setWiresets] = useState([])
    const [sparkplugs, setSparkplugs] = useState([])
    const [brakeshoesBack, setBrakeshoesBack] = useState([])
    const [brakeshoesFront, setBrakeshoesFront] = useState([])

    useEffect(() => {
        if(context.filters.length !== 0 && JSON.stringify(context.car) !== "{}"){
            let airFilters = context.filters.filter( filterDB => filterDB.filterType === "air" )
            let oilFilters = context.filters.filter( filterDB => filterDB.filterType === "oil" )
            let fuelFilters = context.filters.filter( filterDB => filterDB.filterType === "fuel" )
            let cabineFilters = context.filters.filter( filterDB => filterDB.filterType === "cabine" )
            let wiresets = context.wiresets
            let sparkplugs = context.sparkplugs
            let brakeshoes = context.brakeshoes

            let airFiltersEquivalence = []
            let oilFiltersEquivalence = []
            let fuelFiltersEquivalence = []
            let cabineFiltersEquivalence = []
            let wiresetsEquivalence = []
            let sparkplugsEquivalence = []
            let brakeshoeBackEquivalence = []
            let brakeshoeFrontEquivalence = []

            airFilters = airFilters.filter( filter => context.car.airFilter.some( airFilter => airFilter == filter.interfil )  )
            for(let i = 0; i < airFilters.length; i++){
                airFiltersEquivalence = [...airFiltersEquivalence, airFilters[i].interfil, ...airFilters[i].OEM, ...airFilters[i].ACD,
                                  ...airFilters[i].Fram, ...airFilters[i].Gonher, ...airFilters[i].Motorcraft, ...airFilters[i].Purolator,
                                  ...airFilters[i].Wix, ...airFilters[i].Mann, ...airFilters[i].Sky, ...airFilters[i].Seineca, ...airFilters[i].Walmi,
                                ...airFilters[i].Joe, ...airFilters[i].Roadstar, ...airFilters[i].ECA]
            }

            oilFilters = oilFilters.filter( filter => context.car.oilFilter.some( oilFilter => oilFilter == filter.interfil )  )
            for(let i = 0; i < oilFilters.length; i++){
                oilFiltersEquivalence = [...oilFiltersEquivalence, oilFilters[i].interfil, ...oilFilters[i].OEM, ...oilFilters[i].ACD,
                                  ...oilFilters[i].Fram, ...oilFilters[i].Gonher, ...oilFilters[i].Motorcraft, ...oilFilters[i].Purolator,
                                  ...oilFilters[i].Wix, ...oilFilters[i].Mann, ...oilFilters[i].Sky, ...oilFilters[i].Seineca, ...oilFilters[i].Walmi,
                                ...oilFilters[i].Joe, ...oilFilters[i].Roadstar, ...oilFilters[i].ECA]
            }

            fuelFilters = fuelFilters.filter( filter => context.car.fuelFilter.some( fuelFilter => fuelFilter == filter.interfil )  )
            for(let i = 0; i < fuelFilters.length; i++){
                fuelFiltersEquivalence = [...fuelFiltersEquivalence, fuelFilters[i].interfil, ...fuelFilters[i].OEM, ...fuelFilters[i].ACD,
                                  ...fuelFilters[i].Fram, ...fuelFilters[i].Gonher, ...fuelFilters[i].Motorcraft, ...fuelFilters[i].Purolator,
                                  ...fuelFilters[i].Wix, ...fuelFilters[i].Mann, ...fuelFilters[i].Sky, ...fuelFilters[i].Seineca, ...fuelFilters[i].Walmi,
                                ...fuelFilters[i].Joe, ...fuelFilters[i].Roadstar, ...fuelFilters[i].ECA]
            }

            cabineFilters = cabineFilters.filter( filter => context.car.cabineFilter.some( cabineFilter => cabineFilter == filter.interfil )  )
            for(let i = 0; i < cabineFilters.length; i++){
                cabineFiltersEquivalence = [...cabineFiltersEquivalence, cabineFilters[i].interfil, ...cabineFilters[i].OEM, ...cabineFilters[i].ACD,
                                  ...cabineFilters[i].Fram, ...cabineFilters[i].Gonher, ...cabineFilters[i].Motorcraft, ...cabineFilters[i].Purolator,
                                  ...cabineFilters[i].Wix, ...cabineFilters[i].Mann, ...cabineFilters[i].Sky, ...cabineFilters[i].Seineca, ...cabineFilters[i].Walmi,
                                ...cabineFilters[i].Joe, ...cabineFilters[i].Roadstar, ...cabineFilters[i].ECA]
            }

            sparkplugs = sparkplugs.filter( sparkplugDB => context.car.sparkPlug.some( sparkplug => sparkplugDB.NGK.some( sparkplugNGK => sparkplug == sparkplugNGK ) )  )
            for(let i = 0; i < sparkplugs.length; i++){
                sparkplugsEquivalence = [...sparkplugsEquivalence, ...sparkplugs[i].NGK, ...sparkplugs[i].Champions, ...sparkplugs[i].ACD,
                            ...sparkplugs[i].Bosh, ...sparkplugs[i].Motorcraft]
            }

            wiresets = wiresets.filter( wiresetDB => context.car.wiresets.some( wireset => wiresetDB.Roadstar.some( wiresetRoadstar => wireset == wiresetRoadstar ) )  )
            for(let i = 0; i < wiresets.length; i++){
                wiresetsEquivalence = [...wiresetsEquivalence, ...wiresets[i].NGK, ...wiresets[i].LS, ...wiresets[i].Roadstar, ...wiresets[i].Bosh]
            }

            let brakeshoesBack = brakeshoes.filter( brakeshoeDB => context.car.brakeShoeBack.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
            for(let i = 0; i < brakeshoesBack.length; i++){
                brakeshoeBackEquivalence = [...brakeshoeBackEquivalence, ...brakeshoesBack[i].Wagner ]
            }

            let brakeshoesFront = brakeshoes.filter( brakeshoeDB => context.car.brakeShoeFront.some( brakeshoe => brakeshoeDB.Wagner.some( brakeshoeWagner => brakeshoe == brakeshoeWagner ) )  )
            for(let i = 0; i < brakeshoesFront.length; i++){
                brakeshoeFrontEquivalence = [...brakeshoeFrontEquivalence, ...brakeshoesFront[i].Wagner ]
            }

            setAirFilters(airFiltersEquivalence)
            setOilFilters(oilFiltersEquivalence)
            setFuelFilters(fuelFiltersEquivalence)
            setCabineFilters(cabineFiltersEquivalence)
            setSparkplugs(sparkplugsEquivalence)
            setWiresets(wiresetsEquivalence)
            setBrakeshoesBack(brakeshoeBackEquivalence)
            setBrakeshoesFront(brakeshoeFrontEquivalence)
        }
    }, [context.filters, context.car])

    return (
        <div className={`bg-white ${JSON.stringify(context.car) !== "{}" ? ' direction-column justify-content-start padding-top' : ''}`}>
            <Navbar />
            <Form />
            {JSON.stringify(context.car) !== "{}" && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>F. DE AIRE</th>
                                <th>F. DE ACEITE</th>
                                <th>F. DE GASOLINA</th>
                                <th>F. DE CABINA</th>
                                <th>J. DE CABLES</th>
                                <th>BUJÍAS</th> 
                                <th>B. DELANTERA</th>
                                <th>B. TRASERA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="odd">
                                   {airFilters.map( airFilter => (
                                       <p key={airFilter + Math.random().toString()}>{airFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {oilFilters.map( oilFilter => (
                                       <p key={oilFilter + Math.random().toString()}>{oilFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {fuelFilters.map( fuelFilter => (
                                       <p key={fuelFilter + Math.random().toString()}>{fuelFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {cabineFilters.map( cabineFilter => (
                                       <p key={cabineFilter + Math.random().toString()}>{cabineFilter}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {wiresets.map( wiresets => (
                                       <p key={wiresets + Math.random().toString()}>{wiresets}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {sparkplugs.map( sparkPlug => (
                                       <p key={sparkPlug + Math.random().toString()}>{sparkPlug}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {brakeshoesFront.map( brakeShoeFront => (
                                       <p key={brakeShoeFront + Math.random().toString()}>{brakeShoeFront}</p>
                                   ))}
                                </td>
                                <td className="odd">
                                   {brakeshoesBack.map( brakeShoeBack => (
                                       <p key={brakeShoeBack + Math.random().toString()}>{brakeShoeBack}</p>
                                   ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Cars
