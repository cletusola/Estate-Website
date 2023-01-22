import React,{ useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../components/context/Authcontext";


// creating private route 
const PrivateRoute = ({children}) => {

    let {user} = useContext(AuthContext)

    if (!user) {
        return <Navigate to='/account/login' />
    }    
    return children;
}
export default PrivateRoute;