import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
    this.state={
        username:'',
        password:''
    }       
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
        event.preventDefault()
        axios.post("http://localhost:8091/api/auth/login", this.state).then(response => {
            console.log(response.data.body.token)
            localStorage.setItem('jwt',response.data.body.token)
            alert("Login successful")
            this.props.history.push('/signup')
           // localStorage.setItem
        }).catch(error => {

            console.log(error)
        })
    }
    render() {
        return (
            <>
            <h1 className="w3-myfont"><b> Login </b></h1><br></br><br></br>
            <div className="frm1">
                
                <form className="col-sm-4 frm1" onSubmit={this.onSubmitEventHandler}>
                        <label></label>
                        <input className="form-control" value={this.state.username} onChange={this.nameChangeHandler} placeholder="Username" type="text"></input><br></br>

                        <input className="form-control" value={this.state.password} onChange={this.passwordChangeHandler} placeholder="Password" type="password" ></input><br></br>
                        <button className="form-control col-sm-3 btn btn-primary" type="submit">submit</button>
                    </form>
            </div></>
        );
    }
}

export default Home;