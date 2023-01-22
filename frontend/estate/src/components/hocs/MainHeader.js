import React,{useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/Authcontext";

import './mainheader.css';
import AgentHeader from "./AgentHeader";

const MainHeader = () => {

    let {user} = useContext(AuthContext);


    return(
        <React.Fragment>
        
        {user ?  
            <AgentHeader/>
            : 
            <div className="nav-div">
            <h2 className="logo-name">RapidEstate</h2>
            <ul className="nal-ul">
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/listings">Listings</Link>
                <Link className="link" to="/agents">Agents</Link>
                <Link className="link" to="/blogs">Blog</Link>
                <Link className="link" to="/about">About</Link>
                <Link className="link" to="/contact">Contact</Link>
                <Link className="link" id="login" to="/account/login">Login</Link>
                <Link className="link" id="signup"  to="/account/signup">SignUp</Link>
            </ul>
        </div>
        } 
        
    </React.Fragment> 
    )

}
export default MainHeader;