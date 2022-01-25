import React, { Component } from 'react';
import NavBar from '../UserNav/UserNav';
import './UserOrder.module.css'
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
export default class UserOrder extends Component {

     constructor(props) {
          super(props)
          //      const token1 = localStorage.getItem("token1")
          //      let loggedIn=true
          //      if(token1 == null)
          //      {
          //           loggedIn=false
          //      }
          //     this.state={
          //          loggedIn
          //     }

          this.state = {
               orderList: []
          }
     }

     componentDidMount() {
          const user = localStorage.getItem("loggedUser")
          const req_obj = {
               "id": user
          }
          axios
               .post(`${localStorage.getItem("server")}/orders`, req_obj)
               .then(res => {
                    // console.log(res)
                    if(res.data.length === 0){
                         this.setState({
                              orderList: [{
                                   orderId: "order_NA_xyz",
                                   productName: "N.A",
                                   price: "N.A",
                                   quantity:"N.A",
                                   totalPrice:"N.A"
                              }]
                         })
                    }else{
                         this.setState({
                              orderList: res.data
                         })
                    }
               })
               .catch(err => {
                    console.log("Error! ", err)
               })
     }

     render() {
          // if (localStorage.getItem("isLoggedIn") === null || localStorage.getItem("isLoggedIn") === false) {
          //      return <Redirect to="/login" />
          //}
          const {orderList} = this.state
          return (
               <> <NavBar />
                    <h3>User Order List</h3>
                    <div className="container-fluid" data-testid="mobileOrderBody">
                         <table className="mt-4 table table-bordered table-hover" width="100%">
                              <thead className="col-12">
                                   <tr className="row text-light bg-primary" >
                                        <th className="col">Product Name</th>
                                        <th className="col">Price</th>
                                        <th className="col">Quantity</th>
                                        <th className="col">Total Price</th>
                                   </tr>
                              </thead>
                              <tbody className="col-12">
                                   {
                                        orderList.map(order => 
                                             <tr key={order.orderId} className="row">
                                                  <td className="px-5 py-5 col">{order.productName}</td>
                                                  <td className="px-5 py-5 col">{order.price}</td>
                                                  <td className="px-5 py-5 col">{order.quantity}</td>
                                                  <td className="px-5 py-5 col">{order.totalPrice}</td>
                                             </tr>
                                        )
                                   }
                              </tbody>
                         </table>
                    </div>
               </>
          );
     }
}