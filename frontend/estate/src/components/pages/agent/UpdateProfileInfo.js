import axios from "axios";
import React,{useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/Authcontext";
import './updateinfo.css';
import AgentHeader from "../../hocs/AgentHeader";

const UpdateProfile = () => {

    let {user, authTokens} = useContext(AuthContext)

    let {id} = useParams();

    const navigate = useNavigate();

    const [picture, setPicture] = useState(null);
    const [phone, setPhone] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [skype, setSkype] = useState("");

    // function to display profile info 
    const showProfile = async() => {

        const res = await axios.get(`http://127.0.0.1:8000/api/agent/allagents/${user.username}/`,
        {headers: {"Authorization": `Bearer ${authTokens.access}`}})
        console.log(res.data)
        console.log(id)
        // data = res.data
        setPicture(res.data.picture)
        setPhone(res.data.phone)
        setMobile(res.data.mobile)
        setAddress(res.data.address)
        setBio(res.data.bio)
        setTwitter(res.data.twitter)
        setFacebook(res.data.facebook)
        setInstagram(res.data.instagram)
        setSkype(res.data.skype)
    }
    useEffect(()=>{
        showProfile();
    },[])

    // function to update profile info
    const UpdateProfileInfo = async(e) => {
        e.preventDefault();
        
        let formField = new FormData();
        formField.append('phone', phone)
        formField.append('mobile', mobile)
        formField.append('address', address)
        formField.append('bio', bio)
        formField.append('twitter', twitter)
        formField.append('facebook', facebook)
        formField.append('instagram', instagram)
        formField.append('skype', skype)

       if (picture !== null ){
        formField.append('picture',picture)
       }

        await axios({
            url:`http://127.0.0.1:8000/api/agent/profile/update/${id}/`,
            method: 'PUT',
            data: formField,
            headers: {
                'Accept':'application/json',
                'Content-Type':'multipart/formdata',
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
                <div className="all-div">
                    <input type="file" 
                    className="picture"
                    name='picture'
                    onChange={(e) => setPicture(e.target.files[0])}
                    /><br/>
                    <input 
                    type="text"
                    className='phone'
                    name='phone'
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    /><br/>
                    <input 
                    type="text"
                    className='mobile'
                    name='mobile'
                    defaultValue={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    /> <br/> 
                    <input 
                    type="text"
                    className='address'
                    name='address'
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                    /> <br/> 
                    <textarea
                    className="bio"
                    name="bio"
                    defaultValue={bio}
                    onChange={(e) => setBio(e.target.value)}
                    /><br/>
                    <input 
                    type="text"
                    className='twitter'
                    name='twitter'
                    defaultValue={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    />  <br/>
                    <input 
                    type="text"
                    className='facebook'
                    name='facebook'
                    defaultValue={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    /> <br/> 
                    <input 
                    type="text"
                    className='instagram'
                    name='instagram'
                    defaultValue={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    />  <br/>
                    <input 
                    type="text"
                    className='skype'
                    name='skype'
                    defaultValue={skype}
                    onChange={(e) => setSkype(e.target.value)}
                    />  <br/>
                    <button className='submit'
                    onClick={UpdateProfileInfo}
                    type='submit'>Update</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateProfile;