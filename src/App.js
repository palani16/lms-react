import React from 'react';
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
import UserRoutes from './UserRoutes';
import signup from './Components/signup1';
import AdminRoutes from './AdminRoutes';


function App() {
  return (
    <div className="App" >

      <div  >
        <Router >
          <Route path="/" exact strict component={Login} />
          <Route path="/userlogged" exact strict component={UserRoutes} />
          <Route path="/adminlogged" exact strict component={AdminRoutes} />
          <Route path="/signup" exact strict component={signup} />
          <Route path="/logout" exact strict component={Logout} />

          <Route path="/getallbooks" exact strict component={UserRoutes} />
          <Route path="/getallbooksgrid" exact strict component={UserRoutes} />
          <Route path="/get/:bookId" exact strict component={UserRoutes} />
          <Route path="/cart" exact strict component={UserRoutes} />
          <Route path="/searchbybook" exact strict component={UserRoutes} />
          <Route path="/searchbyauthor" exact strict component={UserRoutes} />
          <Route path="/searchbypublisher" exact strict component={UserRoutes} />
        </Router>
      </div>
    </div>
  );
}

export default App;
