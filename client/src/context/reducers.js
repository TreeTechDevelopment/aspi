

export const defaultReducer = (state, action) => {
    switch(action.type){
        case 'SET':
            return action.value
        default:
            return state
    }
}

export const listReducer = (state, action) => {
    switch(action.type){
        case 'SET':
            return action.value
        case 'ADD':
            let idx1 = state.findIndex( product => product._id == action.value._id )
            if(idx1 < 0){ return [...state, action.value] }
            return state
        case 'UPDATE':
            let idx = state.findIndex( product => product._id == action.value._id )
            state[idx].quantity = action.value.quantity
            return state
        case 'REMOVE':
            let idx2 = state.findIndex( product => product._id == action.value._id )
            state.splice(idx2, 1)
            return state
        default:
            return state
    }
}