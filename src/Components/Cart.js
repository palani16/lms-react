import React, { Component } from 'react';
import portal from './portal';
import ReactDOM from 'react-dom'
import axios from 'axios';
class Cart extends Component {
    constructor(props) {
        super(props);
        let keys = Object.keys(localStorage)
        let bookIds=[];
        let localBooks = new Map();
        console.log(keys)
        
        let k=0;
        for (let i = 1; i < keys.length; i++) {
            console.log(keys[i])
            if (keys[i] == "jwt" || keys[i] == "userId") { }
            else {
                localBooks.set(keys[i], localStorage.getItem(keys[i]))
                bookIds[k++]=keys[i]
            }
        }
        console.log(bookIds)
        let ids='';
        for(let x=0;x<bookIds.length;x++){
        if(x!=bookIds.length-1)
        ids+=`${bookIds[x]},`;
        else
        ids+=`${bookIds[x]}`;
        }
        console.log(localBooks)
        this.state = {
            books: localBooks,
            bookList: [],
            list: [],
            title: '',
            bookCount: bookIds,
            count: bookIds,
            keys: keys,
            ids: ids,
            requestRaised: false
        }
        
        
    }
    componentDidMount(){
        console.log(this.state.bookCount)
        axios.get('http://localhost:8091/api/book/particular', { headers: { Authorization: localStorage.getItem('jwt') },params: { bookids: this.state.ids} })
        .then(response => {
            console.log(response.data.body.bookTitle);
            this.setState({
                title: response.data.body.bookTitle,
                bookList: response.data.body
            })
            console.log(this.state.bookList)
        }).catch(error => {
            console.log(error)
        })
    }
    raiseRequest=()=>{
        const header={
            'Authorization': localStorage.getItem('jwt')
        }
        this.setState({
            requestRaised: true
        })
        axios.post('http://localhost:8091/api/transaction/raiserequest','', { headers: header,params: { 'bookids': this.state.ids}})
        .then(response => {
            console.log(response.status+'---');
            console.log(this.state.requestRaised)
            if(response.status==200){
                if(this.state.requestRaised==true){
                alert("Token successfully raised")
                this.props.history.push('/getallbooksgrid')
                }
            }
            else
            alert("Problem while raising request")
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        const { books,bookList,bookCount,count } = this.state
        let bookMap = Array.from(books)
        console.log(bookList);

        return (

            <div className="bookMap" id="x">
                <br/>
                {
                    // bookMap.map(i => this.bookRender(i))
                    bookList.map(j=><><b>{j.bookTitle}</b><br/></>)
                }<br></br>
                <button onClick={this.raiseRequest} className='btn btn-primary'>raise request</button>
            </div>
        );
    }
}

export default Cart;