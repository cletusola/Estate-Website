import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import './header.css'
import AuthContext from "../context/Authcontext";


const Header = () =>{
    let {user,logoutUser} = useContext(AuthContext)
    return (
        <React.Fragment> 
            <div className="h-top">
            {user ? 
            <div>
                <h3 className="welcome" >Welcome, {user.username}</h3> 
                <Link className="logoutlink" onClick={logoutUser}><b>logout</b></Link>
                <ul className="nav-ul">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/agents/profile">Profile</Link>
                    <Link className="nav-link" to="/agents">Agents</Link>
                    <Link className="nav-link" to="/listings">Listings</Link>
                    <Link className="nav-link" to="/blogs">Blog</Link>
                    <Link className="nav-link" to="/about">About</Link>
                    <Link className="nav-link" to="/contact">Contact</Link>
                </ul>
            </div>:""}
            </div>
        </React.Fragment>
    )
}

export default Header;