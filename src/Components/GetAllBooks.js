import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import getbook from './getbook'
import './GetallBooksGrid.css'

class GetAllBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errorMessage: ''
        }
    }
    updateClicked(bookId) {
        // console.log('update ' + id)
        this.props.history.push(`/get/${bookId}`)
    }
    componentDidMount() {
        axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    posts: response.data.body
                })
            }).catch(error => {
                console.log(error.response.status)
                if(error.response.status==401)
                {
                    alert("UnAuthorized")
                    this.props.history.push('/')
                }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(error)
            })
    }
    render() {
        const { posts, errorMessage } = this.state
        console.log(posts.length)
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
                                    <th>Book Id</th>
                                    <th>Book Name</th>
                                    <th>Book Status</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(i => <><tr id="eachtoken" onClick={()=>this.updateClicked(i.bookId)}><td>{i.bookId}</td><td>{i.bookTitle}</td>
                                    <td>{i.bookStatus}</td><td>
                                        <button className="btn btn-info" onClick={() => this.updateClicked(i.bookId)}>click to get full details</button></td></tr></>)}
                            </tbody>
                        </table>

                    

                </div>
            </div>
        );
    }
}

export default GetAllBooks;