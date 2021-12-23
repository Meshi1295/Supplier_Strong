import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { setCustomer, updateCustomers } from '../../redux/actions'
import { useNavigate, useParams } from 'react-router-dom'
import './AddCustomer.css'

const AddCustomer = (props) => {

    const [nameStore, setNameStore] = useState('')
    const [fullName, setFullName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [profileImg, setProfileImg] = useState('')

    const [btn, setBtn] = useState("")
    const [btn2, setBtn2] = useState("")
    const { id } = useParams()

    // navigate
    const navigate = useNavigate()
    useEffect(() => {
        if (props.navigateToCustomerComponent) {
            navigate('/myCustomer')
        }
    }, [props.navigateToCustomerComponent])

    useEffect(() => {
        if (window.location.pathname === `/newCustomer/${id}`) {
            setBtn('none')
        }
        if (window.location.pathname === '/newCustomer') {
            setBtn('block')
            setBtn2('none')
            { }
        }
        fetch(`http://localhost:8080/specificCustomer/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);
                setNameStore(data[0].store_name)
                setFullName(data[0].customer_name)
                setStartDate(data[0].start_work_date)
                setPhoneNumber(data[0].customer_phone)
                setAddress(data[0].address)
                setProfileImg(data[0].profileimg)
            })
    }, [])

    useEffect(() => {
        if (props.navigateToCustomerComponent) {
            navigate(`/customer/${id}`)
        }

        console.log('navigateToCustomerComponent', props.navigateToCustomerComponent);

    }, [props.navigateToCustomerComponent])

    // insert to db
    const setNewCustomer = () => {
        props.setCustomer(
            { nameStore, fullName, startDate, phoneNumber, address, profileImg });
    }

    // update details customer
    const updateCustomer = () => {

        props.updateCustomers(
            { nameStore, fullName, startDate, phoneNumber, address, profileImg, id })
        // navigate(`/customer/${id}`)

    }

    return (
        <div>
            <h1>AddCustomer component</h1>
            <div className="form-container" >
                <label>Name store:</label>
                <input defaultValue={nameStore} type="text" onChange={(e) => setNameStore(e.target.value)} />

                <label>Full Name Customer:</label>
                <input defaultValue={fullName} type="text" onChange={(e) => setFullName(e.target.value)} />

                <label>starting date:</label>
                <input defaultValue={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} />

                <label>phone:</label>
                <input defaultValue={phoneNumber} type="number" onChange={(e) => setPhoneNumber(e.target.value)} />

                <label>address:</label>
                <input defaultValue={address} type="text" onChange={(e) => setAddress(e.target.value)} />

                <label>profile img:</label>
                <input defaultValue={profileImg} type="file" alt="profileImg" name="image" accept=".jpg" className="btn"
                    onChange={(e) => setProfileImg(e.target.files[0])} />

                <input onClick={setNewCustomer} className="btn" style={{ display: btn }} type="submit" value="Add new customer" />

                <input onClick={updateCustomer} className="btn" style={{ display: btn2 }} type="submit" value="Update" />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        navigateToCustomerComponent: state.reducer_setCustomer.navigateToCustomerComponent,
        customer: state.reducer_setCustomer.customer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCustomer: (value) => dispatch(setCustomer(value)),
        updateCustomers: (data) => dispatch(updateCustomers(data))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
