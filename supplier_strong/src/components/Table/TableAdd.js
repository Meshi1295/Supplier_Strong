import React, { useEffect, useState } from 'react'
import './TableAdd.css'
import { connect } from 'react-redux'
import { setNewProduct, delProduct } from '../../redux/actions'

const TableAdd = (props) => {

    const [products, setProducts] = useState([])
    const [addFormData, setAddFormData] = useState({
        id: '',
        name: '',
        price: '',
        profileImg: '',
        description: ''
    })
    const [profileImg, setProfileImg] = useState('')


    useEffect(() => {
        fetch('http://localhost:8080/allProducts')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch((e) => console.log(e))

    }, [])

    useEffect(() => {
        const findProduct = products.findIndex(item => {
            return item.id == props.product.id
        })
        if (findProduct !== -1) {
            products.splice(findProduct, 1)
            setProducts([...products])
        }

        fetch('http://localhost:8080/allProducts')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch((e) => console.log(e))

    }, [props.product])

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
            profileImg: profileImg,
            description: addFormData.description
        }
        const newProduct2 = { ...newProduct, profileImg: profileImg.name }
        console.log('newProduct2', newProduct2);
        const newProducts2 = [...products]
        newProducts2.push(newProduct2)
        // products.push(newProduct)
        // const newProducts = [...products]

        // console.log('profileImg', profileImg.name);
        setProducts([...newProducts2])
        props.setNewProduct(newProduct)
    }



    return (
        <div >
            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Fixed Price</th>
                        <th>image</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <img
                                    style={{ width: '50px', height: '50px' }}
                                    src={`http://localhost:8080/uploads/${product.image}`} alt="product" />
                            </td>
                            <td>{product.description}</td>
                            <td>
                                <button className="btn edit">Edit</button>
                                <button
                                    onClick={() => props.delProduct(product.id)}
                                    className="btn delete" >
                                    Delete
                                </button>
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

                <input type="file" alt="profileImg" name="image" accept=".jpg"
                    onChange={(e) => setProfileImg(e.target.files[0])} />

                <input type="text" name="description" placeholder="Description"
                    onChange={addFormChange} />
                <button className="btn">Add</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        product: state.reducer_setProduct.product
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNewProduct: (value) => dispatch(setNewProduct(value)),
        delProduct: (id) => dispatch(delProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAdd)
