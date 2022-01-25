import React, { Component } from 'react';
import styles from './ProductList.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default class ProductList extends Component {

     constructor() {
          super();
          this.state = {
               products: []
          }
     }

     componentDidMount() {
          //this.getProductsData()
          this.refreshProdList();
     }

     refreshProdList() {
          axios
               .get(`${localStorage.getItem("server")}/home`)
               .then(res => {
                    this.setState({
                         products: res.data
                    })
               })
               .catch(err => {
                    console.log(err)
               })

     }



     render() {
          const { products } = this.state;
          return (
               <>
                    {
                         products.map(prod =>
                              <Link key={prod.id} to={{
                                   pathname:"/product",
                                   product: prod
                              }}>
                                   <div className={styles.tile + ' ' + 'col-8'}>
                                        <img src={prod.imageUrl} alt={prod.productName}/> 
                                        <span>{prod.productName} {prod.price}</span> 
                                   </div>
                              </Link>
                         )
                    }

               </>
          );
     }
}