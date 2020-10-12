// import React, { Component } from 'react';
// import SignUp from './SignUp';
// import { Link } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom';
// import GetAllBooks from './GetAllBooks';
// import getbook from './getbook';
// import App from '../App';
// class Header extends Component {

//     render() {
//         return (


//             <div >
//                 <Router>

//                     <div className="header">
//                         <div>
//                             <ul>
//                                 <li><Link to="/home">Home</Link></li>
//                                 <li><Link to="/signup">SignUp</Link></li>
//                                 <li><Link to='/getallbooks'>Getallbooks</Link></li>
//                             </ul>
//                         </div>
                    
//                     </div>
//                     <Route path="/home" exact strict component={SignUp} />
//                     <Route path="/signup" exact strict component={SignUp} />
//                     <Route path="/getallbooks" exact strict component={GetAllBooks} />
//                     <Route path="/get/:bookId" exact strict component={getbook} />
//                 </Router>
//             </div>

//         );
//     }
// }

// export default Header;