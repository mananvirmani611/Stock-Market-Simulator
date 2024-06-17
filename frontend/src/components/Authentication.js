import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Get, Post } from "../services/ThirdPartyUtilityService";
import constants from '../constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import {useSelector, useDispatch} from 'react-redux';
import { updateEmail } from '../slices/emailSlice';

toast.configure();
function Authentication() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userEmail = useSelector((state) => state.email.email);
    const [user, setUser] = useState(null);

    const login = useGoogleLogin({
        onSuccess : (codeResponse) => setUser(codeResponse),
        onError : (error) => console.log(error)
    });

    useEffect(() => {
        const verifyTokenAndUpdateEmail = async () => {
            try{
                const verifyTokenResponse = await Get(constants.BASE_API_URL + constants.APIS.VERIFY_TOKEN, {
                    Authorization: `Bearer ${localStorage.getItem('login-token')}`,
                    Accept: 'application/json'
                });
    
                const email = verifyTokenResponse.data.username;
                toast.success("Already Logged In", { autoClose: 1000 });
                navigate("/");
                dispatch(updateEmail(email));
            }
            catch(err){
                localStorage.clear();
            }
        }

        const fetchUserInfo = async () => {
            try{
                const infoResponse = await Get(constants.GOOGLE_USER_INFO_BASE_URL + user.access_token, {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                })
                const email = infoResponse.data.email;
                const tokenResponse = await Post(constants.BASE_API_URL + constants.APIS.AUTHENTICATE, infoResponse.data)
                localStorage.setItem('login-token', tokenResponse.data.token);
                toast.success("Login Successful", { autoClose: 1000 });
                navigate('/');
                dispatch(updateEmail(email));
            }
            catch(err){
                console.log(err.message);
            }
        }

        if(!userEmail){
            console.log("user email is null");
            if(localStorage.getItem('login-token')){
                verifyTokenAndUpdateEmail();
            }
            else{
                if(user){
                    fetchUserInfo();
                }
            }
        }
        else{
            toast.success("Already Logged In", { autoClose: 1000 });
            navigate('/');
        }
    }, [user])

    return <div style={{textAlign:"center", fontFamily:"Poppins"}}>
        <Card variant="outlined" sx={{ boxShadow: 3 }} style={{ width:'30%', margin:'12% auto', padding:"5% 2%"}}>
        <h1 style={{textAlign : "center"}}>Stock Market Simulator</h1>
        {/* <h2 style={{textAlign : "center"}}>Login using Google</h2> */}
        {
            userEmail ? 
            <>
                EMAIL IS : {userEmail}
            </> : 
            <>
                <div style={{width:'100%', textAlign:"center"}}>
                    <Button onClick={login} color='info' variant='outlined' size='large'>Login using Google&nbsp;<GoogleIcon /></Button>
                </div>
            </>
        }
        </Card>
    </div>
}

export default Authentication;