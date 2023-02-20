import React from 'react';
import { useState,useMemo } from 'react';
import { GetToken } from "../../services/localstoreage";
import axios from 'axios'
import { Link } from 'react-router-dom';


const UpdateWork = ()=>{
    // const base_url ="http://38.242.219.47:8005/"
    const base_url ="https://api.cardz.visiontrek.in/"

    const [servererror,seterror] = useState({})
    const [isloading,setloading] = useState(false)
    const [counter,setCounter] = useState(0)
    const[success,setSuccess] =  useState(false)
    

   const id=localStorage.getItem('update_card_id') 
   const {access_token} = GetToken()

   const config = {
    headers: {
        "authorization" : `Bearer ${access_token}`,
       
    }
}

  const work_url= base_url+"create-work-detail/?id="+id
 
  const [workData,setWorkdata]=useState([])


  useMemo(()=>{
    const WorkGetting= async ()=>{
        setloading(true)
    
            try{
                let mydata=await axios.get(work_url,config)
                setWorkdata(mydata.data)
                setloading(false)
            }
            catch(error){
                setloading(false)
                seterror(error)
            }
      }
      WorkGetting()
  },[counter])
    

  const handleCompanySubmit = async (e)=>{
    e.preventDefault();
    setloading(true);
    setCounter(counter+1)
    const data = new FormData(e.currentTarget);
    const actualdata = {
        company_name :data.get('company_name'),
        business_title :data.get('business_title'),
        address :data.get('address'),
        about_us: data.get('about_us'),
        job_position:data.get('job_position'),
        link: data.get('link')
    }
    
         axios.put(work_url,actualdata,config).then(response=>{
            setloading(false);
            setWorkdata(response.data)
            setSuccess(true)
        })                        
        .catch(error=>{
            console.log(error)
            seterror(error.response.data)
            setloading(false);           
        })    

   }


    return(
        <>

        <ul className="nav nav-pills mb-3 rounded py-2 ms-md-7">
            <li className="nav-item ms-md-15" >
                <Link to="/update" className="nav-link" >Personal</Link>
            </li>
            <li className="nav-item" >
                <button className="nav-link active"  type="button">Work</button>
            </li>
            <li className="nav-item" >
                <Link to="/service-update" className="nav-link" >Services</Link>
            </li>
            <li className="nav-item">
               <Link to="/social-update" className="nav-link">Links</Link>
            </li>
        </ul>

         {isloading ? 
         <div className="d-flex justify-content-center update_loader mt-7 spinner-border p-2" role="status">
         <span className="visually-hidden">Loading...</span>
         </div>
         :
         

         <div className="container">
                <div className="row">
                    <div className="col">
                        <div >
                            {/* work update */}
                            <div className="d-block" >
                               <h4 className='fs-4 fw-bold'>Work update</h4>
                               {success &&   <div class="alert alert-success" role="alert">
                                  <h4 className=' justify-content-center mt-1'>Updated successfully
                                
                                  </h4>
                                </div>}
                             
                               <form className='border pb-3' onSubmit={(e)=>{handleCompanySubmit(e)}}>
                                  <div className="d-md-flex ms-md-7 mt-5">
                                  <div className="d-block">
                                    <label  className="form-label ms-md-8 fs-5">Company name</label> <br />
                                    <input type="text" className='ms-md-7' defaultValue={workData.company_name} placeholder="company name" name='company_name' />
                                    {servererror.company_name ? <p className='error'>{servererror.company_name}</p>: ''}
                                 </div>

                                 <div>
                                      <label  className="form-label ms-md-10 fs-5">Category</label> <br />
                                      <input type="text" className='ms-md-10 mt-md-0 md-2' defaultValue={workData.business_title} placeholder="Category" name='business_title' />
                                      {servererror.business_title ? <p className='error'>{servererror.business_title}</p>: ''}
                                    </div>
                                  </div>

                                  <div className="d-md-flex ms-md-7 mt-5">
                                    <div className="d-block">
                                         <label  className="form-label ms-md-8 fs-5">Bussiness Location</label> <br />
                                         <input type="text" className='ms-md-7' defaultValue={workData.address} placeholder="Bussiness location" name='address' />
                                         {servererror.address ? <p className='text-danger md:absolute  inline -2'>{servererror.address}</p>: ''}
                                    </div>

                                    <div>
                                      <label  className="form-label ms-md-10 fs-5">Link/website</label> <br />
                                      <input type="text" className='ms-md-10 mt-md-0 md-2' defaultValue={workData.link} placeholder="Link" name='link' />
                                      {servererror.link ? <p className='error'>{servererror.link}</p>: ''}
                                    </div>
                                </div>

                                {/*  */}
                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div className="d-block">
                                         <label  className="form-label ms-md-8 fs-5">Job Position</label> <br />
                                         <input type="text" className='ms-md-7' defaultValue={workData.job_position} placeholder="jobpostion" name='job_position' />
                                         {servererror.job_position ? <p className='error'>{servererror.job_position}</p>: ''}
                                    </div>
                                </div>
                                {/*  */}
                                <div className="d-md-flex ms-md-7 mt-5">
                                    <textarea type="text" id="floating_outlined11" name='about_us' className="ms-md-7 p-text p-2" rows="6" defaultValue={workData.about_us} />
                                    {servererror.about_us ? <p className='error'>{servererror.about_us}</p>: ''}
                                </div>


                                <div className="d-md-flex ms-md-7 mt-5">
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
export default UpdateWork;