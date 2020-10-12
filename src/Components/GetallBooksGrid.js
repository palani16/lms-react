import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
import getbook from './getbook'


class GetAllBooksGrid extends Component {
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
    cardClicked(bookId) {
        // console.log('update ' + id)
        this.props.history.push(`/get/${bookId}`)
    }
     status(s){
        if(s=='AVAILABLE')
        return 'btn-success'
        else
        return 'btn-danger'
    }
    componentDidMount() {
        axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    posts: response.data.body
                })
            }).catch(error => {
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
        
        return (
            <div>
                {
                    // JSON.stringify(posts)
                }
                {
                    errorMessage ? <div>{errorMessage}</div> : ''
                }
                <div className="gridpage">
                    <label></label>
                    <div className="bookgrid">
                        {posts.map(j => <><div onClick={()=>this.cardClicked(j.bookId)} class="card1">
                            <div class="event.target.value">
                            <div className={`btn ${this.status(j.bookStatus)} sts`}> {j.bookStatus}</div>
                            <label></label>
                                <h6><b>{j.bookTitle}</b></h6>
                                <p>By</p>
                                <p>{j.authors.map(i => <>{i.authorName} </>)}</p>
                            </div>
                        </div></>)}

                    </div>
                </div>
            </div>
        );
    }
}

export default GetAllBooksGrid;