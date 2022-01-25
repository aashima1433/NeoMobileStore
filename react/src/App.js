import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import LoginPage from './components/Login/Login';
import SignupPage from './components/Signup/Signup';
import HomePage from './components/Home/Home';
import AddProduct from './components/admin/AddProduct/AddProduct';
import Dashboard from './components/admin/Dashboard/Dashboard'
import UserOrder from './components/UserOrder/UserOrder';
import OrderList from './components/admin/Orderlist/Orderlist';
import Cart from './components/Cart/Cart';
import Product from "./components/Product/Product"
import AdminCart from './components/admin/AdminCart/AdminCart';

function App() {
  if(localStorage.getItem("server") === null){
    localStorage.setItem("server", window.location.protocol + ((window.location.hostname.indexOf("8081-") !== -1)?"//8080-" + window.location.hostname.substr(5): "//" + window.location.hostname + ":8080") )
  }
  
  return (
    <Router>
      <div className="App">
        <Switch>
        {["/login", "/"].map((pathname, index) =>  (<Route key={index} exact path={pathname} component={LoginPage} />) )}
        {["/orderlist", "/admin/orders"].map((pathname,index) =>  (<Route key={index} exact path={pathname} component={OrderList} />) )}
         <Route path="/signup" component={SignupPage}/> 
        <Route path="/home" component={HomePage}/> 
        <Route exact path="/admin" component={Dashboard}/> 
        <Route path="/cart" component={Cart}/> 
        <Route path="/orders" component={UserOrder}/>
        <Route path="/addProduct" component={AddProduct}/> 
        <Route path="/orderlist" component={OrderList}/>
        <Route path="/product" component={Product}/>
        <Route exact path="/admin/cart" component={AdminCart}/>
       </Switch>  
    </div>
    </Router>
      )
}

export default App;
