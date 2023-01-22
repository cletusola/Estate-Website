import React,{ useState } from 'react';
import { useNavigate } from 'react-router'
import axios from 'axios';



const ChangePassword = () => {

    const[old_password, setOld_password] = useState("")
    const[new_password, setNew_password] = useState("")

    const navigate = useNavigate()

    // change password func
    const ChangePasswordFunction = async(e) => {
        e.preventDefault();

        let formField = new FormData()
        formField.append('old_password', old_password)
        formField.append('new_password', new_password)

    // post data 
    await axios({
        url:'http://127.0.0.1:8000/api/account/auth/changepassword/',
        method: 'POST',
        data: formField,
        headers: {
            'Content-Type': 'Application/Json',
        }
    }).then((response) => {
        console.log(response.data)
        navigate('/')
    }).catch((err) => console.log(err))

    }

    return(
        <div className='login-div'>
            <form method='POST'>
                <input 
                    type='password'
                    name = 'old_password'
                    placeholder='Old Password'
                    className='ops-input'
                    value={old_password}
                    onChange={(e) => setOld_password(e.target.value)}
                /><br/>
                <input 
                    type='password'
                    name = 'new_password'
                    placeholder='New Password'
                    className='nps-input'
                    value={new_password}
                    onChange={(e) => setNew_password(e.target.value)}
                /><br/>
                <button type='submit' onClick={ChangePasswordFunction}>Log In</button>
            </form>
        </div>
    )

}

export default ChangePassword;