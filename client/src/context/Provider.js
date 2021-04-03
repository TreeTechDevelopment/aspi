import React, { useReducer } from 'react'

import { defaultReducer, listReducer } from './reducers';

export const appContext = React.createContext()

function Provider({ children }) {

    const [make, dispatchMake] = useReducer(defaultReducer, '')
    const [model, dispatchModel] = useReducer(defaultReducer, '')
    const [year, dispatchYear] = useReducer(defaultReducer, '')
    const [IDOrder, dispatchIDOrder] = useReducer(defaultReducer, '')
    const [car, dispatchCar] = useReducer(defaultReducer, {})
    const [carToEdit, dispatchCarToEdit] = useReducer(defaultReducer, {})
    const [filter, dispatchFilter] = useReducer(defaultReducer, {})
    const [product, dispatchProduct] = useReducer(defaultReducer, {})
    const [services, dispatchServices] = useReducer(defaultReducer, [])
    const [filters, dispatchFilters] = useReducer(defaultReducer, [])
    const [sparkplugs, dispatchSparkplugs] = useReducer(defaultReducer, [])
    const [wiresets, dispatchWiresets] = useReducer(defaultReducer, [])
    const [brakeshoes, dispatchBrakeshoes] = useReducer(defaultReducer, [])
    const [oils, dispatchOils] = useReducer(defaultReducer, [])
    const [productsPrice, dispatchProductsPrice] = useReducer(listReducer, [])
    const [coils, dispatchCoils] = useReducer(defaultReducer, [])
    const [antifreezes, dispatchAntifreezes] = useReducer(defaultReducer, [])
    const [totalSell, dispatchTotalSell] = useReducer(defaultReducer, 0)

    return (
        <appContext.Provider
            value={{
                make,
                model,
                car,
                year,
                IDOrder,
                carToEdit,
                filter,
                product,
                services,
                filters,
                wiresets,
                sparkplugs,
                brakeshoes,
                oils,
                productsPrice,
                totalSell,
                coils,
                antifreezes,
                dispatchMake,
                dispatchModel,
                dispatchCar,
                dispatchIDOrder,
                dispatchYear,
                dispatchCarToEdit,
                dispatchFilter,
                dispatchServices,
                dispatchProduct,
                dispatchFilters,
                dispatchSparkplugs,
                dispatchWiresets,
                dispatchBrakeshoes,
                dispatchOils,
                dispatchProductsPrice,
                dispatchTotalSell,
                dispatchCoils,
                dispatchAntifreezes
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider
