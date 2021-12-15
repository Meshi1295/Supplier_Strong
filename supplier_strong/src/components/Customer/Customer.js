import React, { useState } from 'react'
import logo2 from '../../img/logo2.png'
import DetailsCustomer from '../Details/DetailsCustomer';

const Customer = (props) => {
    console.log('props', props);
    const [isShow, setIsShow] = useState(false);

    const showDetails = () => {
        setIsShow(!isShow)
    }

    return (
        <div>
            <header className="hed-customer">
                <ul className="list">
                    <li><input type="submit" value="Delete Customer" /></li>
                    <li><input type="submit" value="Details" onClick={showDetails} /></li>
                    <li><img src={logo2} alt="customer" className="avatar" /></li>
                    <li id="DetailsData"> {isShow ? <DetailsCustomer /> : <p>No Details</p>} </li>
                </ul>
            </header>

            <table id='table' className="table table-hover">
                <thead>
                    <th> product name</th>
                    <th>Fixed price</th>
                    <th>Starting quantity of products</th>
                    <th>How much is left in the store</th>
                    <th>How much is sold</th>
                    <th>Total money</th>
                    <th>Quantity of products to complete</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Delicious sausage</td>
                        <td>2 $</td>
                        <td>100</td>
                        <td>50</td>
                        <td>50</td>
                        <td>100 $</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Customer;