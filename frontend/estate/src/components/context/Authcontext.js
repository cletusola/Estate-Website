import { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate, redirect } from "react-router-dom";
// import { redirect } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    // login autn function 
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)

    const navigate = useNavigate();

    const loginUser = async(e) => {
        e.preventDefault()

        await axios({
            url:'http://127.0.0.1:8000/api/account/token/',
            method: 'POST',
            data: {username: e.target.username.value,
                   password: e.target.password.value
                },
            headers:{
                'Content-Type':'Application/Json'
            }
        }).then((response) => {
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            navigate('/')
        }).catch((err) => console.log(err))
    }

    // logout function
    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        redirect('/')
    }


    const updateToken = async() => {
        await axios({
            url:'http://127.0.0.1:8000/api/account/token/refresh/',
            method: 'POST',
            data: {refresh: authTokens.refresh},
            headers:{
                'Content-Type':'Application/Json'
            }
        }).then((res) => {
            let data = (res.data)
            console.log(data)
        })
    }

    //context data
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )


}