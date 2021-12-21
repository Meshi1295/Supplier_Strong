import React, { useState } from 'react'
import './TableAdd.css'
import { connect } from 'react-redux'
import { setNewProduct } from '../../redux/actions'

const TableAdd = (props) => {
    const [products, setProducts] = useState([])
    const [addFormData, setAddFormData] = useState({
        id: '',
        name: '',
        price: '',
        description: ''
    })

    const addFormChange = (e) => {
        e.preventDefault()

        const fieldName = e.target.name
        const fieldValue = e.target.value

        addFormData[fieldName] = fieldValue
        const newFormData = { ...addFormData }

        setAddFormData(newFormData);
    }

    const addFormSubmit = (e) => {
        e.preventDefault()
        const newProduct = {
            id: addFormData.id,
            name: addFormData.name,
            price: addFormData.price,
            description: addFormData.description
        }

        products.push(newProduct)
        const newProducts = [...products]
        setProducts(newProducts)

        props.setNewProduct(products)
    }

    return (
        <div >
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Fixed Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="btn edit">Edit</button>
                                <button className="btn delete" >Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

            <h6>Add a Product</h6>
            <form className="product" onSubmit={addFormSubmit} method="POST">
                <input type="number" name="id" placeholder="Product ID"
                    onChange={addFormChange} />
                <input type="text" name="name" placeholder="Product name"
                    onChange={addFormChange} />
                <input type="number" name="price" placeholder="Fixed Price"
                    onChange={addFormChange} />
                <input type="text" name="description" placeholder="Description"
                    onChange={addFormChange} />
                <button className="btn">Add</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewProduct: (value) => dispatch(setNewProduct(value))
    }
}

export default connect(null, mapDispatchToProps)(TableAdd)
