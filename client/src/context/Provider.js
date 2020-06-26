import React, { useReducer } from 'react'

import { defaultReducer } from './reducers';

export const appContext = React.createContext()

function Provider({ children }) {

    const [make, dispatchMake] = useReducer(defaultReducer, '')
    const [model, dispatchModel] = useReducer(defaultReducer, '')
    const [year, dispatchYear] = useReducer(defaultReducer, '')
    const [IDOrder, dispatchIDOrder] = useReducer(defaultReducer, '')
    const [car, dispatchCar] = useReducer(defaultReducer, {})

    return (
        <appContext.Provider
            value={{
                make,
                model,
                car,
                year,
                IDOrder,
                dispatchMake,
                dispatchModel,
                dispatchCar,
                dispatchIDOrder,
                dispatchYear
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default Provider
