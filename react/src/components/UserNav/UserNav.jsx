import {Link} from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { Component } from 'react'

 class UserNav extends Component {
  constructor(props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
       collapsed: true,
    };
  }
  toggleNavbar(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleLogout=e=>{
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("isLoggedIn")
  }
  
  
  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed': 'navbar-toggler';
    return (
      <>
            <nav className="navbar navbar-expand-lg  navbar navbar-dark bg-primary" data-testid="userNavbar" id="userNavbar">
              <div className = "container">
            <div className="navbar-brand font-weight-bold pb-2">Mob Store</div>
  <button className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNavbar}>
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className={`${classOne}`} id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/home" data-testid="mobileHomeButton" id="mobileHomeButton" className="nav-link">Home </Link>
      </li>
      <li className="nav-item active">
        <Link to="/cart" className="nav-link" data-testid="mobileCartButton" id="mobileCartButton">Cart </Link>
      </li>
      <li className="nav-item active" data-testid="mobileOrderButton" id="mobileOrderButton">
        <Link to="/orders" className="nav-link">My Order</Link>
      </li>
      
    </ul>
    <ul className="nav justify-content-end navbar-nav ml-auto">
  <li className="nav-item active row">
   <Link to="/login" className="nav-link "  data-testid="logoutButton" id="logoutButton" onClick={this.handleLogout}><span className="col-xl-2 pt-2 "><ExitToAppIcon/>Logout</span>
   </Link>
  </li>
</ul>
  </div>
  </div>
</nav>
        </>
    )
  }
}

export default UserNav


