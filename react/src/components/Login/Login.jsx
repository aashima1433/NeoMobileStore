import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import validator from 'validator'
import LoginPic from "./Login.jpg"
import axios from 'axios'
import '../Server/Server.jsx'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // console.log(window.location.hostname.split('-')[1]);
    // console.log(window.location.hostname.substr(5))
    // console.log(window.location)
    this.state = {
      email: '',
      server: window.location.protocol + ((window.location.hostname.indexOf("8081-") !== -1)?"//8080-" + window.location.hostname.substr(5): "//" + window.location.hostname + ":8080"),
      password: '',
      userrole: false,
      adminloggedIn: false,
      loggedIn: false
    };

    if(localStorage.getItem("server") === null){
      localStorage.setItem("server", window.location.protocol + ((window.location.hostname.indexOf("8081-") !== -1)?"//8080-" + window.location.hostname.substr(5): "//" + window.location.hostname + ":8080") )
    }

    // console.log(localStorage.getItem("server"))

    // this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let { email, password } = this.state

    if (!(validator.isEmail(email) || email === "admin")) { 
      console.log("Error! Invalid Email Id");
      return;
    }
    if ((email === "admin@gmail.com" || email === "admin") && password === "admin") {
      email = "admin"
    }
    const server_req_obj = {"email":email, "password":password}
    axios
      .post(`${localStorage.getItem("server")}/login`, server_req_obj)
      .then(response => {
        // console.log(response)
        if (response.data) {
          localStorage.setItem("isLoggedIn", true)
          localStorage.setItem("loggedUser", email)

          axios.get(`${localStorage.getItem("server")}/userrole/${email}`)
              .then(res => {
                // console.log(res)
                let userrole = false
                if(res.data === true){
                  userrole = true 
                }
                if(email === "admin" || email === "admin@gmail.com" || userrole === true){
                  localStorage.setItem("isAdmin", 'true')
                  this.props.history.push('/admin')  
                }else{
                  this.props.history.push('/home')
                }
              })
              .catch(err => {
                console.log(err)
              })

        }else{
          console.log("Error! Invalid Login Details")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    // if (this.state.adminloggedIn)
    //   return <Redirect to="/admin" />
    // else 
    // if (this.state.loggedIn || localStorage.getItem("isLoggedIn")) 
   //   return <Redirect to="/home" />
    const { email, password } = this.state
    return (
      <>
        <div className="container ml-5 mt-5 pt-5 row  ">
          <div className="container mt-5 pt-5 col-lg-6  order-1 order-lg-2 " data-testid="loginBox" id="loginBox">
            <div className="login-content">
              <div className="login-form">
                <h2>LOGIN</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">
                    </label>
                    <input className="input-lg" name="email" value={email} type="text" data-testid="email"
                      id="email" autoComplete="off" placeholder="Email" onChange={this.handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                    </label>
                    <input type="password" name="password" value={password} data-testid="password" id="password"
                      autoComplete="off"
                      placeholder="Password" onChange={this.handleChange} required />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" data-testid="submitButton" id="submitButton">LOGIN</button>
                  </div>
                  <div className="form-group">
                    New user? <Link to="/signup" data-testid="signupLink" id="signupLink"> Click here </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=" col-lg-6  order-1 order-lg-2 mt-4  header-img">
            <img src={LoginPic} className="img-fluid animated" alt="Login Pic"
            />
          </div>
        </div>
      </>
    )
  }
}
export default LoginPage
