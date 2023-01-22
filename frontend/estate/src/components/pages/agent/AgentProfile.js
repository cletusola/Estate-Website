import React,{ useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import AgentHeader from "../../hocs/AgentHeader";
import AuthContext from "../../context/Authcontext";
import './agentprofile.css';


const AgentProfile = () => {

    let {user, authTokens} = useContext(AuthContext)
 
    const [profile, setProfile] = useState([]);

    const getProfile = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/agent/allagents/${user.username}/`,{headers: { 
            "Authorization": `Bearer ${authTokens.access}`
        }})
        setProfile(res.data)
    }
    useEffect(() => { 
        getProfile();
    },[]);
    return (
        <React.Fragment>
            <AgentHeader/>
            <button className="add-l"><Link className="ad-l" to="../agents/list">My Listings</Link></button>
            <button className="add-list"><Link className="ad-link" to="../listings/add">AddListing</Link></button>
            <div className="p-container">
                <div className="p-obj">
                <img src={profile.picture} className="p-img" alt="agent_picture" /><br/>
                <div className="p-info">
                <p><b>username</b>: @{user.username}</p><br/>
                <p className="info"><b>Name</b>: {profile.first_name}, {profile.last_name}</p>
                <p className="info"><b>Email</b>: {profile.email}</p>
                <p className="info"><b>Phone</b>: {profile.phone}</p>
                <p className="info"><b>Mobile</b>: {profile.mobile}</p>
                <p className="info"><b>Address</b>: {profile.address}</p>
                <p className="info"><b>Bio</b>: {profile.bio}</p>
                <Link className="u-info" to={`update/user/${profile.id}`} >update user info</Link>
                <Link className="pr-info" to={`update/${profile.id}`}>update profile info</Link>
                </div>
                </div><br/><br/>
            </div>
            <div className="footer">
               <p>RapidEstate &copy; Copyright</p>
            </div>
        </React.Fragment>
    )
} 
export default AgentProfile;


