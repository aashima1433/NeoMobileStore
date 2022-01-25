import React, { Component } from 'react';
import AdminNavBar from '../AdminNav/AdminNav';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
class OrderList extends Component {
     constructor(props) {
          super(props)
          const token = localStorage.getItem("isAdmin")
          let adminloggedIn = true
          if (token !== 'true') {
               adminloggedIn = false
          }
          this.state = {
               products: [],
               adminloggedIn
          }

     }
     componentDidMount() {
          axios.get(`${localStorage.getItem("server")}/admin/orders`)
               .then(response => {
                    // console.log(response)
                    this.setState({
                         products: response.data
                    })
               })
               .catch(error => {
                    console.log(error)
               })
     }

     render() {
          // if (this.state.adminloggedIn === false)
          //      return <Redirect to="/login" />
          const { products } = this.state
          return (
               <> <AdminNavBar />
                    <h3>Admin Order List</h3>
                    <div data-testid="adminOrderBody" id="adminOrderBody">
                         <div className="container-fluid" data-testid="mobileAdminOrderBody" id="mobileAdminOrderBody">
                              <table className="mt-4 table table-bordered table-hover" width="100%">
                              <thead className="col-12">
                                   <tr className="row text-light bg-primary">
                                        <th className="col">Order Id</th>
                                        <th className="col">User Id</th>
                                        <th className="col">Mobile Name</th>
                                        <th className="col">Price</th>
                                        <th className="col">Quantity</th>
                                   </tr>
                              </thead>
                              <tbody className="col-12">
                                   {
                                        products.map(
                                             product =>
                                                  <tr key={product.orderId} className="row">
                                                       <td className="px-5 py-5 col">{product.orderId}</td>
                                                       <td className="px-5 py-5 col">{product.userId}</td>
                                                       <td className="px-5 py-5 col">{product.productName}</td>
                                                       <td className="px-5 py-5 col">{product.totalPrice}</td>
                                                       <td className="px-5 py-5 col">{product.quantity}</td>
                                                  </tr>
                                        )
                                   }
                              </tbody>
                         </table>
                         </div>
                    </div>
               </>
          );
     }
}

export default OrderList