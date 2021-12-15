import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import customer from '../../img/customers.png'
import './CustomerList.css'

class CustomerList extends Component {
    render() {
        return (
            <div className="customerlist-container">
                <Link to='/myCustomer'>
                    <img className="customer-icon" src={customer} alt="customer-list" />
                </Link>
                <small>My Customer list</small>
            </div>
        )
    }
}

export default CustomerList;
