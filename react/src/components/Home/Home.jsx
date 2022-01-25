import React, { Component } from 'react';
import styles from './Home.module.css';
import NavBar from '../UserNav/UserNav';
import ProductList from '../ProductList/ProductList';
import { Redirect } from 'react-router-dom';
class Home extends Component {
     // constructor(props) {
     //      super(props)

          // const token1 = localStorage.getItem("token1")
          // let loggedIn = true
          // if (token1 == null) {
          //      loggedIn = false
          // }
          // this.state = {
          //      loggedIn
          // }
     //}

     render() {
          // if (localStorage.getItem("isLoggedIn") === null)
          //      return <Redirect to="/login" />
          return (
               
                <>   <NavBar />
                    <div id="home" className={styles.jumbotron + ' ' + "jumbotron"}>
                         <h1><span>WELCOME HOME</span></h1>
                    </div>
                    <div data-testid="mobileHomeBody" id="mobileHomeBody" className="container-fluid">
                         <ProductList />
                    </div>
               </>
          );
     }
}

export default Home