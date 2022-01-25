import React, { Component } from 'react';
import NavBar from '../UserNav/UserNav';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
class Cart extends Component {
     constructor(props) {
          super(props)

          this.state = {
               cartList: []
          }
     }
     fetchCartList = () => {
          axios.get(`${localStorage.getItem("server")}/cart/${localStorage.getItem("loggedUser")}`)
               .then(res => {
                    // console.log(res)
                    if (res.data !== null && res.data.length !== 0) {
                         this.setState({
                              cartList: res.data
                         })
                    } else {
                         this.setState({
                              cartList: []
                         })
                         console.log("Cart is Empty")
                    }
               })
               .catch(error => {
                    console.log(error)
               })
     }

     handleRemoveCartItem(id) {
          // console.log(id)
          axios.post(`${localStorage.getItem("server")}/cart/delete`, { "id": id})
               .then(res => {
                    if(res.data !== null){
                         console.log(res.data)
                         this.fetchCartList()
                    }else{
                         console.log("Error! Unable to delete selected item")
                    }
               })
               .catch(err => {
                    console.log("Error! ", err)
               })
     }

     handleOrders = e => {
          axios.post(`${localStorage.getItem("server")}/saveOrder`, {"id": localStorage.getItem("loggedUser")})
               .then(res => {
                    if(res.data !== null){
                         console.log(res.data)
                         this.props.history.push("/orders")
                    }
               })
               .catch(err => {
                    console.log("Error! ", err)
               })
     }

     componentDidMount() {
          this.fetchCartList()
     }

     render() {
          // if (localStorage.getItem("isLoggedIn") === null)
          //      return <Redirect to="/login" />
          const { cartList } = this.state

          return (

               <> <NavBar />
                    <h3>User Cart</h3>
                    <div className="container-fluid" data-testid='mobileCartBody' >
                         <table className="mt-4 table table-bordered table-hover" width="100%">
                              <thead className="col-12">
                                   <tr className="row text-light bg-primary">
                                        <th className="col">Product Name</th>
                                        <th className="col">Price</th>
                                        <th className="col">Quantity</th>
                                        <th className="col"></th>
                                   </tr>
                              </thead>
                              <tbody className="col-12">
                                   {
                                        cartList.map(
                                             cart =>
                                                  <tr className="row" key={cart.id} >
                                                       <td className="col">{cart.productName} </td>
                                                       <td className="col"> {cart.price} </td>
                                                       <td className="col">{cart.quantity}</td>
                                                       <td className="col">
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={this.handleRemoveCartItem.bind(this, cart.id)}>
                                                                 <DeleteIcon />
                                                            </button>
                                                       </td>
                                                  </tr>
                                        )
                                   }
                              </tbody>
                         </table>
                    </div>
                    <div className="px-3 py-1 ml-0 float-left">
                         <a role="button" href="#" className="btn btn-warning btn-lg" onClick={this.handleOrders} data-testid="placeOrderButton" id="placeOrderButton"> Place Order </a>
                    </div>
               </>
          );
     }
}

export default Cart