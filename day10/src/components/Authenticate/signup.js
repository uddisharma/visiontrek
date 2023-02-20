import React, {useState} from 'react';
import '../css/signup.css';
import { useRegisterUserMutation } from '../../services/UserApi';
import { useNavigate } from 'react-router';
import "../css/loader.css"
import signup_img from "../images/signup-image.jpg"
import { Link } from 'react-router-dom';

const Signup = ()=>{
    
    const [servererror,seterror] = useState({})

    const [registerUser] = useRegisterUserMutation()

    const navigate = useNavigate()
    const [loading,setloading] =useState({"unload":true})

    const handlesubmit = async (e)=>{
        e.preventDefault();
      
        const data = new FormData(e.currentTarget);
        const actualdata = {
            first_name :data.get('first_name'),
            last_name :data.get('last_name'),
            email :data.get('email'),
            password :data.get('password'),
            password2 :data.get('cpassword'),
          
        }

        const errotlist = {}

        if(actualdata.first_name ===""){
            errotlist["first_name"] = "firstname required field";
        }

        if(actualdata.last_name ===""){
            errotlist["last_name"] = "last_name required field";
        }

        if(actualdata.email ===""){
            errotlist["email"] = "email required field";
        }

        if(actualdata.password ===""){
            errotlist["password"] = "password required field";
        }

        if(actualdata.password2 ===""){
            errotlist["password2"] = "conform password required field";
        }

      

        if(Object.keys(errotlist).length !== 0){
            console.log("here")
            seterror(errotlist)
        }
        else{
            setloading({"load":true})
            const result = await registerUser(actualdata)
    
            if(result.error){
                console.log(result.error.data)
                seterror(result.error.data)
                setloading({"unload":true})
            }
            else if(result.data){
                window.sessionStorage.setItem("email", actualdata.email);
                setloading({"unload":true})
                navigate('/verify')
            }
        }
       

    
    }
    return(
        <div className='signupmain'>

         {loading.load ?  <div className="loader"> </div> :""}
         <section className="signup ">
            <div className="contain">
           
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={(e)=>handlesubmit(e)} className="register-form" id="register-form">
                            <div className="form-group">
                                    <label for="" className="form-label"></label>
                                <input type="text" id="" className='input' name='first_name' placeholder='First Name' />
                                <div  className="text-danger fs-6 form-text">{servererror.first_name ? servererror.first_name: ''}</div>
                            </div>

                            <div className="form-group">
                                    <label for="" className="form-label"></label>
                                 <input type="text" id="" className='input' name='last_name' placeholder='Last Name' />
                                 <div   className="text-danger fs-6 form-text">{servererror.last_name ? servererror.last_name: ''}</div>
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email"  className='input'  id="exampleInputEmail1" aria-describedby="emailHelp" name='email' placeholder='Your Email' />
                                    <div   className="text-danger fs-6 form-text">{servererror.email ? servererror.email: ''}</div>
                            </div>

                            {/* <div className="form-group">
                                  <label for="email"><i className="zmdi zmdi-email"></i></label>
                                  <input type="number" className='input'  name='mobile' placeholder='Mobile number' maxlength="10" />
                                   <div   className="text-danger fs-6 form-text">{servererror.mobile_number ? servererror.mobile_number: ''}</div>
                            </div> */}

                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password"  className='input' id="exampleInputPassword" name='password' placeholder='Password'/>
                                     <div   className="text-danger fs-6 form-text">{servererror.password ? servererror.password: ''}</div>
                            </div>
                            <div className="form-group">
                                <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" className='input'  id="exampleInputPassword1" name='cpassword'  placeholder='Confirm your password'  />
                                <div   className="text-danger fs-6 form-text">{servererror.password2 ? servererror.password2: ''}</div>
                            </div>
                          
                            
                            <div className="mb-4">
                            <button className="btn btn-primary">Register</button>
                            </div>
                            <Link to="/login" className='mt-3 fs-5 text-decoration-underline'>I have already account</Link>
                        </form>
                    </div>
                    <div className="signup-image d-md-block d-none">
                        <figure><img src={signup_img}/></figure>
                    </div>
                </div>
            </div>
        </section> 

       
        </div>
    )

}


export default Signup