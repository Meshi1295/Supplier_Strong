import axios from 'axios';

export const setCustomer = (value) => async (dispatch) => {
    // console.log('value.profileImg', value);
    const formData = new FormData();
    formData.append("image", value.profileImg);
    formData.append("nameStore", value.nameStore);
    formData.append("fullName", value.fullName);
    formData.append("startDate", value.startDate);
    formData.append("phoneNumber", value.phoneNumber);
    formData.append("address", value.address);
    try {
        const data = await axios.post(
            'http://localhost:8080/setCustomer',
            formData
        );
        // console.log('data', data);
        dispatch({
            type: 'SET_CUSTOMER',
            payload: data
        })
    } catch (e) { console.log(e) }
}

export const setNewProduct = (value) => async (dispatch) => {
    const formData = new FormData();
    formData.append("image", value.profileImg);
    formData.append("id", value.id);
    formData.append("name", value.name);
    formData.append("price", value.price);
    formData.append("description", value.description);


    try {
        const data = await axios.post(
            'http://localhost:8080/setNewProduct',
            formData
        );
        // console.log('data', data);
        dispatch({
            type: 'SET_PRODUCT',
            payload: data
        })
    } catch (e) { console.log(e) }
}

export const setNavigateToCustomerComponent = (value) => {
    return {
        type: 'SET_NAVIGATE',
        payload: value
    }
}

export const delCustomer = (id) => (dispatch) => {
    try {
        axios
            .delete(`http://localhost:8080/deleteCustomer/${id}`, {
                method: 'DELETE',
            })
        dispatch({
            type: 'DELETE-CUSTOMER',
            payload: id
        })
    } catch (e) { console.log(e) }
}


