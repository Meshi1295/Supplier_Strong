import React, { useState } from 'react'
import data from './mock-data.json'
import './TableAdd.css'
import { connect } from 'react-redux'
import { setNewProduct } from '../../redux/actions'

const TableAdd = (props) => {
    const [products, setProducts] = useState(data)
    const [addFormData, setAddFormData] = useState({
        id: '',
        name: '',
        price: '',
        img: '',
        description: ''
    })

    const addFormChange = (e) => {
        e.preventDefault()

        const fieldName = e.target.name
        const fieldValue = fieldName === 'img' ? e.target.files[0] : e.target.value

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
            img: addFormData.img,
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
                        <th>Product Image</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><img src={`http://localhost:8080/uploads/${product.img}`} alt="product" className="productImg" /></td>
                            <td>{product.description}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <h6>Add a Product</h6>
            <form className="product" onSubmit={addFormSubmit} method="POST">
                <input type="text" name="id" placeholder="Product ID"
                    onChange={addFormChange} />
                <input type="text" name="name" placeholder="Product name"
                    onChange={addFormChange} />
                <input type="text" name="price" placeholder="Fixed Price"
                    onChange={addFormChange} />
                <input type="file" name="img" placeholder="img"
                    onChange={addFormChange} />
                <input type="text" name="description" placeholder="Description"
                    onChange={addFormChange} />
                <button>Add</button>
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
