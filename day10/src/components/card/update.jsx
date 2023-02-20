import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect,useMemo } from 'react';
import { GetToken } from "../../services/localstoreage";
import axios from 'axios'
import avtar from './images/avtar.png'


const UpdateCard = ()=>{
    // const base_url ="http://127.0.0.1:8000/"
    const base_url ="https://api.cardz.visiontrek.in/"

    const [servererror,seterror] = useState({})
    const [isloading,setloading] = useState(false)
    const[success,setSuccess] =  useState(false)
    const[changeaddress,setChangeAddress]=useState({unchange:true})
    //   Country
  const [countryList,setCountrList]=useState([])

  const location_url = base_url+"country/"
   useEffect(()=>{
    async function getAllData(){
        setloading(true)
        try{
          let mydata=await  axios.get(location_url)
          setCountrList(mydata.data)
          setloading(false)
        }
        catch(error){
          console.log(error);
          setloading(false)
        }
      }
      getAllData()
   },[])

   const [selectCountry,setSelectCountry]= useState();

   const countrySelect = (data,index)=>{
   
    return(
        <option value={data.country_name} key={index} >{data.country_name}</option>
    )
    
   }

//    states

const [stateList,setStateList] =useState([])
const [selectState,setSelectState]= useState()


useMemo(()=>{
    async function getAllData(){
        try{
          let mydata=await  axios.get(base_url+"country/state/?country_name="+selectCountry)
          setStateList(mydata.data)
          setloading(false)
        }
        catch(error){
          console.log(error);
        }
      }
      getAllData()
},[selectCountry])

 
   const stateSelecet = (data,index)=>{
    return(
        <option value={data.states} key={index} >{data.states}</option>
    )
        
   }


// //    city
const [cityList,setCityList]=useState([])
const [citytSelect,setSelectCity]=useState()
useEffect(()=>{
    async function getAllData(){
        try{
          let mydata=await  axios.get(base_url+"country/city/?country_name="+selectCountry+"&state_name="+selectState)
          setCityList(mydata.data)
          setloading(false)
        }
        catch(error){
          console.log(error);
        }
      }
      getAllData()
   },[selectState,selectCountry])



   const citySelect = (data,index)=>{
    return(
        <option value={data.city} key={index} >{data.city}</option>
    )
   }
   const id=localStorage.getItem('update_card_id') 
   const {access_token} = GetToken()
   const personal_url = base_url+"personal-detail/"+id
   const [persondata,setpersondata]= useState([])




   const config = {
    headers: {
        "authorization" : `Bearer ${access_token}`,
       
    }
}

   useEffect(()=>{
    async function getData(){
        setloading(true)
        try{
            let mydata=await axios.get(personal_url,config)
            setpersondata(mydata.data)
            setloading(false)
            
        }
        catch(error){
            setloading(false)
        }
      }
      getData()
 
  },[])



     const personal_update_url = base_url+"personal-detail/?card_key="+id

     const [invalidImage, setinvalidImage] = useState(null);
     const [invalidBgImage, setinvalidBgImage] = useState(null);
     let reader = new FileReader();

     const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

     const handleInputChange = (event) => {
        const imageFile = event.target.files[0];
              const imageFilname = event.target.files[0].name;
 
              if (!imageFile) {
               setinvalidImage('Please select image.');
                return false;
              }
          
              if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|jfif|webp)$/)) {
               setinvalidImage('this file type not allow');
                return false;
              }
              reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
 
 //------------- Resize img code ----------------------------------
                 var canvas = document.createElement('canvas');
                 var ctx = canvas.getContext("2d");
                 ctx.drawImage(img, 0, 0);
 
                 var MAX_WIDTH = 437;
                 var MAX_HEIGHT = 437;
                 var width = img.width;
                 var height = img.height;
 
                 if (width > height) {
                   if (width > MAX_WIDTH) {
                     height *= MAX_WIDTH / width;
                     width = MAX_WIDTH;
                   }
                 } else {
                   if (height > MAX_HEIGHT) {
                     width *= MAX_HEIGHT / height;
                     height = MAX_HEIGHT;
                   }
                 }
                 canvas.width = width;
                 canvas.height = height;
                 var ctx = canvas.getContext("2d");
                 ctx.drawImage(img, 0, 0, width, height);
                 ctx.canvas.toBlob((blob) => {
                   const file = new File([blob], imageFilname, {
                       type: 'image/jpeg',
                       lastModified: Date.now()
                   });
                   setuserInfo({
                      ...userInfo,
                      file:file,
                      filepreview:URL.createObjectURL(imageFile),
                 })
                 }, 'image/jpeg', 1);
               setinvalidImage(null)
               };
                img.onerror = () => {
                      setinvalidImage('Invalid image content.');
                  return false;
                };
                //debugger
                img.src = e.target.result;
              };
              reader.readAsDataURL(imageFile);
 
      }; 
    




    // background image


    const [bgimage, setBgPhoto] = useState({
        file:[],
        filepreview:null,
    });

    
    const handleBackImg = (event) => {
        const imageFile = event.target.files[0];
              const imageFilname = event.target.files[0].name;
 
              if (!imageFile) {
                setinvalidBgImage('Please select image.');
                return false;
              }
          
              if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|jfif|webp)$/)) {
                setinvalidBgImage('this file type not allow');
                return false;
              }
              reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
 

                 var canvas = document.createElement('canvas');
                 var ctx = canvas.getContext("2d");
                 ctx.drawImage(img, 0, 0);
 
                 var MAX_WIDTH = 437;
                 var MAX_HEIGHT = 437;
                 var width = img.width;
                 var height = img.height;
 
                 if (width > height) {
                   if (width > MAX_WIDTH) {
                     height *= MAX_WIDTH / width;
                     width = MAX_WIDTH;
                   }
                 } else {
                   if (height > MAX_HEIGHT) {
                     width *= MAX_HEIGHT / height;
                     height = MAX_HEIGHT;
                   }
                 }
                 canvas.width = width;
                 canvas.height = height;
                 var ctx = canvas.getContext("2d");
                 ctx.drawImage(img, 0, 0, width, height);
                 ctx.canvas.toBlob((blob) => {
                   const file = new File([blob], imageFilname, {
                       type: 'image/jpeg',
                       lastModified: Date.now()
                   });
                   setBgPhoto({
                      ...bgimage,
                      file:file,
                      filepreview:URL.createObjectURL(imageFile),
                 })
                 }, 'image/jpeg', 1);
                 setinvalidBgImage(null)
               };
                img.onerror = () => {
                  setinvalidBgImage('Invalid image content.');
                  return false;
                };
                //debugger
                img.src = e.target.result;
              };
              reader.readAsDataURL(imageFile);
 
      }; 

   

   const updatePersonal = async (e)=>{
    e.preventDefault();
    setloading(true)
    const data = new FormData(e.currentTarget);
    

    const actualdata = {
        first_name :data.get('first_name'),
        last_name :data.get('last_name'),
        email :data.get('email'),
        mobile_number: data.get("mobile_number"),
        whats_app: data.get("whats_app"),
        alter_number:data.get("alter"),
        profession: data.get("profession"),
        country: data.get("country"),
        state: data.get("state"),
        city: data.get("city"),
        telephone:data.get("telephone"),
        address:data.get("address"),
        profile_img: userInfo.file,
        background_img:bgimage.file
    }

  //  console.log(actualdata)
    

    const config = {
        headers: {
            "authorization" : `Bearer ${access_token}`,
            'content-type': 'multipart/form-data'
        }
    }

    axios.patch(personal_update_url,actualdata,config).then(response=>{
      setChangeAddress({unchange:true})
        setloading(false)
        setSuccess(true)  
        setpersondata(response.data)

       
    })
    .catch(error=>{
        console.log(error)
        setloading(false)
        seterror(error.response.data)

    })
   } 

 function  address(){
  if(changeaddress.unchange){
    setChangeAddress({change:true})
  }
else{
  setChangeAddress({unchange:true})
}
 }

    return(
        <>


        <ul className="nav nav-pills mb-3 rounded py-2 ms-md-7">
            <li className="nav-item ms-md-15" >
                <button className="nav-link active" >Personal</button>
            </li>
            <li className="nav-item" >
                <Link to="/work-update" className="nav-link"  type="button">Work</Link>
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
                       
                        {/* personal */}
                            <div >
                            <div className="">
                           
                          <h4 className='fs-4 fw-bold'>Update Personal </h4>
                          {success &&   <div className="alert alert-success" role="alert">
                                  <h4 className=' justify-content-center mt-1'>Updated successfully 
                                 
                                  </h4>
                                </div>}
                           <form  onSubmit={(e)=>updatePersonal(e)} className="border pb-md-5 pb-3 rounded">
                            {/* image */}
                            <div className="d-md-flex mt-8">
                                     <div className='ms-md-5 w-md-50'>
                                       {persondata.profile_img ? <img src={"https://api.cardz.visiontrek.in"+persondata.profile_img} width="200px" height="200px" alt="please upload Profile img to fix this problem " className='rounded' />:
                                       <img src={avtar} width="150px" height="150px" alt="" />}
                                     </div>

                                     <div className='w-md-50'>
                                       {persondata.background_img ? <img src={"https://api.cardz.visiontrek.in"+persondata.background_img} className="ms-md-3 h-100 rounded" width="300px"  alt="please upload Profile img to fix this problem" />:
                                       <div className='cover_back rounded' ></div>}
                                     </div>
                                       
                                </div>
                                <div className='d-md-flex ms-md-7 mt-4'>
                                    <div className="ms-md-7">
                                         <label  className="form-label ms-md-1 fs-5">Profile image</label> <br />
                                          <input type="file" accept="image/*" onChange={handleInputChange}/>
                                          {invalidImage && <p className='text-danger'> {invalidImage}</p>}
                                    </div>

                                    <div className="ms-md-10">
                                          <label  className="form-label ms-md-1 fs-5">Background image</label> <br />
                                          <input type="file" accept="image/*" onChange={handleBackImg}/>
                                          {invalidBgImage && <p className='text-danger'> {invalidBgImage}</p>}
                                    </div>
                               
                                </div>
                             {/* name */}
                             <div className="d-md-flex ms-md-7 mt-5">
                                    <div className="d-block">
                                         <label  className="form-label ms-md-8 fs-5">First name</label> <br />
                                         <input type="text" className='ms-md-7' defaultValue={persondata.first_name} placeholder="first name" name='first_name' />
                                         {servererror.first_name ? <div className='error'>{servererror.first_name}</div>: ''}
                                    </div>

                                    <div>
                                      <label  className="form-label ms-md-10 fs-5">Last name</label> <br />
                                      <input type="text" className='ms-md-10 mt-md-0 md-2' defaultValue={persondata.last_name} placeholder="last name" name='last_name' />
                                      {servererror.last_name ? <div className='error'>{servererror.last_name}</div>: ''}
                                    </div>
                                </div>

                                {/* phone */}

                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div>
                                      <label  className="form-label ms-md-8 fs-5">Email address</label> <br />
                                      <input type="email" className='ms-md-7' defaultValue={persondata.email} placeholder="email address" name='email' />
                                      {servererror.email ? <div className='error'>{servererror.email}</div>: ''}
                                    </div>
                                    
                                    <div>
                                       <label  className="form-label ms-md-10 fs-5">Mobile number</label> <br />
                                      <input  type="text" maxLength={14} className='ms-md-10 mt-md-0 mt-2' defaultValue={persondata.mobile_number} placeholder="mobile number" name='mobile_number' />
                                      {servererror.mobile_number ? <div className='error '>{servererror.mobile_number}</div>: ''}
                                    </div>
                                </div>

                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div>
                                    <label  className="form-label ms-md-8 fs-5">WhatsApp number</label> <br />
                                    <input  type="text" maxLength={14} className='ms-md-7' defaultValue={persondata.whats_app} placeholder="WhatsApp number" name='whats_app' />
                                      {servererror.whats_app ? <div className='text-danger md:absolute  inline mt-1 mb-2'>{servererror.whats_app}</div>: ''}
                                    </div>
                  
                                       <div>
                                        <label  className="form-label ms-md-10 fs-5">Alternative number</label> <br />
                                         <input  type="text" maxLength={14} className='ms-md-10 mt-md-0 mt-2' defaultValue={persondata.alter_number} placeholder="Alternative number" name='alter' />
                                          {servererror.alter_number ? <div className='error'>{servererror.alter_number}</div>: ''}
                                       </div>
                                </div>

                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div>
                                        <label  className="form-label ms-md-8 fs-5">Telephone number</label> <br />
                                        <input type="text" maxLength={14} className='ms-md-7' defaultValue={persondata.telephone} placeholder="Telephone number" name='telephone' />
                                                                      
                                    </div>
                                    <div>
                                        <label  className="form-label ms-md-10 fs-5">Profession</label> <br />
                                         <input type="text" className='ms-md-10 mt-md-0 mt-2' defaultValue={persondata.profession} placeholder="Profession" name='profession' />
                                         {servererror.profession ? <div className='error'>{servererror.profession}</div>: ''}   
                                    </div>
                                </div>

                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div>
                                    <label  className="form-label ms-md-7 fs-5">Address</label> <br />
                                    <input type="text" className='ms-md-7' defaultValue={persondata.address} placeholder="Address" name='address' />
                                    </div>
                                    <div>
                                    <label  className="form-label ms-md-10 fs-5">Country</label> <span className='float-end text-primary text-decoration-underline change-address' onClick={address}>  {changeaddress.change ?"cancel ?":"change location ?"}</span> <br />
                                    {changeaddress.change ? 
                                        <>
                                        <select id="countries" name='country' className="ms-md-10 mt-md-0 mt-2"
                                        value={selectCountry} onChange={e=>setSelectCountry(e.target.value)}
                                        >
                                        <option value="" className='p-input'>--Select Country--</option>
                                        {countryList.map(countrySelect)}
                                        </select> 
                                      {servererror.country ? <div className='error ms-md-10 mt-md-0 mt-2'>{servererror.country}</div>: ''}
                                        </>

                                        :
                                        <>
                                    <input type="text" className='d-none' defaultValue={persondata.country} placeholder="Country " name='country'  />
                                        <input type="text" className='ms-md-10 mt-md-0 mt-2' defaultValue={persondata.country} placeholder="Country " disabled />
                                        </>
                                    }
                                    
                                    </div>
                                </div>

                                <div className="d-md-flex ms-md-7 mt-5">
                                    <div>
                                       <label  className="form-label ms-md-7 fs-5">State</label> <br />
                                       {changeaddress.change ? <>
                                        {selectCountry ?      <select id="states" name='state' className="p-input ms-md-7"
                                        value={selectState} onChange={e=>setSelectState(e.target.value)}
                                        >
                                            <option value=""  className='p-input' selected>-- select state--</option>
                                          {  stateList.map(stateSelecet)}
                                        </select> : 
                                            <select  id="states" className="p-input ms-md-7"
                                        value={selectState} onChange={e=>setSelectState(e.target.value)}
                                        >
                                          <option value=""  selected>select State(select country first)</option>
                                        </select>}
                                        {servererror.state ? <div className='error ms-md-7'>{servererror.state}</div>: ''}
                                       </>:
                                       <>
                                       <input type="text" className='d-none' defaultValue={persondata.state} placeholder="State" name='state'  />

                                       <input type="text" className='ms-md-7' defaultValue={persondata.state} placeholder="State"  disabled />

                                       </>

                                       }
                                     
                                    </div>

                                    <div>
                                        <label  className="form-label ms-md-10 fs-5">City</label> <br />
                                        {changeaddress.change ? <>
                                          {selectState? 
                                  <select id="states" name='city' className='p-input ms-md-10 mt-md-0 mt-2'
                                  value={citytSelect} onChange={e=>setSelectCity(e.target.value)}
                                  >                       
                                  <option value="" className='p-input'  selected >-- select city --</option>
                                  {cityList.map(citySelect)}
                                  </select>:
                                  <select id="states" className="p-input ms-md-10 mt-md-0 mt-2"
                                  value={citytSelect} onChange={e=>setSelectCity(e.target.value)}
                                  >                       
                                  <option disabled className='p-input' selected>--Select city (please select state first)--</option>
                           
                                  </select>} 
                                        
                                          {servererror.city ? <div className='error ms-md-10 mt-md-0 mt-2'>{servererror.city}</div>: ''}
                                        </>:
                                        <>
                                         <input type="text" className='d-none' defaultValue={persondata.city} placeholder="City" name='city'  />

                                         <input type="text" className='ms-md-10 mt-md-0 mt-2' defaultValue={persondata.city} placeholder="City"  disabled />
                                        </>
                                      }
                                    </div>
                                </div>

                                <button className='btn btn-primary btn-sm ms-md-10 mt-3'>Update</button>

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
export default UpdateCard; 