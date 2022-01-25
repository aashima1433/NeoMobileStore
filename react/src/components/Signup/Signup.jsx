import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios'
import validator from 'validator'
import SignUpPic from "./Signup.jpg"
 class Signup extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              email: '',
              username: '',
              mobileNumber: '',
              password: '',
              confirmpassword:'',
              signupped:false
         }
     }

handleChange = e=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}

handleSubmit = e=>{
    const {email,username,mobileNumber,password} = this.state
    e.preventDefault()
    if (!(validator.isEmail(email))){
        console.log("Invalid Email! Try Again")
        return;
    }
    if(!(validator.isMobilePhone(mobileNumber))){
        console.log("Invalid Mobile Number! Try Again")
        return;
    }
    if (this.state.password !== this.state.confirmpassword) {
        console.log("Passwords|Confirm Password not matched");
        return;
    } 
    
    const req_obj = {
        "username": username,
        "email": email,
        "password": password,
        "mobileNumber": mobileNumber
    }

    axios
    .post(`${localStorage.getItem("server")}/signup`,req_obj)
    .then(response=>{
        // console.log(response)
        if(response.data === true)
        {
            this.setState({
                signupped:true
            })
            this.props.history.push('/login');
        }
    })
    .catch(error=>{
        console.log("Error! Unable to add new user")
    })
}

    

    render() {
        if(this.state.signupped)
         return <Redirect to="/login"/>
        const {email,username,mobileNumber,password,confirmpassword} = this.state
        return (
            <>
            <div className="container ml-5 mt-3 pt-5 row  ">
            <div className="container  mt-5 pt-5 col-lg-6  order-1 order-lg-2" data-testid="signupBox" id="signupBox">
                <div className="signup-content">
                    <div className="signup-form">
                      <h2>SIGN UP</h2>
                      <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                              <label htmlFor="email">
                              </label>
                              <input  name="email" value={email} type="email" data-testid="email" id="email" 
                              autoComplete="off" placeholder="Enter Email" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="username">
                              </label>
                              <input type="text" name="username" data-testid="username" id="username" value={username} autoComplete="off"
                               placeholder="Enter Username" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="mobilenumber">
                              </label>
                              <input type="tel" name="mobileNumber" value={mobileNumber} data-testid="mobilenumber" id="mobilenumber" 
                              autoComplete="off" placeholder="Enter Mobile Number" onChange={this.handleChange} required />
                          </div>
                          <div className="form-group">
                              <label htmlFor="password">
                              </label>
                              <input type="password" name="password" value={password} data-testid="password" id="password" 
                              autoComplete="off" placeholder="Enter Password" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                              <label htmlFor="confirmpassword">
                              </label>
                              <input type="password" name="confirmpassword" value={confirmpassword}  data-testid="confirmpassword"
                              id="confirmpassword" autoComplete="off" placeholder="Confirm Password" onChange={this.handleChange} required/>
                          </div>
                          <div className="form-group">
                          <button className="btn btn-primary" data-testid="submitButton"  id="submitButton">SIGN UP</button>
                          </div>
                          <div className="form-group">
                              Already a member? <Link to="/login" data-testid="signinLink" id="signinLink"> Click here</Link>
                          </div>
                      </form>
                    </div>
                </div>
            </div>
            <div className=" col-lg-6  order-1 order-lg-2 mt-4  header-img">
        <img src={SignUpPic} className="img-fluid animated"    />
      </div>
                </div>
            </>
        )
    }
}

export default Signup
