import React from "react";
import TextField from '@mui/material/TextField';
import './forget.css'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import  axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';




const ForgetPassword = () => {
    const [error,seterror] =useState({})
    const inputRef =useRef(null)
    const otpRef = useRef(null)
    const passwordRef = useRef(null)
    const [loading,setLoading] =useState(false)
    const navigate = useNavigate()

    // const url= "http://127.0.0.1:8000/"

    const url="https://api.cardz.visiontrek.in/"

    const handleForget = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const fromdata = new FormData(e.currentTarget);
    const data ={
        email:fromdata.get('username'),
    }
    await axios.post(url+"forget-password/",data).then(response=>{
     
        console.log(response.data)
        inputRef.current.className="d-none"
        otpRef.current.className="d-block"
        window.sessionStorage.setItem("email", data.email);
        setLoading(false)  

    })                        
    .catch(error=>{
        
        seterror(error.response.data)
        setLoading(false)  
    })   
}


const handleotp = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const fromdata = new FormData(e.currentTarget);
    const data ={
        otp:fromdata.get('otp'),
        email:window.sessionStorage.getItem("email")
    }
    await axios.post(url+"verify/",data).then(response=>{
        
        otpRef.current.className="d-none"
        passwordRef.current.className="d-block"
        setLoading(false)  
      
    })                        
    .catch(error=>{
        seterror(error.response.data)
        setLoading(false)  
        
        
    })   
}



const createpassword = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const fromdata = new FormData(e.currentTarget);
    const data ={
        password:fromdata.get('password'),
        cpassword:fromdata.get('cpassword'),
        username:window.sessionStorage.getItem("email")
    }
    await axios.post(url+"create-password/",data).then(response=>{
      
        setLoading(false)  
        navigate("/login")
      
    })                        
    .catch(error=>{
        seterror(error.response.data)
        setLoading(false)  
        console.log(error.response.data)
        
    })   
}

const [otpsend,setotpsend]=useState(false)

const resend =()=>{
    setLoading(true)
    axios.get(url+"resend/"+window.sessionStorage.getItem("email")).then(response=>{
        setotpsend(true)
        setLoading(false)
    })                        
    .catch(error=>{
     console.log(error)
     setLoading(false)
    }) 
}


  return (
    <>
      <div className="main">
        <div className="container">
            <div className="row">
                <div className="col">
                  

                    <div  className="forget-forms border border-md-2">
                        <span className="navbar-brand text-primary d-flex justify-content-center" >Visiontrek</span>
                  
                        <div>
                        <div  ref={inputRef}>
                           <span className="text-bolder d-flex justify-content-center find-text">Find your account</span>
                            <p className="text-bolder d-flex justify-content-center info-text">Enter your Mobile number or email</p>
                            
                            <form onSubmit={(e)=>handleForget(e)}>
                                <TextField
                                
                                id="demo-helper-text-aligned"
                                label="Phone number or email"
                                className="p-input ms-md-7"
                                name="username"
                                    />

                                {error.error ? <p className="ms-7 text-danger fs-5">{error.error}</p>:""}
                                <div className="float-end me-5 mt-4">
                                    {/* <Button variant="contained" className="px-6" type="submit">Next</Button>
                                     */}

                                        <Button                                   
                                            variant="contained"
                                          className="px-6" type="submit"
                                        >
                                         Next
                                         {loading ?<div className="spinner-border p-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div> : ""}
                                        </Button>
                                </div>
                            </form>

                            
                           <div className="d-flex auth-btn justify-content-center">
                           <Link to="/login" className="auth-button  ">
                                <span className='ms-1 text-primary text-decoration-underline'>Go to signin page ?</span>
                            </Link>
                           </div>
                        </div>

                        <div  ref={otpRef} className="d-none" >
                            <p className="text-bolder d-flex justify-content-center info-text text-success">Please check your email and enter the otp</p>
                            <span className="text-bolder d-flex justify-content-center  text-warning ">Valid for 10 minutes.</span>
                            {otpsend && 
                               <span className="text-bolder d-flex justify-content-center fs-4 find-text mb-3"> Otp resend successful
                               <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" className="mt-1 ms-1 bi bi-patch-check" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                               <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                               </svg>
                               </span>}
                           
                        
                         <form onSubmit={(e)=>handleotp(e)}>
                            <TextField
                                id="demo-helper-text-aligned"
                                label="Enter your otp"
                                className="p-input ms-md-7"
                                name="otp"
                                type="number"
                                
                                    />
                                {error.status ? <p className="ms-7 text-danger fs-5">{error.status}</p>:""}
                                {error.otp ? <p className="ms-7 text-danger fs-5">{error.otp}</p>:""}
                                <div className="float-end me-5 mt-4">
                                    <Button variant="contained" className="px-6" type="submit">Next
                                    {loading ?<div className="spinner-border p-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div> : ""}
                                        </Button>
                                </div>
                         </form>
                                                  
                         
                        <button type="button" onClick={resend} className="btn text-decoration-underline text-primary mt-md-5 ms-md-5">Resend otp ?</button>
                      
                        <div className="d-flex auth-btn justify-content-center">
                           <Link to="/login" className="auth-button  ">
                                <span className='ms-1 text-primary text-decoration-underline'>Go to signin page ?</span>
                            </Link>
                           </div>
                        </div>
                        <div className="d-none" ref={passwordRef}>
                            <span className="text-bolder d-flex justify-content-center find-text"> Otp verified
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="green" className="mt-md-2 mt-1 ms-1 bi bi-patch-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                            </svg>
                            </span>
                            <p className="text-bolder d-flex justify-content-center info-text mb-md-5">create your new password</p>

                            <form  onSubmit={(e)=>createpassword(e)}>
                                 <TextField
                                    id="demo-helper-text-aligned"
                                    label="Enter create new password"
                                    className="p-input ms-md-7"
                                    name="password"
                                    />

                                <TextField
                                    id="demo-helper-text-aligned"
                                    label="Confirm passoword"
                                    className="p-input ms-md-7 mt-3"
                                    name="cpassword"
                                    />

                                {error.error ? <p className="ms-7 text-danger fs-5">{error.error}</p>:""}
                                {error.success ? <p className="ms-7 text-danger fs-5">{error.success}</p>:""}

                                <div className="float-end me-5 mt-4">
                                    <Button variant="contained" className="px-6" type="submit">Submit
                                    {loading ?<div className="spinner-border p-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div> : ""}
                                        </Button>
                                </div>
                            </form>
                            <div className="d-flex auth-btn justify-content-center">
                           <Link to="/login" className="auth-button  ">
                                <span className='ms-1 text-primary text-decoration-underline'>Go to signin page ?</span>
                            </Link>
                           </div>
                            
                        </div>
                       
                        </div>

                       
                
                    </div>
                   
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
