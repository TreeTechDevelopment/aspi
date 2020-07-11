import React, { useReducer } from 'react'

import { defaultReducer } from './reducers';

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
                sparkplugs,
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
                dispatchSparkplugs
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider
