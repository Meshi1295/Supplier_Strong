export const setCustomer = (value) => async (dispatch) => {
    console.log(value);

    try {
        const res = await fetch('http://localhost:8080/setCustomer', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(value)
        })
        const data = await res.json()

        dispatch({
            type: 'SETCUSTOMER',
            payload: data
        })

    } catch (e) {
        console.log(e);
    }
}