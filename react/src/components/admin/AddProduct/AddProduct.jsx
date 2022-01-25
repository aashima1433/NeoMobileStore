import React, { Component } from 'react';
import AdminNavBar from '../AdminNav/AdminNav';
import { Redirect, Link } from 'react-router-dom';
import AddProductPic from "./AddProduct.jpg"
import axios from 'axios'
class AddProduct extends Component {
    constructor(props) {
        super(props)

        const token = localStorage.getItem("isAdmin")
        let adminloggedIn = true
        if (token !== 'true') {
            adminloggedIn = false
        }

        // console.log(this.props.location)

        const isNewProduct = (localStorage.getItem("isNewProduct") !== null) ? localStorage.getItem("isNewProduct") : true;
        const isNewProductId = (localStorage.getItem("isNewProductId") !== null) ? localStorage.getItem("isNewProductId") : '';
        console.log(localStorage.getItem("isNewProduct"))
        this.state = {
            id: isNewProductId,
            productId: '',
            productName: '',
            price: '',
            description: '',
            imageUrl: '',
            quantity: '',
            isNewProduct: isNewProduct,
            adminloggedIn
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { id, productId, productName, price, description, imageUrl, quantity } = this.state
        console.log(this.state.isNewProduct)
        if(this.state.isNewProduct === true || this.state.isNewProduct === "true"){
            const req_obj = {
                productName: productName,
                price: price,
                description: description,
                imageUrl: imageUrl,
                quantity: quantity
            }
            console.log("New product: ", req_obj)
            axios
                .post(`${localStorage.getItem("server")}/admin/addProduct`, req_obj)
                .then(response => {
                    // console.log(response)
                    if (response.data !== null) {
                        console.log(response.data)
                        this.props.history.push("/admin")
                    } else {
                        console.log("Error! Unable to add product with provided data")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            const req_obj = {
                productId: productId,
                productName: productName,
                price: price,
                description: description,
                imageUrl: imageUrl,
                quantity: quantity
            }
            axios
                .post(`${localStorage.getItem("server")}/admin/productEdit/${id}`, req_obj)
                .then(response => {
                    // console.log(response)
                    if (response.data !== null) {
                        console.log(response.data)
                        this.props.history.push("/admin")
                    } else {
                        console.log("Error! Unable to update product with provided data")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            // console.log(`${localStorage.getItem("server")}/admin/productEdit/${id}`)
        }
    }
    handleClear = () => {
        this.setState({
            id: '',
            productId: '',
            productName: '',
            price: '',
            description: '',
            imageUrl: '',
            quantity: '',
            isNewProduct: true,
        });
    }

    componentDidMount() {
        console.log(this.state)
        if(!this.state.isNewProduct || this.state.isNewProduct == "false"){
            axios.get(`${localStorage.getItem("server")}/admin/productEdit/${this.state.id}`)
                .then(res => {
                    console.log(res)
                    if (res.data !== null) {
                        console.log(res)
                        this.setState({
                            id: res.data.id,
                            productId: res.data.productId || '',
                            productName: res.data.productName || '',
                            price: res.data.price || '',
                            description: res.data.description || '',
                            imageUrl: res.data.imageUrl || '',
                            quantity: res.data.quantity || ''
                        })
                    }
                })
                .catch(err => {
                    console.log("Error! ", err);
                })
        }
    }

    render() {
        // if (this.state.adminloggedIn === false)
        //     return <Redirect to="/login" />
        const { productName, price, description, imageUrl, quantity } = this.state
        // console.log(this.state)
        return (
            <>      <AdminNavBar />

                <div className="container mt-5 row " >
                    <div className="col-lg-6  header-img img-fluid animated">
                        <img src={AddProductPic} alt="AddProduct" />
                    </div>


                    <div className="col-xl-6 d-flex justify-content-end" data-testid="addMobileBody" id="addMobileBody" >
                        <div className="addproduct-form form-group">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <button className="btn btn-primary btn-lg" type="reset" onClick={this.handleClear}>ADD A NEW PRODUCT</button>
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="mobileName">
                                    </label>
                                    <input type="text" data-testid="mobileName" id="mobileName" className="form-control" name="productName" value={productName}
                                        autoComplete="off" placeholder="Product Name" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobilePrice">
                                    </label>
                                    <input type="text" data-testid="mobilePrice" id="mobilePrice" className="form-control" name="price" value={price}
                                        autoComplete="off" placeholder="Product Price" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileDescription">
                                    </label>
                                    <textarea cols="23" rows="4" className="form-control" data-testid="mobileDescription" id="mobileDescription" name="description" value={description}
                                        autoComplete="off" placeholder="Product Description" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobileImageURL">
                                    </label>
                                    <input type="url" data-testid="mobileImageURL" id="mobileImageURL" className="form-control" name="imageUrl" value={imageUrl}
                                        autoComplete="off" placeholder="Image URL" onChange={this.handleChange} required />
                                </div>
                                <div className="form-group">
                                    <input type="number" data-testid="mobileQuantity" id="mobileQuantity" className="form-control" name="quantity" value={quantity}
                                        autoComplete="off" placeholder="Product Quantity" onChange={this.handleChange} required />
                                </div>
                                <div>
                                    <button className="btn btn-primary" data-testid="addMobileButton" type="submit" id="addMobileButton" >
                                        {!this.state.isNewProduct || this.state.isNewProduct === "false" ? 'UPDATE':'ADD'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </>
        )
    }
}

export default AddProduct
