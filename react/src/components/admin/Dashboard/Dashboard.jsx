import React, { Component } from 'react';
import AdminNavBar from '../AdminNav/AdminNav'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartRounded'
import newPhoneCart from './newPhoneCart.jpg';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios'
export default class Dashboard extends Component {
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
     fetchProductList(){
          axios.get(`${localStorage.getItem("server")}/admin`)
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

     handleDeleteProduct(id){
          axios.get(`${localStorage.getItem('server')}/admin/delete/${id}`)
               .then(res => {
                    if(res.data !== null){
                         console.log(res.data)
                         this.fetchProductList()
                    }else{
                         console.log("Error! Unable to delete selected product")
                    }
               })
               .catch(err => {
                    console.log("Error! ", err)
               })
     }

     handlePostLocalStorage = (stat, id) => {
          localStorage.setItem("isNewProduct", stat)
          localStorage.setItem("isNewProductId", id)
     }

     componentDidMount() {
          this.fetchProductList()
     }

     render() {
          // if (this.state.adminloggedIn === false)
          //      return <Redirect to="/login" />
          const { products } = this.state
          return (
               <>
                    <AdminNavBar />
                    <div className="container-fluid mt-5 mb-5 pt-5 row">
                         <div className="table-responsive col-8 ml-2 mr-0 pr-0" data-testid="adminDashboard" id="adminDashboard">
                              <table className="mt-5 table-striped table-bordered table-hover">
                                   <thead>
                                        <tr className="text-light bg-primary">
                                             <th className="col px-5 py-1">Image</th>
                                             <th className="col px-5 py-1">Mobile Name</th>
                                             <th className="col px-5 py-1">Price</th>
                                             <th className="col px-5 py-1">Quantity</th>
                                             <th className="col px-5 py-1"></th>
                                        </tr>
                                   </thead>
                                   <tbody className="col-12">
                                        {
                                             products.map(
                                                  product =>
                                                       <tr key={product.id}>
                                                            <td className="px-5 py-5">
                                                                 <img src={product.imageUrl} alt={product.productName} style={{height: 150 + 'px', width: 'auto'}}/>
                                                            </td>
                                                            <td className="px-5 py-5">{product.productName}</td>
                                                            <td className="px-5 py-5">{product.price}</td>
                                                            <td className="px-5 py-5">{product.quantity}</td>
                                                            <td className="px-2 py-5">
                                                                 <Link to="/addProduct" className="btn btn-warning btn-sm mx-2" onClick={this.handlePostLocalStorage.bind(this, false, product.id)}><EditIcon /></Link>
                                                                 <button type="button" className="btn btn-danger btn-sm mx-2" onClick={this.handleDeleteProduct.bind(this, product.id)}><DeleteIcon /></button>
                                                            </td>
                                                       </tr>
                                             )
                                        }
                                   </tbody>
                              </table>
                         </div>
                         <div className="col-2 mt-5 pt-5 ml-2 pl-1">
                              <div>
                                   <img src={newPhoneCart} />
                              </div>
                              <div className="mt-5">
                              <Link to="/addProduct" role="button" className="btn btn-primary btn-sm px-3 py-1" data-testid="addMobileButton"
                                        id="addMobileButton" onClick={this.handlePostLocalStorage.bind(this, true, '')}> <ShoppingCartIcon /> Add Product</Link>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}
