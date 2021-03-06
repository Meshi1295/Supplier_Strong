import React, { useEffect, useState } from 'react'
import './DetailsCustomer.css'
import { useNavigate } from "react-router-dom";
import { setNavigateToCustomerComponent } from '../../redux/actions'
import { connect } from 'react-redux'


const DetailsCustomer = (props) => {

    const history = useNavigate();
    const { id } = props
    const [oneCustomerData, setOneCustomerData] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8080/specificCustomer/${id}`)
            .then(res => res.json())
            .then(data => setOneCustomerData(data))
            .catch(e => console.log(e))
    }, [])

    const updateCustomerId = () => {
        props.setNavigateToCustomerComponent(false)
        history(`/newCustomer/${id}`)
    }

    return (
        <div>
            <h4>Details Customer component</h4>
            {
                oneCustomerData.length ? (
                    oneCustomerData.map(item => {
                        return <div className='card-details' key={item.customer_id}>
                            <p> Customer Name: {item.customer_name}</p>
                            <p>Store Name: {item.store_name}</p>
                            <p>Phone: {item.customer_phone}</p>
                            <p>Address: {item.address}</p>
                            <p>Start work in: {item.start_work_date}</p>
                            <button onClick={updateCustomerId} className="btn">Update</button>
                        </div>
                    })
                ) : null
            }
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavigateToCustomerComponent: (value) => dispatch(setNavigateToCustomerComponent(value))
    }
}
export default connect(null, mapDispatchToProps)(DetailsCustomer);