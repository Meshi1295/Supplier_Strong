import React, { useState } from 'react'
import DetailsCustomer from '../Details/DetailsCustomer';
import InternalNav from '../InternalNav/InternalNav'
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { delCustomer } from '../../redux/actions'


const Customer = (props) => {
    const { profileimg } = props
    const { id } = useParams()

    // show and hidden details
    const [isShow, setIsShow] = useState(false);
    const showDetails = () => {
        setIsShow(!isShow)
    }

    // navigate
    const navigate = useNavigate()
    const changeNavigate = () => {
        props.delCustomer(id);
        navigate('/myCustomer')
    }

    return (
        <div>
            <h6>Customer component</h6>
            <header className="hed-customer">
                <ul className="list">
                    <li>
                        <input
                            className="btn"
                            type="submit"
                            value="Delete Customer"
                            onClick={changeNavigate} /></li>
                    <li><input
                        className="btn"
                        type="submit"
                        value="Details"
                        onClick={showDetails} /></li>
                    <li><img src={`http://localhost:8080/uploads/${profileimg}`} alt="customer" className="avatar" /></li>
                    <li id="DetailsData"> {isShow ? <DetailsCustomer id={id} /> : <p>No Details</p>} </li>
                </ul>
            </header>

            < InternalNav />
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
        delCustomer: (id) => dispatch(delCustomer(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);