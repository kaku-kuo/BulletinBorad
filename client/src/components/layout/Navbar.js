import React,{ useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navbar = () => {
const authContext = useContext(AuthContext);
const alertContext = useContext(AlertContext);
const{ logout, isAuthenticated, loadUser } = authContext;
const{ setAlert } = alertContext;

useEffect(() => {
  loadUser();  
  //eslint-disable-next-line 
},[]);

const onclick = () => {
    logout();
    setAlert("Logout Successfully! Bye!","success");
};
 
        return (    
            <nav className="navbar bg-dark">
               <Link className="navbar-brand text-white" to="/">
                <FontAwesomeIcon className="chalkboard" icon={['fas', 'chalkboard']}/>
                <h1 className="d-inline-block">BulletinBoard</h1>
               </Link>
              <div>
               <Link className="navbar-brand text-white" to="/about"> <h2>About</h2></Link>
               {isAuthenticated ?
                <Link className="navbar-brand text-white" onClick={onclick} to="#"><FontAwesomeIcon className="logouticon" icon={['fas', 'sign-out-alt']}/>
                 <h2 className="logout">Hi {localStorage.name}</h2>
                </Link>
               :
                <Link className="navbar-brand text-white" to="/login"> <FontAwesomeIcon className="loginicon" icon={['fas', 'sign-in-alt']}/>
                 <h2 className="login">Login</h2>
                </Link>}    
              </div> 
            </nav>
        )
}


export default Navbar