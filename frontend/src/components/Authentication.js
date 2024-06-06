import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Get, Post } from "../services/ThirdPartyUtilityService";
import constants from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function Authentication() {
    const navigate = useNavigate();

    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = useGoogleLogin({
        onSuccess : (codeResponse) =>  setUser(codeResponse),
        onError : (error) => console.log(error)
    });

    useEffect(() => {
        if(localStorage.getItem('login-token')){
            const currToken = localStorage.getItem('login-token');
            setToken(currToken);
            Get(constants.BASE_API_URL + constants.APIS.VERIFY_TOKEN, {
                Authorization: `Bearer ${currToken}`,
                Accept: 'application/json'
            })
            .then((res) => {
                setEmail(res.data.username);
                toast.success("Already Logged In", { autoClose: 1000 });
                navigate('/');
            })
            .catch((err) => {
                setToken(null);
                localStorage.clear();
            })
        }
        else if(user){
            Get(constants.GOOGLE_USER_INFO_BASE_URL + user.access_token, {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            })
            .then((res) => {
                setEmail(res.data.email);
                Post(constants.BASE_API_URL + constants.APIS.AUTHENTICATE, res.data).then((tokenResponse) => {
                    setToken(tokenResponse.data.token);
                    localStorage.setItem('login-token', tokenResponse.data.token);
                    toast.success("Login Successful", { autoClose: 1000 });
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                })
            })
        }
    }, [user, token])

    return <div>
        <h2>Login using Google</h2>
        {
            email ? 
            <>
                EMAIL IS : {email}
            </> : 
            <>
                <button onClick={login}>Login using Google</button>
            </>
        }
    </div>
}

export default Authentication;