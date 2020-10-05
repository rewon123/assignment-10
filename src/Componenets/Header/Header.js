import React, { useContext } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import logo from '../../volunteer-network/logos/Group 1329.png'
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand navbar-light bg-transparent py-2 ">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Hot Onion Logo" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item active">
                        <Link to="/home" className="nav-link">home</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/donation" className="nav-link"> Donations </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/events" className="nav-link">events</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/blog" className="nav-link">Blog</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            <button className="btn btn-primary btn-rounded"> {loggedInUser.isSignedIn === true ? loggedInUser.name : 'register'}</button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">
                            <button className="btn btn-secondary btn-rounded"> Admin </button>
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Header;