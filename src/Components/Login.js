import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Router } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            authorities: []
        }


    }

    componentDidMount() {
        localStorage.clear();
        

    }

    
    nameChangeHandler = event => {
        this.setState({
            username: event.target.value
        })
    }
    passwordChangeHandler = event => {
        this.setState({
            password: event.target.value
        })
    }
    onSubmitEventHandler = event => {
        console.log(this.state)
        console.log(this)
        event.preventDefault()
        axios.post("http://localhost:8091/api/auth/login", this.state).then(response => {
            console.log(response.data.body)
            console.log(response.data.body.authorities)
            this.setState({
                authorities: response.data.body.authorities
            })
            localStorage.setItem('jwt', response.data.body.token)
            localStorage.setItem('userId', response.data.body.userId)
            // alert("Login successful")
            // response.data.body.authorities.
            // if()
            let count = 0;
            console.log(this.state.authorities)
            this.state.authorities.map(i => {
                if (i.authority == "ROLE_ADMIN")
                    count = 1
            }
            )
            if(count==1){
            this.props.history.push('/adminlogged')}
            else
            {this.props.history.push('/userlogged')}
            // localStorage.setItem
        }).catch(error => {

            console.log(error)
        })
    }
    render() {

        return (
            <div className="login">
                <div className="col-sm-3 lg">
                    <img className="lmsimg" src="https://www.mortgageintroducer.com/wp-content/uploads/2017/05/120912-LMS-Logo.jpg" style={{ width: '100%' }}></img>
                    <h1 className="w3-myfont"><b> Login </b></h1><br></br><br></br>
                    <div className="frm1 ">

                        <form className=" frm1" onSubmit={this.onSubmitEventHandler}>
                            <label></label>

                            <input className="form-control" value={this.state.username} onChange={this.nameChangeHandler} placeholder="Username" type="text"></input><br></br>

                            <input className="form-control" value={this.state.password} onChange={this.passwordChangeHandler} placeholder="Password" type="password" ></input><br></br>

                            <button className="form-control col-sm-3 btn btn-primary sb" type="submit">submit</button><br></br>
                            Don't have an account -   <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>

                        </form>
                    </div>
                </div>

                <img className="col-sm-9" src="https://images.unsplash.com/photo-1503543791519-1694c6b20779?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" style={{ height: '610px' }}></img>

            </div>
        );
    }
}

export default Login;