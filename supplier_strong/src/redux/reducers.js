import { combineReducers } from 'redux';

const initState = {
    addCustomer: {}
}

export const reducer_setCustomer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SETCUSTOMER':
            console.log(action.payload);
            return { ...state, addCustomer: action.payload }

        default:
            return { ...state }
    }
}

export const reducer = combineReducers({
    reducer_setCustomer
})