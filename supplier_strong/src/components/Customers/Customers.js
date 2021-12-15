import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
// import logo2 from '../../img/logo2.png'
import newUser from '../../img/new.png'

const Customers = () => {
    const [customerIconList, setCustomerIconList] = useState('')

    useEffect(() => {
        fetch('http://localhost:8080/allCustomer')
            .then(res => res.json())
            .then(data => setCustomerIconList(data))
    }, [])

    return (
        <div>
            <section className='nuv-customers'>
                <Link to="/myCustomer/newCustomer">
                    <img className="icon-newUser" src={newUser} alt="newUser" />
                </Link>
                <h1>Customers</h1>
            </section>
            <hr />


            {
                customerIconList.length ? (
                    customerIconList.map(item => {
                        return <Link to={`/myCustomer/Customer/` + item.customer_id} key={item.customer_id}>
                            <img src={item.profileimg} alt="Avatar" className="avatar" />
                        </Link>
                    })
                ) : null
            }

        </div>
    )
}

export default Customers;
