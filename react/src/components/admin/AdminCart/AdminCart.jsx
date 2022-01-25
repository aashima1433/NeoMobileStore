import React, { Component } from 'react';
import AdminNavBar from '../AdminNav/AdminNav';
import { Redirect, Link } from 'react-router-dom';
import './AdminCart.module.css'
import axios from 'axios'
class AdminCart extends Component {
     constructor(props) {
          super(props)
          const token = localStorage.getItem("isAdmin")
          let adminloggedIn = true
          if (token !== 'true') {
               adminloggedIn = false
          }
          this.state = {
               usercartlist: [],
               adminloggedIn
          }

     }
     componentDidMount() {
          axios.get(`${localStorage.getItem("server")}/admin/cart`)
               .then(response => {
                    console.log(response.data)
                    this.setState({
                         usercartlist: response.data
                    })
               })
               .catch(error => {
                    console.log(error)
               })
     }

     render() {
          // if (this.state.adminloggedIn === false)
          //      return <Redirect to="/login" />
          const { usercartlist } = this.state
          return (
               <> <AdminNavBar />
                    
                    <div data-testid="mobileAdminCartBody" id="mobileAdminCartBody">
                    <h3>Admin Cart List</h3>
                         <div className="container-fluid" data-testid="adminCartBody" id="adminCartBody">
                              {
                                   usercartlist.map(item =>
                                        <div key={item.userId} style={{marginBottom: "5px", backgroundColor: "#e8e7e769"}}>
                                             <div className="d-grid gap-2 d-md-block" style={{justifyContent: "left"}}>
                                                  <button type="button" className="btn btn-info" style={{marginRight: "5px"}} disabled><span><b>User: </b>{item.userId}</span></button>
                                                  <button type="button" className="btn btn-info" style={{marginRight: "5px"}}  disabled><span><b>Cart: </b>{item.cartId}</span></button>
                                                  <button type="button" className="btn btn-info" style={{marginRight: "5px"}}  disabled><span><b>Total Items: </b>{item.cartItemCount}</span></button>
                                             </div>
                                             { item.cartItemCount > 0 &&
                                                       <table className="mt-1 table table-bordered table-hover" width="100%" style={{marginTop:"2px !important"}}>
                                                            <thead className="col-12">
                                                                 <tr className="row text-light bg-primary">
                                                                      <th className="col">Cart Item Id</th>
                                                                      <th className="col">Product Name</th>
                                                                      <th className="col">Price</th>
                                                                      <th className="col">Quantity</th>
                                                                 </tr>
                                                            </thead>
                                                            <tbody className="col-12">
                                                                 {
                                                                     item.cartItems.map(citem => 
                                                                                <tr className="row" key={citem.id} >
                                                                                     <td className="col">{citem.id}</td>
                                                                                     <td className="col">{citem.productName} </td>
                                                                                     <td className="col"> {citem.price} </td>
                                                                                     <td className="col">{citem.quantity}</td>
                                                                                </tr>
                                                                      )
                                                                 }
                                                            </tbody>
                                                       </table>
                                             }
                                        </div>
                                   )
                              }
                         </div>
                    </div>
               </>
          );
     }
}

export default AdminCart