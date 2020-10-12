import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GetAllBooks from './Components/GetAllBooks';
import getbook from './Components/getbook'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory, IndexRoute } from 'react-router-dom';
import Header from './Components/Header';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import GetAllBooksGrid from './Components/GetallBooksGrid';
import bookname from './Components/searchcomponent/bookname';
import authorname from './Components/searchcomponent/authorname';
import publishername from './Components/searchcomponent/publishername';
import './header.css'
import Login from './Components/Login';
import Logout from './Components/minicomponent/Logout';
import App from './App';
import './App.css'
import icons from 'glyphicons'
import Cart from './Components/Cart';
import ViewAllTokens from './Components/ViewAllTokens';
import GetIssueRecord from './Components/GetIssueRecord';

class AdminRoutes extends Component {

  logoutClickHandler=()=>{
    this.props.history.push('/logout')
  }
  render(){
  return (
    <>
      <div >
        <Router>
          <div className="header sticky">
            <div>
              <div className="navbar11">
                <Link className="cart" to="/cart" >{icons.shoppingTrolley} Cart</Link>
                <Link to="/alltokens">View All Tokens</Link>
                <Link onClick={this.logoutClickHandler} className="logout" to="/logout" >Logout</Link>
                <div className="dropdown11">
                  <button className="dropbtn11">View All Books
                  </button>
                  <div className="dropdown-content11">
                    <Link to="/getallbooks">Table View</Link>
                    <Link to="/getallbooksgrid">Grid View</Link>
                  </div>
                </div>
                <div className="dropdown11">
                  <button className="dropbtn11">Search Books
                  </button>
                  <div className="dropdown-content11">
                    <Link to="/searchbybook">By Book Name</Link>
                    <Link to="/searchbyauthor">By Author Name</Link>
                    <Link to="/searchbypublisher">By Publisher Name</Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div className="head"></div>

          <Route path="/" exact  component={App} />
          <Route path="/cart" exact  component={Cart} />
          <Route path="/home" exact  component={Home} />          
          <Route path="/alltokens" exact  component={ViewAllTokens} />
          <Route path="/issuerecord/:issueId" exact  component={GetIssueRecord}/>
          <Route path="/getallbooks" exact  component={GetAllBooks} />
          <Route path="/getallbooksgrid" exact  component={GetAllBooksGrid} />
          <Route path="/get/:bookId" exact  component={getbook} />
          <Route path="/searchbybook" exact  component={bookname} />
          <Route path="/searchbyauthor" exact  component={authorname} />
          <Route path="/searchbypublisher" exact  component={publishername} />
        </Router>
      </div>
    </>
  );}
}

export default AdminRoutes;