import React, { useState, useEffect } from 'react'
import DetailsCustomer from '../Details/DetailsCustomer';
import InternalNav from '../InternalNav/InternalNav'
import { connect } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { delCustomer, setNavigateToCustomerComponent } from '../../redux/actions'

const Customer = (props) => {

    const [profileimg, setProfileimg] = useState('')
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

    useEffect(() => {
        setNavigateToCustomerComponent(false)
    }, [])

    useEffect(() => {
        const customer = props.customerList.find(item => {
            return item.customer_id == id
        })

        if (customer) {
            setProfileimg(customer.profileimg)
        } else {
            fetch('http://localhost:8080/allCustomer')
                .then(res => res.json())
                .then(data => {
                    const imgs = data.find(item => {
                        return item.customer_id == id
                    })
                    setProfileimg(imgs.profileimg)
                })
                .catch((e) => console.log(e))
        }
    }, [props.customerList])

    useEffect(() => {
        if (props.customer.data) {
            setProfileimg(props.customer.data.profileimg)
        }
    }, [props.customer])

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

            < InternalNav id={id} />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        navigateToCustomerComponent: state.reducer_setCustomer.navigateToCustomerComponent,
        customerList: state.reducer_customersList.customerList,
        customer: state.reducer_setCustomer.customer

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delCustomer: (id) => dispatch(delCustomer(id)),
        setNavigateToCustomerComponent: (value) => dispatch(setNavigateToCustomerComponent(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);