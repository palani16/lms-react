import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Router } from 'react-router';
import './signup.css'
class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullName: '',
            phoneNumber: '',
            emailId: '',
            age: '',
            password: '',
            confirmPassword: ''
        }
       
        
    }

    nameChangeHandler = event => {
        this.setState({
            username: event.target.value,
            fullName: event.target.value
        })
    }

    phNumberChangeHandler = event => {
        this.setState({
            phoneNumber: event.target.value
        })
    }
    fullNameChangeHandler = event => {
        this.setState({
            fullName: event.target.value
        })
    }
    emailIdChangeHandler = event => {
        this.setState({
            emailId: event.target.value
        })
    }
    ageChangeHandler = event => {
        this.setState({
            age: event.target.value
        })
    }
    passwordChangeHandler = event => {
        this.setState({
            password: event.target.value
        })
    }
    confirmPasswordChangeHandler = event => {
        this.setState({
            confirmPassword: event.target.value
        })
    }
    onSubmitEventHandler = event => {
        console.log(this.state)
        console.log(this)
        event.preventDefault()
        axios.post("http://localhost:8091/api/auth/signup", this.state).then(response => {
            console.log(response.data.body)
            this.props.history.push('/')
            alert("Successfully registered")
          
        }).catch(error => {

            console.log(error)
        })
    }
    render() {
       
        return (
            <div className="signup2">
                <div className="col-sm-3 lg2">
                  <h1 className="w3-myfont"><b> Signup </b></h1><br></br><br></br>
                    

                    <form className="frm2" onSubmit={this.onSubmitEventHandler}>
                            <label></label>
                            
                            <input className="form-control" placeholder="Username" type="text" value={this.state.username} onChange={this.nameChangeHandler}></input><br></br>

                        <input className="form-control" placeholder="Phone Number" type="number" value={this.state.phoneNumber} onChange={this.phNumberChangeHandler}></input><br></br>

                        
                        <input className="form-control" placeholder="Email Id" type="email" value={this.state.emailId} onChange={this.emailIdChangeHandler}></input><br></br>

                        <input className="form-control" placeholder="Age" type="number" value={this.state.age} onChange={this.ageChangeHandler}></input><br></br>

                        <input className="form-control" placeholder="Password" type="password" value={this.state.password} onChange={this.passwordChangeHandler}></input><br></br>


                        <input className="form-control " placeholder="Confirm Password" type="password" value={this.state.confirmPassword} onChange={this.confirmPasswordChangeHandler}></input><br></br>

                            <button className="form-control col-sm-3 btn btn-primary " type="submit">submit</button><br></br>
                            Do you have an account ? -   <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
                            
                        </form>
                    
                </div>
                
                <img className="col-sm-9" src="https://images.unsplash.com/photo-1503543791519-1694c6b20779?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" style={{width:'110%'}}></img>
                
            </div>
        );
    }
}

export default signup;