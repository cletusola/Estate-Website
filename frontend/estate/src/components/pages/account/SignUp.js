import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import './auth.css'


const SignUp = () => {

    // const for use state and effect
    const [first_name, setFisrt_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")


    const navigate = useNavigate();
    // signup func
    const SignUpFunction = async(e) => {
        e.preventDefault();
        
        let formField = new FormData()
        formField.append('first_name', first_name)
        formField.append('last_name', last_name)
        formField.append('username', username)
        formField.append('email', email)
        formField.append('password', password)
        formField.append('password2', password2)


    // post data 
    await axios({
        url:'http://127.0.0.1:8000/api/account/auth/signup/',
        method: 'POST',
        data:formField,
        headers: {
            'Content-Type':'Application/Json',
        }
        }).then((response) => {
            console.log(response.data)
            navigate('/account/login')
        }).catch((err) => console.log(err))

    }


    return (
        <div className='signup-div'>
            <h2 style={{'color':'white'}} >Sign Up</h2>
            <form method='POST' onSubmit={SignUpFunction}>
                
                <input 
                    type='text'
                    name='first_name' 
                    className='fn-input' 
                    placeholder='FirstName'
                    required
                    value={first_name}
                    onChange={(e) => setFisrt_name(e.target.value)}
                /><br/>

                <input 
                    type='text' 
                    name='last_name' 
                    className='ln-input' 
                    placeholder='LastName'
                    required
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                /><br/>
                
                <input 
                    type='text' 
                    name='username' 
                    className='us-input' 
                    placeholder='Username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/>
                
                <input 
                    type='email' 
                    name='Email' 
                    className='em-input' 
                    placeholder='Email' 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
                
                <input 
                    type='password' 
                    name='password' 
                    className='ps-input' 
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>

                <input 
                    type='password' 
                    name='password2' 
                    className='ps2-input' 
                    placeholder='Password Again'
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                /><br/>

                <button type='submit'>Sign Up</button>

                <p style={{'color':'white'}} >Already have an account? login <Link to='/account/login'>Here</Link> </p>
                <p style={{'color':'white'}} >Go <Link to='/'>Home</Link></p>
            </form>
        </div>
    )
};

export default SignUp;