import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
 class AdminNav extends Component {
   constructor(props) {
     super(props)
     this.toggleNavbar = this.toggleNavbar.bind(this);
     this.state = {
      collapsed: true,
     };
   }
   toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
   handleLogout=e=>{
     localStorage.clear()
   }
   handleMobileOrderButton = (e) => {
     document.getElementById("adminOrderButton").click()
    }
    render() {
      const collapsed = this.state.collapsed;
      const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
      const classTwo = collapsed ? 'navbar-toggler collapsed': 'navbar-toggler';
        return (
            <>
            <nav className="navbar navbar-expand-md  navbar-dark bg-primary" data-testid="adminNavbar" id="adminNavbar">
              <div className="container">
   <div className="navbar-brand font-weight-bold pb-2">Mob Store</div> 
  <button className={`${classTwo}`}  data-toggle="collapse" data-target="#navbarSupportedContent" onClick={this.toggleNavbar}>
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className={`${classOne}`} id="navbarSupportedContent">
    <ul className="navbar-nav ">
      <li className="nav-item active row">
          <div className="col-xl-2 pt-1"><ShoppingCartIcon/></div>
        <Link to="/admin/cart" className="nav-link col-xl-2" data-testid="mobileAdminCartButton" id="mobileAdminCartButton">Carts </Link>
      </li>
      <li className="nav-item active row">
          <div className="col-xl-2 pt-1"><ShoppingCartIcon/></div>
        <Link to="/admin" className="nav-link col-xl-2" data-testid="adminproductButton" id="adminproductButton">Products </Link>
      </li>
      <li className="nav-item active row" >
        <div className="col-xl-2 pt-1 mr-1"><LocalShippingIcon/></div>
          <button data-testid="mobileAdminOrderButton" id="mobileAdminOrderButton" style={{display: "block", border: "none", outline:"none", background:"#007bff"}} onClick={this.handleMobileOrderButton}></button>
        <Link to="/admin/orders" className="nav-link col-xl-2" data-testid="adminOrderButton"  id="adminOrderButton">Orders</Link>
      </li>
      
    </ul>
    <ul className="nav justify-content-end navbar-nav ml-auto">
  <li className="nav-item active row">
    <Link to="/login" className="nav-link col-xl-2" data-testid="logoutButton"  id="logoutButton" onClick={this.handleLogout}><div className="col-xl-2 pt-2 "><ExitToAppIcon/></div>Logout</Link>
  </li>
</ul>
  </div>
  </div>
</nav>
        </>
        )
    }
}

export default AdminNav
