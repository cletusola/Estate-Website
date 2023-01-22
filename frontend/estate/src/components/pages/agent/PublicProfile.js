import React,{ useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import MainHeader from "../../hocs/MainHeader";
import AgentHeader from "../../hocs/AgentHeader";
import AuthContext from "../../context/Authcontext";
import './agentprofile.css';


const PublicProfile = () => {

    let {user} = useContext(AuthContext)

   const {agent} = useParams(); 
 
    const [profile, setProfile] = useState([]);

    const getProfile = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/agent/allagents/${agent}/`)
        setProfile(res.data)
    }
    useEffect(() => { 
        getProfile();
    },[]);
    return (
        <React.Fragment>
            {user ? <AgentHeader/>: <MainHeader/>}
            <div className="p-container">
                <div className="p-obj">
                <img src={profile.picture} className="p-img" alt="agent_picture" /><br/>
                <div className="p-info">
                <p><b>username</b>: @{profile.username}</p><br/>
                <p className="info"><b>Name</b>: {profile.first_name}, {profile.last_name}</p>
                <p className="info"><b>Email</b>: {profile.email}</p>
                <p className="info"><b>Phone</b>: {profile.phone}</p>
                <p className="info"><b>Mobile</b>: {profile.mobile}</p>
                <p className="info"><b>Address</b>: {profile.address}</p>
                <p className="info"><b>Bio</b>: {profile.bio}</p>
                </div>
                </div><br/><br/>
            </div>
            <div className="footer">
               <p>RapidEstate &copy; Copyright</p>
            </div>
        </React.Fragment>
    )
} 
export default PublicProfile;