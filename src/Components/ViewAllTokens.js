import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import getbook from './getbook'
import './GetallBooksGrid.css'
import AdminRoutes from '../AdminRoutes';

class ViewAllTokens extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            tokenStatus: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8091/api/transaction/issuerecords', { headers: { Authorization: localStorage.getItem('jwt') } })
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    tokens: response.data.body
                })
            }).catch(error => {
                console.log(error.response.status)
                if (error.response.status == 401) {
                    alert("UnAuthorized")
                    this.props.history.push('/')
                }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(error)
            })
    }
    tokenClickHandler(issueId){
        this.props.history.push(`/issuerecord/${issueId}`)
    }
    render() {
        const { tokens, errorMessage } = this.state
        console.log(tokens.length)
        return (
            <div>
                {
                    // JSON.stringify(posts)
                }
                {
                    errorMessage ? <div>{errorMessage}</div> : ''
                }
                <div className="getallbookstable">




                    <table class="table table-striped table-hover" align="center">
                        <thead>
                            <tr>
                                <th>Token Id</th>
                                <th>Issue Date</th>
                                <th>Token Status</th>
                                <th>Books</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokens.map(i => <><tr id="eachtoken" onClick={()=>this.tokenClickHandler(i.issueId)}><td>{i.issueId}</td><td>{i.issueDate}</td>
                                <td>{i.tokenStatus}</td><td>{i.books.map(j => <>{j.bookTitle} ,</>)}</td></tr></>)}
                        </tbody>
                    </table>

                    <Route path="/adminlogged" exact strict component={AdminRoutes} />

                </div>
            </div>
        );
    }
}

export default ViewAllTokens;