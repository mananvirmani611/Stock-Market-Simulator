import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { googleLogout } from '@react-oauth/google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { Get } from '../services/ThirdPartyUtilityService';
import constants from '../constants';
import Home from '@mui/icons-material/Home';
import { useDispatch } from 'react-redux';
import { updateBalance, updateEmail } from '../slices/emailSlice';



const Navbar = function ({email, leftText, rightText, showBalance, iconType}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [balance, setBalance] = useState("");
  const style = `
        .menu-item{
            background-color:#ebe0d6;
        }
        .menu-cover{
            background-color:#ebe0d6;
            max-width:100px;
            text-align:left;  
        }
        .main-grid{
          background-color:#ebe0d6;
          padding: 1.3%;
          font-family: 'Concert One';
          border-radius:12px;
        }
        .left-div{
          font-size:32px;
          color:gray;
          width:84%;
          padding-left:10px;
        }
        .right-div{
          text-align:right;
          font-size:20px;
          margin-top:5%;
          margin-right:3%;
          height:100%;  
        }
        .top-buttons{
          margin:0.5%;
        }
        
    `
  const handleNavigation = function(icon){
    if(icon === 'Profile'){
      navigate("/profile");
    }
    else navigate('/')
  }
  useEffect(() => {
      if(showBalance){
        Get(constants.BASE_API_URL + constants.APIS.CURRENT_BALANCE + `?email=${email}`)
        .then((res) => {
          setBalance((res.data.balance).toFixed(2));
        }) 
        .catch((err) => {
          console.log(err);
        })
      }
  })

  const logOut = function(){
      googleLogout();
      localStorage.clear();
      dispatch(updateEmail(""));
      dispatch(updateBalance(-1));
      navigate("/login");
  }

  const intitalButtonStyle = { 'backgroundColor': '#ebe0d6', 'border': '0px' };

  const [styleButton, setStyleButton] = useState(intitalButtonStyle);

  return <>
    <Grid container className='main-grid' variant='circular' style={{'boxShadow' : '3px 3px lightgray'}}>
      <Grid item xs={9}>
        <div className='left-div'>{leftText}</div>
      </Grid>
      <Grid item xs={2} >
        <div className='right-div'>{rightText && rightText + balance + '₹'}</div>
      </Grid>
      <Grid item xs={1}>
        <button onClick={() => handleNavigation(iconType)} style={styleButton} onMouseOver={() => setStyleButton({ ...styleButton, 'cursor': 'pointer' })}>
          <Tooltip title="Profile" placement="top-end">
            {
              iconType === 'Profile' ?
                  <AccountCircleIcon fontSize='large' className='top-buttons' /> :
                  <Home fontSize='large'/>
            }
          </Tooltip>
        </button>

        <button onClick={logOut} style={styleButton} onMouseOver={() => setStyleButton({ ...styleButton, 'cursor': 'pointer' })}>
          <Tooltip title="Logout" placement="top-end">
            <LogoutIcon fontSize='large' className='top-buttons' />
          </Tooltip>
        </button>
      </Grid>

    </Grid>
    <style>
      {style}
    </style>
  </>
}

export default Navbar;