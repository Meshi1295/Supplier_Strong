import { combineReducers } from 'redux';

const initState = {
    // updateCustomer: {},
    customer: {},
    product: {},
    navigateToCustomerComponent: false,
    navigateToAddCustomerComponent: false,

    customerList: []

}

export const reducer_setCustomer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_CUSTOMER':
            return { ...state, customer: action.payload, navigateToCustomerComponent: true }

        case 'SET_NAVIGATE':
            return { ...state, navigateToCustomerComponent: action.payload }

        case 'UPDATE_CUSTOMER':
            console.log('UPDATE_CUSTOMER', action.payload);
            return { ...state, customer: action.payload, navigateToCustomerComponent: true }
        default:
            return { ...state }
    }
}

export const reducer_setProduct = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return { ...state, product: action.payload }

        case 'DELETE_PRODUCT':
            console.log("reducer_setProduct", action.payload);
            return { ...state, product: action.payload[0] }
        default:
            return { ...state }
    }
}

export const reducer_customersList = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CUSTOMER_LIST':
            return { ...state, customerList: action.payload }

        default:
            return { ...state }
    }

}

export const reducer = combineReducers({
    reducer_setCustomer,
    reducer_setProduct,
    reducer_customersList
})