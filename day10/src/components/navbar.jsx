import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch } from "react-redux";
import { unsetUserAuth } from "../features/authSlice";
import { useGetUserProfileQuery } from "../services/UserApi";
import { setUserInfo } from "../features/userSlice";
import { useSelector } from 'react-redux';
import { GetToken, RemoveToken } from "../services/localstoreage";
import { Outlet } from "react-router";
import { Fragment } from 'react';
import Foot from "./footer"
import { useRef } from 'react';

export const Navbar = () => {

  const {access_token} = GetToken()
  const {data,isSuccess}= useGetUserProfileQuery(access_token)
  const navbarRef= useRef(null)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(data && isSuccess){
      dispatch(setUserInfo({
        first_name :data.first_name,
        last_name: data.last_name,
        email: data.email,
        mobile_number: data.mobile_number
      }))
    }
  
  },[data,isSuccess,dispatch])

  const userData = useSelector(state => state.user)

  
  const navigate = useNavigate()
 
 const logout =()=>{
    dispatch(unsetUserAuth({"access_token":null}))
     RemoveToken()
     navigate('/login')
  }




  return (
 <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
  

      <NavLink className="navbar-brand" to=" ">
        <img src={require('./images/logo.jpg')} className="navbar-brand-img mt-2" alt=""/>
     
      </NavLink>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  

      <div className="collapse navbar-collapse" id="navbarCollapse">
  

        <button className="navbar-toggler" ref={navbarRef}  type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
        </button>

        <ul className="navbar-nav ms-auto">

        {access_token ? 
                  <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle mt-md-2" id="navbarAccount" data-bs-toggle="dropdown"  to=" "aria-haspopup="true" aria-expanded="false">
                    <span className='text-primary' >Card</span>
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarAccount">
                    <li className="dropdown-item dropend">
                      <NavLink className="dropdown-link"  to="/user-details">
                      <span className='d-md-block d-none'> New card</span>
                       <span data-bs-toggle="collapse" className='d-md-none d-block'  data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> New card</span>
                      </NavLink>
                  
                    </li>
                    <li className="dropdown-item ">
                      <NavLink className="dropdown-link"  to="/user-card">
                      <span className='d-md-block d-none'> My cards</span>
                        <span data-bs-toggle="collapse" className='d-md-none d-block' data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> My Cards</span>
                      </NavLink>
                    </li>
      
                
                  </ul>
                </li>
        : <>
        <li className="nav-item">
            <NavLink className="nav-link" to="/pricing" >
            <span className='d-md-block d-none text-primary'>Pricing</span>
              <span  data-bs-toggle="collapse" className='text-primary d-md-none d-block' data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">Pricing</span>
            </NavLink>
                     
          </li>
          <li className="nav-item">
              <a href="https://visiontrek.in/" className="nav-link" target="_blank">
              <span data-bs-toggle="collapse" className='text-primary'  data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> About Us</span>
              </a>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login" >
              <span className='text-primary' data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">Card</span>
            </NavLink>
          </li>
        </> }
             
          
          {access_token ?  <li className="nav-item dropdown">
          <NavLink className="nav-link dropdown-toggle d-flex text-primary" id="navbarAccount" data-bs-toggle="dropdown"  to=" "aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle d-md-block d-none " viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          <span className='d-md-none d-block ms-1 text-primary'>{userData.first_name+" "+userData.last_name}</span>
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="navbarAccount">
              <li className="dropdown-item dropend d-md-block d-none">
                <NavLink className="dropdown-link"  to="#">
                  <span>  {userData.first_name+" "+userData.last_name} </span>
                </NavLink>
            
              </li>
              <li className="dropdown-item ">
                <NavLink className="dropdown-link"  to="/user-card">
                <span className='d-md-block d-none'> My cards</span>
                  <span data-bs-toggle="collapse" className='d-md-none d-block' data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">  My Cards</span>
                </NavLink>

              </li>
             
              <li className="dropdown-item dropend">
                <NavLink className="dropdown-link "  to="/forgetpassword">
                  <span data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> Change password </span>
                </NavLink>
             
              </li>
              <li className="dropdown-item dropend">
                <span type='button' onClick={logout} >
                  <span data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> Sign out</span>
                </span>
               
              </li>
            </ul>
          </li>: ""}

     
        </ul>
  
      {access_token ? "":
         <NavLink className="navbar-btn btn btn-sm btn-purple btn-primary lift ms-auto" to="/login" >
         <span data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"> Sign in</span>
       </NavLink> }
     
  
      </div>
  
    </div>
  </nav>


  <Outlet/>
  <Fragment>
  <Foot/>
  </Fragment>
 </>
 
  )
}


export default Navbar;