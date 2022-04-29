import React from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {

    const logoutHandler = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        
    };
    const userInfo = localStorage.getItem("username");
    return (
        <nav className="navbar">
         <ul className="navbar_links1">
                <li>                  
                    <Link className='text-link' to="/chat">                   
                        Home
                    </Link>                  
                </li>
                <li>
<Link to="/privacy" className='text-link'>Privacy</Link>
                </li>
                
            </ul>          

            <ul className="navbar_links2">
                
                <li>
<Link to="/terms" className='text-link'>Terms and Conditions</Link>
                </li>
                { userInfo ?(<>
                <li> 
                     <div className="dropdown">
                            <button className="dropbtn">{userInfo} 
                                <i className="bi bi-chevron-down"></i>
    </button>
<div className="dropdown-content">
      <Link to="/profile" className='text-link'>Profile</Link>
                            <Link to="/" onClick={ logoutHandler} className='text-link'>Log out</Link>
                        </div>
                        </div>
                        </li>
</>): (<li><Link to="/login" className='text-link'>Login</Link></li>)}
                
            </ul>

            </nav>
    );
}

export default NavBar;