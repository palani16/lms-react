import React, { Component } from 'react';
import UserRoutes from '../../UserRoutes'
class Logout extends Component {

    constructor(props) {
        super(props);
        localStorage.removeItem('jwt')
        this.props.history.push('/')
        alert("Log out successful")
    }
    

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Logout;