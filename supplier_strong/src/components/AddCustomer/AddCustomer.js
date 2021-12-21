import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { setCustomer } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'

const AddCustomer = (props) => {

    const [nameStore, setNameStore] = useState('')
    const [fullName, setFullName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [profileImg, setProfileImg] = useState('')

    // navigate
    const navigate = useNavigate()
    useEffect(() => {
        if (props.navigateToCustomerComponent) {
            navigate('/myCustomer')
        }
    }, [props.navigateToCustomerComponent])

    // insert to db
    const setNewCustomer = (e) => {
        e.preventDefault()
        props.setCustomer(
            { nameStore, fullName, startDate, phoneNumber, address, profileImg });
    }

    return (
        <div>
            <h1>AddCustomer component</h1>
            <form className="form-container" onSubmit={setNewCustomer} method="POST">
                <label>Name store:</label>
                <input type="text" onChange={(e) => setNameStore(e.target.value)} />

                <label>Full Name Customer:</label>
                <input type="text" onChange={(e) => setFullName(e.target.value)} />

                <label>starting date:</label>
                <input type="date" onChange={(e) => setStartDate(e.target.value)} />

                <label>phone:</label>
                <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} />

                <label>address:</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} />

                <label>profile img:</label>
                <input type="file" alt="profileImg" name="image" accept=".jpg"
                    onChange={(e) => setProfileImg(e.target.files[0])} />

                <input type="submit" value="Add new customer" />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        navigateToCustomerComponent: state.reducer_setCustomer.navigateToCustomerComponent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCustomer: (value) => dispatch(setCustomer(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
