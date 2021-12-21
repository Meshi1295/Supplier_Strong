import { combineReducers } from 'redux';

const initState = {

    customer: {},
    product: {},
    navigateToCustomerComponent: false,
    navigateToAddCustomerComponent: false

}

export const reducer_setCustomer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_CUSTOMER':
            console.log(action.payload);
            return { ...state, customer: action.payload, navigateToCustomerComponent: true }

        case 'SET_NAVIGATE':
            return { ...state, navigateToCustomerComponent: action.payload }
        default:
            return { ...state }
    }
}

export const reducer_setProduct = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            console.log(action.payload);
            return { ...state, product: action.payload }

        default:
            return { ...state }
    }
}

export const reducer = combineReducers({
    reducer_setCustomer
})