import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (    
        <div className="navbar bg-dark">
           <Link className="navbar-brand text-white" to="/"> <FontAwesomeIcon className="chalkboard" icon={['fas', 'chalkboard']}/><h1 className="d-inline-block">BulletinBoard</h1></Link>
           <Link className="navbar-brand text-white" to="/about"> <h2>About</h2></Link>
        </div>
    )
}


export default Navbar