import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory, IndexRoute } from 'react-router-dom';
import axios from 'axios';
import './getbook.css';
import ViewAllTokens from './ViewAllTokens';
class GetIssueRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.match.params.issueId,
            tokenId: '',
            issueDate: '',
            returnDate: '',
            tokenStatus: '',
            selectedStatus:'',
            approvedBy: '',
            books: [],
            bookNames: [],
            publisher: "",
            authors: "",
            genre: "",
            genreName: "",
            bookList: "",
            bookName: ''
        }
    }
    status(s) {
        if (s == 'AVAILABLE')
            return 'btn-success'
        else
            return 'btn-danger'
    }
    componentDidMount() {
        const header={
            'Authorization': localStorage.getItem('jwt')
        }
        axios.post('http://localhost:8091/api/transaction/issuerecorddetails/' + this.state.issueId,'', { headers: header })
            .then(response => {

                //  console.log(JSON.parse(response.data.body))
                this.setState({
                    books: response.data.body.books,
                    tokenId: response.data.body.issueId,
                    issueDate: response.data.body.issueDate,
                    returnDate: response.data.body.returnDate,
                    approvedBy: response.data.body.approvedBy,
                    tokenStatus: response.data.body.tokenStatus
                })
                console.log(this.state.books);
                // axios.get('http://localhost:8091/api/book/' + this.state.book.bookId, { headers: { Authorization: localStorage.getItem('jwt') } })
                //     .then(response1 => {

                //         //  console.log(JSON.parse(response.data.body))
                //         this.setState({
                //             bookList: response1.data.body
                //         })
                //         console.log(this.state.bookList)
                //     }).catch(error1 => {
                //         if(error1.response1.data.status==401)
                // {
                //     alert("UnAuthorized")
                //     this.props.history.push('/')
                // }
                //         this.setState({ errorMessage: 'error while calling get method' })
                //         console.log(error1)
                //     })

            }).catch(er => {
                // if(er.response.status==401)
                // {
                //     alert("UnAuthorized")
                //     this.props.history.push('/')
                // }
                this.setState({ errorMessage: 'error while calling get method' })
                console.log(er)
            })
        let x = 0; let booksl = [];
        this.state.books.forEach(i => { booksl[x] = i.bookTitle; x++; })
        this.setState({
            bookNames: booksl
        })
        console.log(booksl);
    }
    addToCartHandler = event => {
        console.log(localStorage)

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
    cardClicked(bookId) {
        // console.log('update ' + id)
        this.props.history.push(`/get/${bookId}`)
    }
    statusChanged = event =>{
        console.log(this.state.selectedStatus)
        this.setState({
            selectedStatus: event.target.value
        })
        console.log(this.state.selectedStatus)
    }
    statusChange(){
        let status='<div>'+'<select value='+this.state.selectedStatus+' onChange='+this.statusChanged+'>'+'<option value="CLOSE">Close</option>'+
        '<option value="CONFIRM">Confirm</option>'+'</select>'+'</div>'
        // document.getElementById('status').appendChild(<div><select>
        //     <option value="CLOSE">Close</option>
        //     <option value="CONFIRM">Confirm</option>
        //     </select></div>)
        document.getElementById('status').innerHTML=status;
        document.getElementById('statusButton').innerHTML='';
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
                    genreName: response.data.body.genre.genreName
                })
                console.log(this.state.book)
                axios.get('http://localhost:8091/api/book/genre/' + this.state.genreName, { headers: { Authorization: localStorage.getItem('jwt') } })
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
        const { books, errorMessage, tokenId, issueDate, returnDate, tokenStatus } = this.state

        return (
            <>
                {
                    //    JSON.stringify(book)

                    // book.length?book.map(post=><h5>{post.superHeroName}</h5>):''
                }
                {
                    errorMessage ? <div>{errorMessage}</div> : ''
                }
                <h3>Token Details</h3>
                <div className="tokenGrid">

                    <div className="tokenDetails col-sm-5">
                        <div className="row"><h6>Token Id :- </h6><span>{tokenId}</span></div><br></br>
                        <div className="row"><h6>Issue Date :- </h6><span>{issueDate}</span></div><br></br>
                        <div className="row"> <h6>Return Date :- </h6><span>{returnDate}</span></div><br></br>
                        <div className="row"><h6>Token Status :- </h6><span>{tokenStatus}</span>&nbsp;<div  id="statusButton"><button onClick={()=>this.statusChange()}>change</button></div><div id="status"></div></div><br></br>
                        
                        <div className="row"><h6>No. Of Books :- </h6><span>{books.length}</span></div><br></br>
                    </div>
                    <div className="books col-sm-6">
                        {books.map(j => <><div onClick={() => this.cardClicked(j.bookId)} className="card1">
                            <div className="container1">
                                <h6><b>Book Name :- {j.bookTitle}</b></h6>
                                <p>By</p>
                                <p>{j.authors.map(i => <>{i.authorName} </>)}</p>

                            </div>
                        </div></>)}
                        <Route path="/alltokens" exact strict component={ViewAllTokens} />
                    </div>
                </div>
                {/* <div className="pg">

                    <div className="flx2 col-sm-4">
                        <div className="card-header">
                            <input type="text" placeholder="Search.."></input>
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
                            <p><span><b>Author Name:-  </b></span>{authors.map(i => <>{i.authorName} </>)}</p>
                            <button className="btn btn-primary" onClick={this.addToCartHandler} style={{float:'left'}}>Add to Cart</button>
                        </div>

                    </div>
                </div> */}

            </>);
    }
}

export default GetIssueRecord;