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
//import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen';

import React, { Component } from 'react';

class UserRoutes extends Component {
  logoutClickHandler= event =>{
    this.props.history.push('/logout')
  }
  render() {
   
  
    return (
      <>
        <div >
          <Router>
  
            <div className="header sticky">
              <div>
                <div className="navbar11">
                  <Link className="cart" to="/cart" >{icons.shoppingTrolley} Cart</Link>
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
  
            <Route path="/" exact strict component={App} />
            <Route path="/cart" exact strict component={Cart} />
            <Route path="/home" exact strict component={Home} />
           
            <Route path="/getallbooks" exact strict component={GetAllBooks} />
            <Route path="/getallbooksgrid" exact strict component={GetAllBooksGrid} />
            <Route path="/get/:bookId" exact strict component={getbook} />
            <Route path="/searchbybook" exact strict component={bookname} />
            <Route path="/searchbyauthor" exact strict component={authorname} />
            <Route path="/searchbypublisher" exact strict component={publishername} />
          </Router>
        </div>
      </>
    );
  }
}

export default UserRoutes;