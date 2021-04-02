import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            
            <nav className="nav border justify-content-end">
                <Link className="nav-item nav-link active" to="/home">Home</Link>
                <Link className="nav-item nav-link" to="/orderReview">Order Review</Link>
                <Link className="nav-item nav-link" to="/checkOut">CheckOut</Link>
                <Link className="nav-item nav-link" to="/admin">Admin</Link>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                {/* <button onClick={() => setLoggedInUser({})}>Sign out</button> */}
            </nav>
        </div>
    );
};

export default Header;