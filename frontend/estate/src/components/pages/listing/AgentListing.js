import React,{ useState, useEffect, useContext} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import AgentHeader from "../../hocs/AgentHeader";
import AuthContext from "../../context/Authcontext";
import '../agent/agentprofile.css';

const AgentListing = () => {

    let {id} = useParams();

    const navigate = useNavigate();

    const {user, authTokens} = useContext(AuthContext)
    const [list, setList] = useState({})

    const getlist = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/listing/agent_list/`,{headers: { 
            "Authorization": `Bearer ${authTokens.access}`
        }})
   
        console.log(res.data)
        setList(res.data)
    }
    useEffect(() => {
        getlist();
    },[]);

    const deleteObject = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/listing/agent_list/${id}/`,{headers: { 
            "Authorization": `Bearer ${authTokens.access}`
        }}).then((response) => {
            navigate('/agents/profile')
        }).catch((err) => console.log(err))
        
    }

    return(
        <React.Fragment>
            <AgentHeader/>
            <br/><br/><br/><br/><br/>
            <div className="agent-list-div">
                {/* <div className="ag-info"> */}
                    <p>@{user.username}</p>
                {/* </div> */}
                <div className="ag-list">
                    <h2>My Listings</h2>
                    {list && list.length > 0 ? list.map((l) => (
                    <div>
                        <p className="l-dtl"><Link className="ag-link" to={`../../listings/${l.id}`}>{l.name}, {l.address}</Link></p>
                        <span className="del-l"><Link className="del-ll" onClick={() => deleteObject(l.id)} >Delete</Link></span><br/>
                    </div>
                    ))
                    : "You have no listings yet"}
                   
                </div>
            </div><br/><br/><br/>
        </React.Fragment>
    )
}

export default AgentListing;