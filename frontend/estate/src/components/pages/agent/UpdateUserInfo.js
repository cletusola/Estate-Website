import axios from "axios";
import React,{useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import AgentHeader from "../../hocs/AgentHeader";

const UpdateUserInfo = () => {

    let {authTokens} = useContext(AuthContext)

    let {id} = useParams();

    const navigate = useNavigate();

    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // function to display user info 
    const showUser = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/agent/user/`,
        {headers: {"Authorization": `Bearer ${authTokens.access}`}})
        // console.log(res.data[0])
        // console.log(res.data[0]['first_name'])
        // console.log(id)
        // data = res.data
        setFirst_Name(res.data[0]['first_name'])
        setLast_Name(res.data[0]['last_name'])
        setUsername(res.data[0]['username'])
        setEmail(res.data[0]['email'])
    }
    useEffect(()=>{
        showUser();
    },[])

    // function to update user info
    const UpdateUserInfo = async(e) => {
        e.preventDefault();
        
        let formField = new FormData();
        formField.append('first_name', first_name)
        formField.append('last_name', last_name)
        formField.append('username', username)
        formField.append('email', email)

        await axios({
            url:`http://127.0.0.1:8000/api/agent/user/${id}/`,
            method: 'PUT',
            data: formField,
            headers: {
                'Content-Type':'application/json',
                "Authorization":  `Bearer ${authTokens.access}`,
            },
        }).then((response) => {
            console.log(response.data)
            navigate('/agents/profile')
        }).catch((err) => console.log(err))
    }

    return (
        <React.Fragment>
            <AgentHeader/>
            <br/><br/><br/><br/>
            <div className="form-div">
            <input 
            type="text"
            className='first_name'
            name='first_name'
            defaultValue={first_name}
            onChange={(e) => setFirst_Name(e.target.value)}
            /><br/>
            <input 
            type="text"
            className='last_name'
            name='last_name'
            defaultValue={last_name}
            onChange={(e) => setLast_Name(e.target.value)}
            /><br/>
            <input 
            type="text"
            className='username'
            name='username'
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <input 
            type="text"
            className='email'
            name='email'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <button className='submit'
            onClick={UpdateUserInfo}
            type='submit'>Update</button>
            </div>
        </React.Fragment>
    )
}

export default UpdateUserInfo;