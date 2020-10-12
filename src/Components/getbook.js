import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory, IndexRoute } from 'react-router-dom';
import axios from 'axios';
import './getbook.css'
class getbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: this.props.match.params.bookId,
            publisher: '',
            book: {},
            authors: [],
            errorMessage: '',
            genre: {},
            genreName: '',
            bookList: [],
            addCart: 'Add To Cart',
            addCartBtn: 'btn btn-primary',
            searchBookList: []
        }
    }
    status(s) {
        if (s == 'AVAILABLE')
            return 'btn-success'
        else
            return 'btn-danger'
    }
    componentDidMount() {
        axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    searchBookList: response.data.body
                })
                console.log(this.state.searchBookList)
            }).catch(error => {
                if(error.response.status==401)
                {
                    alert("UnAuthorized")
                    this.props.history.push('/')
                }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(error)
            })
        axios.get('http://localhost:8091/api/book/' + this.state.bookId, { headers: { Authorization: localStorage.getItem('jwt') } })
            .then(response => {
                console.log(response.data.body.publisher.publisherName)
                //  console.log(JSON.parse(response.data.body))
                this.setState({
                    book: response.data.body,
                    publisher: response.data.body.publisher,
                    authors: response.data.body.authors,
                    genre: response.data.body.genre,
                    genreName: response.data.body.genre.genreName,
                   
                })
                axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
                    .then(response1 => {

                        //  console.log(JSON.parse(response.data.body))
                        this.setState({
                            bookList: response1.data.body
                        })
                        console.log(this.state.bookList)
                    }).catch(error1 => {
                        if (error1.response1.status == 401) {
                            alert("UnAuthorized")
                            this.props.history.push('/')
                        }
                        this.setState({ errorMessage: 'error while calling get method' })
                        console.log(error1)
                    })

            }).catch(error => {
                if (error.response.status == 401) {
                    alert("UnAuthorized")
                    this.props.history.push('/')
                }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(error)
            })


    }
    addToCartHandler = event => {
        console.log(localStorage)

        if (this.state.addCart == 'Add To Cart') {
            this.setState({
                addCart: 'added',
                addCartBtn: 'btn def'
            })
            let value = localStorage.getItem(this.state.book.bookId);
            if (localStorage.getItem(this.state.book.bookId) > 0) {
                value++;
                console.log(localStorage.getItem(this.state.book.bookId))
                localStorage.setItem(this.state.book.bookId, value)
            }
            else {
                localStorage.setItem(this.state.book.bookId, 1)
                console.log(this.state.book.bookId)
            }
        }
    }
    cardClicked(bookId) {
        // console.log('update ' + id)
        this.props.history.push(`/get/${bookId}`)
    }
    cartButtonHandler(){
        console.log(this.state.book.bookStatus)
        if(this.state.book.bookStatus == 'AVAILABLE'){
        return <><button className={`${this.state.addCartBtn}`} onClick={this.addToCartHandler.bind(this)} style={{ float: 'left' }}>{this.state.addCart}</button></>}
        else{
        return <></>
        }
    }
    componentWillReceiveProps(nextPrpos) {
        console.log("xxxx")
        axios.get('http://localhost:8091/api/book/' + nextPrpos.match.params.bookId, { headers: { Authorization: localStorage.getItem('jwt') } })
            .then(response => {
                console.log(response.data.body)
                //  console.log(JSON.parse(response.data.body))
                this.setState({
                    book: response.data.body,
                    publisher: response.data.body.publisher,
                    authors: response.data.body.authors,
                    genre: response.data.body.genre,
                    genreName: response.data.body.genre.genreName,
                    addCart:'Add To Cart',
                    addCartBtn: 'btn btn-primary'
                })
                console.log(this.state.book)
                axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
                    .then(response1 => {

                        //  console.log(JSON.parse(response.data.body))
                        this.setState({
                            bookList: response1.data.body
                        })
                        console.log(this.state.bookList)
                    }).catch(error1 => {
                        if (error1.response1.status == 401) {
                            alert("UnAuthorized")
                            this.props.history.push('/')
                        }
                        this.setState({ errorMessage: 'error while calling get method' })
                        console.log(error1)
                    })

            }).catch(error => {
                if (error.response.status == 401) {
                    alert("UnAuthorized")
                    this.props.history.push('/')
                }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(error)
            })
    }
    render() {
        const { book, errorMessage, publisher, authors, bookList,searchBookList } = this.state

        return (
            <div>
                {
                    //    JSON.stringify(book)

                    // book.length?book.map(post=><h5>{post.superHeroName}</h5>):''
                }
                {
                    errorMessage ? <div>{errorMessage}</div> : ''
                }
                <div className="pg">
                        
                       
                    <div className="flx2 col-sm-4">
                        <div className="card-header">
                            <input type="text" list="datalist" placeholder="Search.."></input>
                            <datalist id="datalist">
                                {searchBookList.map(i => <option value={i.bookTitle}>{i.bookTitle}</option>)}
                            </datalist>
                            
                            <div className="btn btn-info srch">Search</div>
                        </div>
                        <div className="card-body suggestion">

                            {bookList.map(j => <><div onClick={() => this.cardClicked(j.bookId)} className="card2">
                                <div class="container">
                                    <div className={`btn ${this.status(j.bookStatus)} sts`}> {j.bookStatus}</div>
                                    <label></label>
                                    <h6><b>{j.bookTitle}</b></h6>
                                    <p>By</p>
                                    <p>{j.authors.map(i => <>{i.authorName} </>)}</p>
                                </div>
                            </div><br></br><br></br></>)}
                        </div>

                    </div><div className="col-sm-1"></div>
                    <div className="card bk flx1 col-sm-7">
                        <div className={`btn ${this.status(book.bookStatus)} example`}> {book.bookStatus}</div>
                        <img src="https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612" style={{ width: '50%' }}></img>

                        <div className="container">
                            <h2><b>{book.bookTitle}</b></h2>
                            <p><span><b>Book Status:-  </b></span>{book.bookStatus}</p>
                            <p><span><b>Publisher Name:-  </b></span>{publisher.publisherName}</p>
                            <p><span><b>Authorsss Name:-  </b></span>{authors.map(i => <>{i.authorName} </>)}</p>
                            {this.cartButtonHandler()}
                        </div>

                    </div>
                </div>

            </div>);
    }
}

export default getbook;