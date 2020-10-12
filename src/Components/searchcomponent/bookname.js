import React, { Component } from 'react';
import axios from 'axios';
import icons from 'glyphicons'

class bookname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookTitle: '',
            errorMessage: '',
            book: [],
            publisher: {},
            authors: [],
            count: false
        }
    
        console.log(icons.arrowRefresh)
        axios.get('http://localhost:8091/api/book/books',{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    books: response.data.body
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
    status(s) {
        if (s == 'AVAILABLE')
            return 'btn-success'
        else
            return 'btn-danger'
    }
   

    bookNameClickHandler = event =>{
        console.log(this.state.bookTitle)
        axios.get('http://localhost:8091/api/book/match/any/' + this.state.bookTitle,{headers:{ Authorization: localStorage.getItem('jwt') }})
        .then(response => {
            console.log(response.data.body)
            //  console.log(JSON.parse(response.data.body))
            this.setState({
                book: response.data.body,
                
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
        console.log(this.state.book)
    
        
    }
    
    bookNameHandler = event =>{
        this.setState({
            bookTitle: event.target.value
        })
    }

     

    render() {
        

        const { books, book, authors, publisher } = this.state
       
        return (
            <div>
                <form>

                    <div className="searchip">
                        
                        <label><b>Book Name</b></label>
                        <div className="ip col-sm-5">
                        <input className="iptag" list="datalist" onChange={this.bookNameHandler} ></input>
                        <datalist id="datalist">
                            {books.map(i => <option value={i.bookTitle}>{i.bookTitle}</option>)}
                        </datalist><label>  </label>
                        <div className="clck" onClick={this.bookNameClickHandler}>{icons.magnifyingGlass}</div>
                        </div>
                        
                       
                    </div>
                    
                </form>
                <div className="singlebookcard">

<div className="card col-sm-7">

{

    this.state.book.map(b=><div>
    
        <div className={`btn ${this.status(b.bookStatus)} example`}> {b.bookStatus}</div>
        <img src="https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612" style={{ width: '50%' }}></img>

        <div className="container">
            <h2><b>{b.bookTitle}</b></h2>
            <p><span><b>Book Status:-  </b></span>{b.bookStatus}</p>

        </div>
    
    
    </div>)

    
 }
</div>
                </div>
            </div>
        );
    }
}

export default bookname;