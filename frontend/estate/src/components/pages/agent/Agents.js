import React,{ useState, useEffect } from 'react';
import axios from 'axios';

import MainHeader from "../../hocs/MainHeader";
import './agent.css'





const Agents = () => {

    const [agent, setAgent ] = useState([]);

    const getAgents = async() => {
        const res = await axios.get("http://127.0.0.1:8000/api/agent/")
        console.log(res.data)
        setAgent(res.data)
    }

    useEffect(() => {
        getAgents();
    }, []);

    return (
        <React.Fragment>
            <MainHeader/>
            { agent&& agent.length > 0 ? agent.map((a) => (
            <div className='agent-container'>
                <div className='agent-div'>
                    <div className='img-div'>
                    <img src={a.picture} alt="agents-img" /><br/>
                    <p style={{'fontSize':'14px'}} > @{a.username}</p>
                    </div>
                    <div className='agent-info'>
                        <p><b><i>Name :</i></b> {a.first_name}, {a.last_name}</p>
                        <p><b><i>Phone :</i></b> {a.phone}</p>
                        <p><b><i>Mobile :</i></b> {a.mobile}</p>
                        <p><b><i>Email :</i></b> {a.email}</p>
                        <p><b><i>Address : </i></b>{a.address}</p><br/>
                        <p><b><i>Bio : </i></b> {a.bio}</p><br/>
                        <p style={{'fontSize':'14px'}} ><b><i>Twitter : </i></b><a href='#'>{a.twitter}</a></p>
                        <p style={{'fontSize':'14px'}} ><b><i>Facebook : </i></b><a href='#'>{a.facebook}</a></p>
                        <p style={{'fontSize':'14px'}} ><b><i>Instagram : </i></b><a href='#'>{a.instagram}</a></p>
                        <p style={{'fontSize':'14px'}} ><b><i>Skype : </i></b><a href='#'> {a.skype}</a></p>
                        
                    </div>    
                </div><br/><br/><br/>  
            </div>
            )): " No Agents to display "}
            
        </React.Fragment>
    )
}

export default Agents; 

