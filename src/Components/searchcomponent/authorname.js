import React, { Component } from 'react';
import axios from 'axios';
import icons from 'glyphicons'
import './authorname.css'
class authorname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorsList: [],
            authorName: '',
            errorMessage: '',
            book: [],
            publisher: {},
            authors: [],
            length: 0,
        }

        console.log(icons.arrowRefresh)
        axios.get('http://localhost:8091/api/author/authors',{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                this.setState({
                    authorsList: response.data.body
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


    authorNameClickHandler = event => {
        axios.get('http://localhost:8091/api/book/author/' + this.state.authorName,{headers:{ Authorization: localStorage.getItem('jwt') }})
            .then(response => {
                console.log(response.data.body)
                //  console.log(JSON.parse(response.data.body))
                this.setState({
                    book: response.data.body,
                    length: response.data.body.length
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
    cardClicked(bookId) {
        // console.log('update ' + id)
        this.props.history.push(`/get/${bookId}`)
    }

    authorNameHandler = event => {
        this.setState({
            authorName: event.target.value
        })
    }



    render() {

        function statuscss() {

           // if (this.length == 1)
            //    return <div className={`btn ${this.status(b.bookStatus)} sts`}> {b.bookStatus}</div>
        }

        const { authorsList, book, authors, publisher } = this.state

        return (
            <div>
                <form>

                    <div className="searchip">

                        <label><b>Author Name</b></label>
                        <div className="ip col-sm-5">
                            <input className="iptag" list="datalist" onBlur={this.authorNameClickHandler} onChange={this.authorNameHandler} ></input>
                            <datalist id="datalist">
                                {authorsList.map(i => <option value={i.authorName}>{i.authorName}</option>)}
                            </datalist><label>  </label>
                            <div className="clck" onClick={this.authorNameClickHandler}>{icons.magnifyingGlass}</div>
                        </div>
                    </div>

                </form>
                <div className="singlebookcard bookgrid">
                    {
                        this.state.book.map(b => <><div onClick={()=>this.cardClicked(b.bookId)} className="authorcard ">
                            <div className={`btn ${this.status(b.bookStatus)} sts`}> {b.bookStatus}</div>
                            
                            <div className="container">
                                <h2><b>{b.bookTitle}</b></h2>
                                <p><span><b>Book Status:-  </b></span>{b.bookStatus}</p>
                            </div></div></>)
                    }

                </div>
            </div>
        );
    }
}

export default authorname;