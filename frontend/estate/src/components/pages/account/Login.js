import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Authcontext';

import './auth.css'

const Login = () => {
    let { loginUser } = useContext(AuthContext)
    return(
        <div className='login-div'>
            <h2 style={{'color':'white'}} >LogIn</h2>
            <form method='POST' onSubmit={loginUser}>
                <input 
                    type='text'
                    name = 'username'
                    placeholder='Username'
                    className='us-input'
                    required
                /><br/>
                <input 
                    type='password'
                    name = 'password'
                    placeholder='Password'
                    className='ps-input'
                    required
                /><br/>
                <button type='submit'>Log In</button>
                <br/><br/>
                <p style={{'color':'white'}} >No account? signup <Link to='/account/signup'>Here</Link></p>
                <p style={{'color':'white'}} >Go <Link to='/'>Home</Link></p>
            </form>
        </div>
    )

} 

export default Login;