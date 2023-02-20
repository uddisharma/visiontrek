import React from 'react'
import { useState } from 'react';
import { GetToken } from "../../services/localstoreage";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Socilaupdate() {
    // const base_url ="http://127.0.0.1:8000/"
    const base_url ="https://api.cardz.visiontrek.in/"

    const [servererror,seterror] = useState({})
    const [isloading,setloading] = useState(false)
    const [counter,setCounter] = useState(0)
    

   const id=localStorage.getItem('update_card_id') 
   const {access_token} = GetToken()

   const config = {
    headers: {
        "authorization" : `Bearer ${access_token}`,
       
    }
}

  const social_url= base_url+"social-link/"+id
 
  const [SocialData,setSocialData]=useState([])
  const[success,setSuccess] =  useState(false)

  useEffect(()=>{
    const socialGetting= async ()=>{
        setloading(true)
            try{
                let mydata=await axios.get(social_url,config)
                setSocialData(mydata.data)
                setloading(false)
            }
            catch(error){
                setloading(false)
                seterror(error)
            }
      }
      socialGetting()
  },[counter])




  const handleSocilUpdate = async (e)=>{
    e.preventDefault();
    setloading(true);
    setCounter(counter+1)
    const data = new FormData(e.currentTarget);
    const actualdata = {
        facebook :data.get('facebook'),
        instagram :data.get('instagram'),
        twitter :data.get('twitter'),
        youtube: data.get('youtube')
    }
    
         axios.patch(social_url,actualdata,config).then(response=>{
            setloading(false);
            setSocialData(response.data)
            setSuccess(true)
           
        })                        
        .catch(error=>{
            console.log(error)
            seterror(error.response.data)
            setloading(false);           
        }) 
  }

  return (
    <>
     <ul className="nav nav-pills mb-3 rounded py-2 ms-md-7">
            <li className="nav-item ms-md-15" >
                <Link to="/update" className="nav-link" >Personal</Link>
            </li>
            <li className="nav-item" >
                 <Link to="/work-update" className="nav-link"  type="button" >Work</Link>
            </li>
            <li className="nav-item" >
                <Link className="nav-link " to="/service-update" >Services</Link>
            </li>
            <li className="nav-item">
                <button className="nav-link active"  type="button"  >Links</button>
            </li>
        </ul>

         {isloading ? 
         <div className="d-flex justify-content-center update_loader mt-7 spinner-border p-2" role="status">
         <span className="visually-hidden">Loading...</span>
         </div>
         :
         <div className="container mb-md-5">
         <div className="row">
             <div className="col">
                 <div >
                     {/* socil update */}
                     <div className="d-block" >
                        <h4 className='fs-4 fw-bold'>Social link</h4>
                        {success &&   <div class="alert alert-success" role="alert">
                                  <h4 className='justify-content-center mt-1'>Updated successfully
                            
                                  </h4>
                                </div>}
                        <form className='border pb-3' onSubmit={(e)=>{handleSocilUpdate(e)}}>

                              <div className="d-md-flex ms-md-7 mt-5">
                                <div className="d-block">
                                        <label  className="form-label ms-md-8 fs-5">Facebook</label> <br />
                                        <input type="text" className='ms-md-7' defaultValue={SocialData.facebook} placeholder="facebook" name='facebook' />
                                        {servererror.facebook ? <p className='error ms-md-7'>{servererror.facebook}</p>: ''}
                                </div>

                                <div>
                                    <label  className="form-label ms-md-10 fs-5">Instagram</label> <br />
                                    <input type="text" className='ms-md-10 mt-md-0 md-2' defaultValue={SocialData.instagram} placeholder="instagram" name='instagram' />
                                    {servererror.instagram ? <p className='error ms-md-7'>{servererror.instagram}</p>: ''}
                                </div>
                                </div>        
{/*  */}
                                <div className="d-md-flex ms-md-7 mt-md-5 mt-2">
                                <div className="d-block">
                                        <label  className="form-label ms-md-8 fs-5">Twitter</label> <br />
                                        <input type="text" className='ms-md-7' defaultValue={SocialData.twitter} placeholder="twitter" name='twitter' />
                                        {servererror.twitter ? <p className='error ms-md-7'>{servererror.twitter}</p>: ''}
                                </div>

                                <div>
                                    <label  className="form-label ms-md-10 fs-5">Youtube</label> <br />
                                    <input type="text" className='ms-md-10 mt-md-0 md-2' defaultValue={SocialData.youtube} placeholder="youtube" name='youtube' />
                                    {servererror.youtube ? <p className='error ms-md-7'>{servererror.youtube}</p>: ''}
                                </div>
                                </div>          

                         <div className="d-md-flex ms-md-7 my-5">
                             <button className='btn btn-sm btn-primary ms-md-7 mb-3' >update</button>
                         </div>
                        </form>
                     </div>
                    
                 </div>
             </div>
         </div>
     </div>
         }
    </>
  )
}
