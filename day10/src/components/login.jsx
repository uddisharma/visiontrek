import './login.css'
import { Link } from "react-router-dom";
import { useLoginUserMutation } from '../services/UserApi';
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { GetToken, StoreToken } from "../services/localstoreage";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../features/authSlice";
import log from "./images/grow.gif"
import { GoogleLogin  } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';


const Signin = ()=>{

    const [loading,setloading] = useState(false)

    const navigate = useNavigate()
    const [servererror,seterror] = useState({})
    // const [logMobile,setLogMobile]=useState({email:true})

    const inputRef =useRef(null)
    
    const [logUser] = useLoginUserMutation()
    const dispatch =useDispatch();
    const handlesubmit = async (e)=>{
      e.preventDefault();
      setloading(true);
      const data = new FormData(e.currentTarget);
      const actualdata = {
        username : data.get('email'),
        password :data.get('password'),
      
    }
    
  
      const result = await logUser(actualdata)
      
      if(result.error){
        // console.log(result.error.data)
        seterror(result.error.data)
        // console.log(result.error.data)
        setloading(false);
    }
    else if(result.data){
    //   setloading(false);
      StoreToken(result.data)
      let {access_token} =GetToken()
      dispatch(setUserAuth({access_token:access_token}))
        navigate('/user-card')
    }
  }
  let {access_token} =GetToken()
  useEffect(()=>{
    dispatch(setUserAuth({access_token:access_token}))
  },[access_token,dispatch])
  
//   const cardhandle = (e)=>{
//     navigate('/signup')
//   }

// const logMobilehandle = () =>{
//     setLogMobile({mobile:true})
//     inputRef.current.value= ""
//     inputRef.current.focus()
// }

// const logEmailhandle = () =>{
//     setLogMobile({email:true})
//     inputRef.current.value= ""
//     inputRef.current.focus()
// }

 
const log_url = "https://api.cardz.visiontrek.in/google-login/"

const onSuccess = async (res) => {
    setloading(true)
  const actualdata ={
    first_name :res.profileObj.givenName,
    last_name : res.profileObj.familyName,
    email : res.profileObj.email,
    profile_img_url: res.profileObj.imageUrl,
    google_id :  res.profileObj.googleId
  }
  console.log(actualdata)
  await axios.post(log_url,actualdata).then(response=>{
    StoreToken(response.data)
    setloading(false)
    navigate('/user-card')
    })                        
    .catch(error=>{
        seterror(error.response.data)
        setloading(false)
        
    
})  

};
const onFailure = (err) => {
  console.log('failed:', err);
};

const clientId="660867736066-sdoajnc7l343johgst6haes07b673of0.apps.googleusercontent.com"

useEffect(() => {
  const initClient = () => {
        gapi.client.init({
        clientId:clientId,
        scope: ''
      });
   };
   gapi.load('client:auth2', initClient);
});


    return(
        <>
       <div className="main">
       <div className="slider">
        <img src={log} alt="" />
        <h1> Build your digital card and grow your bussiness. </h1>
         
        </div>
                <section className="forms">
                    
               <div className="form login">
                <div   className="form-content">
                    <header className='text-primary'>Sign in to  Visiontrek</header>
                    <form onSubmit={(e)=>handlesubmit(e)}>
                    <div   className="field input-field position-static">
                            <input type="email" placeholder="Email" name="email" className="text-dark" ref={inputRef} />
                        </div>
                       
                        {servererror.username ? <span className='error mt-1 text-danger'>{servererror.username}</span>: ''}

                        <div   className="field input-field">
                            <input type="password" placeholder="Password" name="password"  className="text-dark" />

                        </div>
                        {servererror.password ? <span className='error mt-1 text-danger'>{servererror.password}</span>: ''}
                         {servererror.detail ? <span className='error mt-1 text-danger'>{servererror.detail}</span>: ''}
                        <div   className="form-link">
                            <Link to="/forgetpassword"  className="forgot-pass text-primary float-end my-2 ">Forgot password?</Link>
                        </div>

                        <div   className="field  button-field mb-5">
                            <button>Sign in  {loading ?<div className="spinner-border p-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                        </div> : ""}</button>
                        </div>
                    </form>

                    <div className="form-link mt-7">
                    </div>
                </div>

                <p className='text-dark d-flex justify-content-center'><hr className='w-25 line'/>Or <hr className='w-25 line' /></p>

                <div   className="media-options">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    className="w-100 fs-5 d-flex justify-content-center"
                 />
              
                
                </div>

                <div className="media-options">
                    <Link to="/signup" className="field  facebook bg-primary">
                   
                        <span className='ms-1 text-white'>Create new Account</span>
                    </Link>
                </div>

            </div>
            </section>
       </div>



      
        </>
    )
}

export default Signin;