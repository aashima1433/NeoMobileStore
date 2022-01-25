import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import NavBar from '../UserNav/UserNav';
import axios from 'axios';
import productStyle from './Product.module.css';

export default class Product extends Component {
     constructor(props) {
          super(props)
          this.state = {
               product: this.props.location.product,
               quantity: 1
          }
          // console.log(this.props.location.product)
     }
     handleQuantityChange = e => {
          this.setState({
               quantity: e.target.value
          })
     }
     handleClick = e => {
          const { id, quantity } = this.state.product
          e.preventDefault()
          axios
               .post(`${localStorage.getItem("server")}/home/${id}`, {"Quantity": this.state.quantity, "user": localStorage.getItem("loggedUser")})
               .then(response => {
                    // console.log(response)
                    if(response.data !== ""){
                         console.log(response.data)
                         this.props.history.push("/cart")
                    }else{
                         console.log("Unable to Add Item to Cart")
                    }
               })
               .catch(error => {
                    console.log(error)
               })
     }

     placeOrder = e => {
          const quantity = parseInt(this.state.quantity)
          const user = localStorage.getItem("loggedUser")
          const {productName, price } = this.state.product

          const req_obj = {
               "userId": user,
               "productName": productName,
               "quantity": quantity,
               "price": price
          }

          axios
               .post(`${localStorage.getItem("server")}/placeOrder`, req_obj)
               .then(res => {
                    console.log(res)
                    if(res.data !== null){
                         console.log(res.data)
                         this.props.history.push("/orders")
                    }
               })
               .catch(err => {
                    console.log(err)
               })
     }

     render() {
          if(!this.props.location.product){
               return <Redirect to="/home" />
          }

          const {product} = this.state
          return (
               <>   <NavBar />
                    <div className="container row">
                         <div className="col-6 float-left">
                              <div className={`mt-5 ml-5 w-50 h-50 border ${productStyle.relative}`} >
                                   <img className={productStyle.cover} src={product.imageUrl} alt={product.productName}/>
                              </div>
                              <div className="mt-3 mb-5 ml-1 w-75 h-50 border" >
                                   <h3 >Product Details </h3>
                                   <div><strong>Name: </strong>{product.productName}</div>
                                   <div><strong>Price: </strong>{product.price}</div>
                              </div>
                         </div>
                         <div className="col-6 my-5 float-right border p-5">
                              <div className="py-5 my-5">
                                   <h3>Product Name, Price Descprition and other necessary Items</h3>
                              </div>
                              <div className="">
                                   <div className="">
                                        <div>Quantity</div>
                                        <input type="number" min={1} max={parseInt(this.state.product.quantity)} value={this.state.quantity} onChange={this.handleQuantityChange}/>
                                   </div>
                                   <button className="btn btn-warning btn-lg float-left" onClick={this.handleClick}>Add to Cart</button>
                                   <button className="btn btn-primary btn-lg float-right" onClick={this.placeOrder}>Place Order</button>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}