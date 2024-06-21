import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { googleLogout } from '@react-oauth/google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import Home from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance, updateBalance, updateEmail } from '../slices/emailSlice';



const Navbar = function ({leftText, rightText, showBalance, iconType}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userBalance = useSelector((state) => state.email.balance);
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
          if(userBalance === -1){
              dispatch(fetchBalance());
          }       
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
        <div className='right-div'>{rightText && rightText + userBalance.toFixed(2) + '₹'}</div>
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