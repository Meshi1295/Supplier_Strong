import React, { useEffect, useState } from 'react'
import './DetailsCustomer.css'


const DetailsCustomer = () => {
    const [allCustomerData, setAllCustomerData] = useState('')
    console.log("allCustomerData", allCustomerData);

    useEffect(() => {
        fetch('http://localhost:8080/allCustomer')
            .then(res => res.json())
            .then(data => setAllCustomerData(data))
    }, [])


    return (
        <div>
            <h4>Details Customer</h4>
            {
                allCustomerData.length ? (
                    allCustomerData.map(item => {
                        return <div className='card-details' key={item.customer_id}>
                            <p> Customer Name: {item.customer_name}</p>
                            <p>Store Name: {item.store_name}</p>
                            <p>Phone: {item.customer_phone}</p>
                            <p>Address: {item.customer_address}</p>
                            <p>Start work in: {item.start_work_date}</p>
                            <button>Update</button>
                        </div>
                    })
                ) : null
            }
        </div>
    )
}
export default DetailsCustomer;