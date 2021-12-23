import React, { Component } from 'react'
import './home.css'
import CustomerList from '../../components/CustomerList/CustomerList'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <CustomerList />
            </div>
        )
    }
}
export default Home