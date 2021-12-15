import React, { Component } from 'react'
import './home.css'
import CustomerList from '../../components/CustomerList/CustomerList'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Home</h1>
                <CustomerList />
            </div>
        )
    }
}
export default Home