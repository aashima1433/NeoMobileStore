import {Link} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { Component } from 'react'

 class NavBar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  handleLogout=e=>{
    localStorage.clear()
  }
  
  
  render() {
    return (
      <>
            <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-primary" data-test-id="userNavbar" id="userNavbar">
            <div className="navbar-brand font-weight-bold pb-2">Mob Store</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/home" data-test-id="mobileHomeButton" id="mobileHomeButton" className="nav-link">Home </Link>
      </li>
      <li className="nav-item active">
        <Link to="/cart" className="nav-link" data-test-id="mobileCartButton" id="mobileCartButton">Cart </Link>
      </li>
      <li className="nav-item active" data-test-id="mobileOrderButton" id="mobileOrderButton">
        <Link to="/orders" className="nav-link">My Order</Link>
      </li>
      
    </ul>
    <ul className="nav justify-content-end navbar-nav ml-auto">
  <li className="nav-item active row">
  <div className="col-xl-2 pt-2 "><ExitToAppIcon/></div>
   <Link to="/login" className="nav-link "  data-test-id="logoutButton" id="logoutButton" onClick={this.handleLogout}>Logout
   </Link>
  </li>
</ul>
  </div>
</nav>
        </>
    )
  }
}

export default NavBar


