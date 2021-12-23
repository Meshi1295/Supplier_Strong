import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import iconNewUser from '../../img/new.png'
import { connect } from 'react-redux'
import { setNavigateToCustomerComponent, customerList } from '../../redux/actions'

const Customers = (props) => {

    const [customersIconList, setCustomersIconList] = useState('')

    // navigate
    const navigate = useNavigate();
    const iconNavigate = () => {
        props.setNavigateToCustomerComponent()
        navigate("/newCustomer");
    }


    // get customer list
    useEffect(() => {
        fetch('http://localhost:8080/allCustomer')
            .then(res => res.json())
            .then(data => {
                setCustomersIconList(data)
                props.customerList(data)
            })
            .catch((e) => console.log(e))
    }, [])

    return (
        <div>
            <section className='nuv-customers'>
                <img className="icon-newUser" src={iconNewUser} alt="newUser" onClick={iconNavigate} />
                <h1>Customers component</h1>
            </section>
            <hr />
            {
                customersIconList.length ? (
                    customersIconList.map(item => {
                        return <Link to={`/customer/` + item.customer_id} key={item.customer_id}>
                            <img src={`http://localhost:8080/uploads/${item.profileimg}`}
                                alt="Avatar" className="avatar" />
                        </Link>
                    })
                ) : null
            }
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        setNavigateToCustomerComponent: () => dispatch(setNavigateToCustomerComponent(false)),
        customerList: (value) => dispatch(customerList(value))
    }
}


export default connect(null, mapDispatchToProps)(Customers);
