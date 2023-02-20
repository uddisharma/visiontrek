import './css/personal.css'
import {Helmet} from "react-helmet";
import { useEffect, useState,useMemo } from 'react';
import loader from '../images/loader.gif'
import { GetToken } from "../../services/localstoreage";
import  axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import React from 'react'
import { NavLink } from "react-router-dom";
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import { createMedia } from "@artsy/fresnel"

// const useStyle = makeStyles(theme => ({
//     field:{
//         width: 350,
//         [theme.breakpoints.down("xs")]: {
//           marginTop: theme.spacing(1),
         
//         },
//         [theme.breakpoints.between("sm", "md")]: {
//           marginTop: theme.spacing(3),
//           backgroundColor: "blue"
//         },
//         "@media (min-width: 1280px)": {
//           marginLeft: theme.spacing(45),
         
         
//         }
        
//     }
// }));


const PersonalDetails = ()=>{
    

    // const [preview,setPreview]= useState(null)
    
    const[bgimg,setBgimg]=useState(null)
    const[bg,setBg]=useState("")
    // const [mobile,setMobile]=useState("")
    // const [alter,setAlter]=useState("")
    // const [whats,setWhats]=useState("")
     
    const base_url ="https://api.cardz.visiontrek.in/"
    // const base_url ="http://127.0.0.1:8000/"


          // background image


    const [bgimage, setBgPhoto] = useState({
        file:[],
        filepreview:null,
    });

    const [invalidImage, setinvalidImage] = useState(null);
   
     let reader = new FileReader();

    const handleBackImg = (event) => {
        const imageFile = event.target.files[0];
              const imageFilname = event.target.files[0].name;
 
              if (!imageFile) {
               setinvalidImage('Please select image.');
                return false;
              }
          
              if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|jfif|webp)$/)) {
               setinvalidImage('Please select valid image JPG,JPEG,PNG');
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


    //   profile image handle

    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

     const handleProfileChange = (event) => {
        const imageFile = event.target.files[0];
              const imageFilname = event.target.files[0].name;
 
              if (!imageFile) {
               setinvalidImage('Please select image.');
                return false;
              }
          
              if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif|jfif|webp)$/)) {
               setinvalidImage('Please select valid image JPG,JPEG,PNG');
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
    


    //   const handlechangebgimage=(e)=>{
    //     setBg(e.target.files[0])
    //     setBgimg(bg)
    //     console.log(e.target.files[0])
    //     console.log("coming")
    //     console.log(bgimg)
    //   }

  

    const userData = useSelector(state => state.user)

    const [detail,setDetail]=useState({
        person:true
    })
    const navigate = useNavigate()
    const [isloading,setloading] = useState(false)


    const delete_card = async (e)=>{
          try{
            await axios.delete(base_url+"delete-card/"+e,config)
            console.log(e)
            
          }
          catch(error){
           console.log("not delete")
          }
        }

        function Cancel()
        {
            delete_card(localStorage.getItem("created_id"))
            localStorage.removeItem("created_id")
            navigate('/user-card/')

        }

    function Box_change(view){
        if(view === "company"){
           setDetail({"company":true})
        }
        else if(view === "person"){
            delete_card(localStorage.getItem("created_id"))
            setDetail({"person":true})
            localStorage.removeItem("created_id")
         }
         else if(view === "service"){
            setDetail({"service":true})
         }
         else if(view === "social"){
            setDetail({"social":true})
         }
         
         window.scrollTo(0, 0)
    }

    const [inputList, setinputList]= useState([{}]);

    const handleinputchange=(e, index)=>{
        const {name, value}= e.target;
        const list= [...inputList];
        list[index][name]= value;
        setinputList(list);
    
      }

    const handleremove= index=>{
        const list=[...inputList];
        list.splice(index,1);
        setinputList(list);
      }

    const handleaddclick=()=>{ 
        setinputList([...inputList, { SubTitle:''}]);
      }

      const [servererror,seterror] = useState({})
      const {access_token} = GetToken()
 






    const url=base_url+"personal-detail/"

    const handlePersonalSubmit = async (e)=>{
        e.preventDefault();
        setloading(true);
        setDetail({"person":false})
        const data = new FormData(e.currentTarget);
        
        const actualdata = {
            first_name :data.get('first_name'),
            last_name :data.get('last_name'),
            email :data.get('email'),
            mobile_number: data.get("mobile"),
            whats_app: data.get("whatapp"),
            alter_number:data.get("alter_number"),
            profession: data.get("profession"),
            country: data.get("country"),
            state: data.get("state"),
            city: data.get("city"),
            profile_img: userInfo.file,
            background_img:bgimage.file,
            telephone:data.get("telephone"),
            address:data.get("address")
        }
     
        const config = {
            headers: {
                "authorization" : `Bearer ${access_token}`,
                'content-type': 'multipart/form-data'
            }
        }

        console.log(actualdata)
        
             axios.post(url,actualdata,config).then(response=>{
                setloading(false);
                console.log(response.data)
                localStorage.setItem("created_id",response.data.id)
                setDetail({"company":true})
            })                        
            .catch(error=>{
                seterror(error.response.data)
                setDetail({"person":true})
                setloading(false);
                
            })    
          
    }

    // work handle
      
      const c_url=base_url+"create-work-detail/"

       const handleCompanySubmit = async (e)=>{
        e.preventDefault();
        setloading(true);
        const data = new FormData(e.currentTarget);
        const actualdata = {
            company_name :data.get('company_name'),
            business_title :data.get('business_title'),
            address :data.get('address'),
            about_us: data.get('about_us'),
            job_position:data.get('jobpostion'),
            link: data.get('link')
        }

        const config = {
            headers: {
                "authorization" : `Bearer ${access_token}`,
              
            }
        }
        
             axios.post(c_url,actualdata,config).then(response=>{
                setloading(false);
                setDetail({"service":true})
            })                        
            .catch(error=>{
                seterror(error.response.data)
                setloading(false);
                console.log(error.response.data)
                
            })    

       }


    //    service api calling

    
    const config = {
        headers: {
            "authorization" : `Bearer ${access_token}`,
          
        }
    }
    const s_url=base_url+"create-service-detail/"
    const handleServiceSubmit = async (e)=>{
     e.preventDefault();
     setloading(true);
     const data = new FormData(e.currentTarget);
     const actualdata = {
        service_title :data.get('title'),
        
     }
     let arr=[]
    //   arr.push(data.get('sub_title'))
      if(inputList.length > 0)
      {
        for (let i = 0; i < inputList.length; i++) {
            arr.push(data.get(i))
            actualdata.sub_titles = arr;
           }
      }
    //   else{
    //     actualdata.sub_titles = arr;
    //   }
     
          axios.post(s_url,actualdata,config).then(response=>{
             setloading(false);
             setDetail({"social":true})
         })                        
         .catch(error=>{
             seterror(error.response.data)
             setloading(false);
         })    
    }

    // social

    const social_url=base_url+"social-link/"
    const handleSocailSubmit = async (e)=>{
     e.preventDefault();
     setloading(true);
     const data = new FormData(e.currentTarget);
     const actualdata = {
        facebook :data.get('facebook'),
        instagram :data.get('instagram'),
        twitter :data.get('twitter'),
        youtube :data.get('youtube'),
     }
     
          axios.post(social_url,actualdata,config).then(response=>{
             setloading(false);
             navigate('/user-card/')
             
         })                        
         .catch(error=>{
             seterror(error.response.data)
             setloading(false);
             console.log(error.response.data)
             
         })    
    
    }

//   Country
  const [countryList,setCountrList]=useState([])

  const location_url = base_url+"country/"
   useEffect(()=>{
    async function getAllData(){
        try{
          let mydata=await  axios.get(location_url)
          setCountrList(mydata.data)
          setloading(false)
        }
        catch(error){
          console.log(error);
        }
      }
      getAllData()
   },[])

   const [selectCountry,setSelectCountry]= useState("India");

   const countrySelect = (data,index)=>{
    if(data.country_name==="India"){
        
        return(
            <option value={data.country_name} key={index} selected>{data.country_name}</option>
        )
    }
    else{
    return(
        <option value={data.country_name} key={index} >{data.country_name}</option>
    )
    }
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



    return(
        <>
           <Helmet>
                <title>Creating Digital card</title>
            </Helmet>
        <div className="main">

        <div className="container">
    
            <div className="row">
                <div className="col">


                <section className="step-wizard">
                    <ul className="step-wizard-list">
                        
                        <li className={detail.person ? "step-wizard-item current-item":"step-wizard-item "}>
                            <span className="progress-count">1</span>
                            <span className="progress-label">Personal Info</span>
                        </li>
                        <li className={detail.company ?"step-wizard-item current-item":"step-wizard-item "}>
                            <span className="progress-count">2</span>
                            <span className="progress-label">Business details</span>
                        </li>
                        <li className={detail.service ?"step-wizard-item current-item":"step-wizard-item "}>
                            <span className="progress-count">3</span>
                            <span className="progress-label">Services/ Products</span>
                        </li>
                     
                        <li className={detail.social ?"step-wizard-item current-item":"step-wizard-item "}>
                            <span className="progress-count">4</span>
                            <span className="progress-label">Social Links</span>
                        </li>
                    </ul>
                </section>
                </div>
            </div>
            <div className="row mt-md-5 mt-5">
                <div className="col">
                    <form onSubmit={(e)=>handlePersonalSubmit(e)} > 
                    <div className={detail.person ? 'borderr mt-5':'borderr d-none '}>
                        <h1 className='bordertext'>Personal Details</h1>
                        <div className='personal-form'>
                            
                            <div className="d-md-flex">
                                <div className="p-box ">
                               
                                    <TextField id="outlined-basic" type="text" label="First name" name='first_name' className="p-input" variant="outlined" size="small" defaultValue={userData.first_name}  />

                                    
                                    {servererror.first_name ? <div className='error'>{servererror.first_name}</div>: ''}
                                </div>
                            
                                <div className="p-box2 my-md-none my-md-0 my-md-0 my-3">
                                
                                    <TextField id="outlined-basic" type="text" label="Last name" name='last_name' className="p-input" variant="outlined" size="small" defaultValue={userData.last_name}  />
                                    {servererror.last_name ? <div className='error'>{servererror.last_name}</div>: ''}
                                </div>
                            </div>

                           <div className="d-md-flex my-2">
                            
                            <div className="p-box my-md-none my-3">
                                
                                    <TextField id="outlined-basic" type="email" label="Email" name='email' className="p-input mt-1" variant="outlined" size="small" defaultValue={userData.email} />
                                    {servererror.email ? <div className='error'>{servererror.email}</div>: ''}
                                </div>

                                <div className="p-box2 my-md-none my-3">
                                  
                                       {/* <PhoneInput
                                       
                                        required= {true}
                                        autoFocus= {true}
                                        enableSearch ={true}
                                        inputStyle= {{
                                            width:"350px",
                                            height:"45px"
                                        }}
                                       placeholder="Mobile number"
                                       value={mobile}
                                       onChange={phone => setMobile( phone ) }

                                       
                                       
                                    /> */}
                                    <TextField  id="outlined-basic" type="text" label="Mobile number" name='mobile' className="p-input" variant="outlined" size="small" defaultValue={userData.mobile_number}  />
                                    {servererror.mobile_number ? <div className='error '>{servererror.mobile_number}</div>: ''}
                                </div>
                           </div>

                           <div className="d-md-flex my-3">
                            <div className=" p-box my-md-none my-2">
                         
                                      {/* <PhoneInput
                                        required= {false}
                                        autoFocus= {true}
                                        enableSearch ={true}
                                        inputStyle= {{
                                            width:"350px",
                                            height:"45px"
                                        }}
                                      placeholder="what's number (optional)"
                                      value={whats}
                                       onChange={phone => setWhats( phone )}
                                    />                                 */}
                                
                                    <TextField id="outlined-basic" label="Whats app No (optional)" name='whatapp' className="p-input" variant="outlined" size="small"  />
                                    
                                    {servererror.whats_app ? <div className='text-danger md:absolute  inline mt-1 mb-2'>{servererror.whats_app}</div>: ''}
                                </div>

                                <div className=" p-box2 my-md-none my-2 ">
{/*                                    
                                     <PhoneInput
                                    
                                        required= {false}
                                        autoFocus= {true}
                                        enableSearch ={true}
                                        inputStyle= {{
                                            width:"350px",
                                            height:"45px"
                                        }}
                                        placeholder="Alternative number (optional)"
                                        value={alter}
                                       onChange={phone => setAlter( phone )}
                                        
                                    />  */}
                                    
                                    <TextField id="outlined-basic" label="Alternative number (optional)" name='alter_number' className="p-input"variant="outlined" size="small"  />
                                    {servererror.alter_number ? <div className='error'>{servererror.alter_number}</div>: ''}
                                </div>
                           </div>
                           <div className="d-md-flex my-4">
                                 <div className=" p-box my-md-none my-2">
                                    {/* <input type="text" id="Designation_or_profession"  name ="profession" className=" p-input" required />
                                    <label for="Designation_or_profession" className="person-label">Profession</label> */}
                                       <TextField id="outlined-basic" type="text" label="Profession" name='profession' className="p-input" variant="outlined" size="small"  />
                                    {servererror.profession ? <div className='error'>{servererror.profession}</div>: ''}
                                </div>

                                <div className="p-box2 my-md-none my-2">

                                <select id="countries" name='country' className="p-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectCountry} onChange={e=>setSelectCountry(e.target.value)}
                                >
                                <option value="" className='p-input'>--Select Country--</option>
                                {countryList.map(countrySelect)}
                                </select>                               
                                    {/* <input type="text" id="country" name='country' className=" p-input" required  /> */}
                                    {/* <label for="country" className="">Country</label> */}
                                     {/* <button className='get-location' type='button'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue"><circle cx="12" cy="12" r="4"></circle><path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"></path></svg></button> */}
                                    {servererror.country ? <div className='error'>{servererror.country}</div>: ''}
                                </div>

                           </div>

                           <div className="d-md-flex mt-2">
                                 <div className="relative p-box my-md-none my-2">
                                  
                              

                                {selectCountry ?      <select id="states" name='state' className="p-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectState} onChange={e=>setSelectState(e.target.value)}
                                >
                                     <option value=""  className='p-input' selected>-- select state--</option>
                                  {  stateList.map(stateSelecet)}
                                </select> : 
                                     <select  id="states" className="p-input"
                                value={selectState} onChange={e=>setSelectState(e.target.value)}
                                >
                                  <option value=""  selected>--please select country--</option>
                                </select>}
                                
                                  
                                    {/* <input type="text" id="state" name='state' className=" p-input"  required />
                                    <label for="state" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-5 left-1">State</label> */}
                                    {servererror.state ? <div className='error'>{servererror.state}</div>: ''}
                                </div>

                                <div className="city-select">
                                    
                               
                                {selectState? 
                                  <select id="states" name='city' className='p-input'
                                  value={citytSelect} onChange={e=>setSelectCity(e.target.value)}
                                  >                       
                                  <option value="" className='p-input'  selected >-- select city --</option>
                                  {cityList.map(citySelect)}
                                  </select>:
                                  <select id="states" className="p-input"
                                  value={citytSelect} onChange={e=>setSelectCity(e.target.value)}
                                  >                       
                                  <option disabled className='p-input' selected>--Select city (please select state first)--</option>
                           
                                  </select>} 
                                    {/* <input type="text" id="city" name='city' className=" p-input" required  />
                                    <label for="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 md:top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">City</label> */}
                                    {servererror.city ? <div className='error mobile'>{servererror.city}</div>: ''}
                                </div>
                                

                           </div>


                           <div className="d-md-flex my-2">
                            <div className="p-box my-md-none my-2">
                                    <TextField id="outlined-basic" type="text" label="Address/Lankmark/HouseNo/Village" name='address' className="p-input" variant="outlined" size="small" />
                                </div>

                                <div className="p-box2 my-md-none my-3">
                                    <TextField id="outlined-basic" type="text" label="Telephone Number(optional)" name='telephone' className="p-input" variant="outlined" size="small"   />
                                    {servererror.telephone ? <div className='error mobile'>{servererror.telephone}</div>: ''}
                                </div>
                           </div>

                           <div className="d-md-flex mb-3">
                                 <div className=" p-box my-md-none my-2">
                                 <label for="photo" className="">Profile Picture(optional)</label> <br/>

                                 <input type="file"  accept="image/png, image/jpeg" onChange={handleProfileChange} id="photo" name='profile' className=" p-input"  />
                                 {invalidImage && <p className='text-danger'> {invalidImage}</p>}
                               
                                    
                                  
                                   
                                </div>

                                <div className=" p-box2 my-md-none my-2">
                                    <label for="photo" className="">Background/Cover Picture(optional)</label> <br/>
                                    <input type="file"  accept="image/png, image/jpeg" id="photo1" onChange={handleBackImg} name='profile' className="p-input"  />
                                </div>
                               
                           </div>


                           
                           <div className="d-md-flex my-3">
                                 <div className=" p-box my-md-none my-2">
                                 <button className='btn-primary btn btn-sm btn-purple'>Next</button>
                                 < NavLink to="/user-card"  className='btn-warning btn btn-sm btn-purple ms-2 mt-md-0 mt-2'> Cancel</NavLink>
                                </div>
                           </div>
                        </div>
                    </div>
                    </form>

                    {/* company details */}

                    {isloading && <img src={loader} className="md:ml-56" alt="" />
                     }
                     <form onSubmit={(e)=>handleCompanySubmit(e)}>
                     <div className={detail.company ? 'borderr mt-5':'borderr mt-5 d-none '}>
                        <h1 className='bordertext1'>Business Details</h1>
                        <div className='personal-form'>
                            
                            <div className="d-md-flex my-3">
                                <div className="relative p-box my-md-none my-2">
                                <TextField id="outlined-basic" type="text" label="Business name" name='company_name' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="text" id="floating_outlined7" name='company_name' className=" p-input"  />
                                    <label for="floating_outlined7" className="person-label">Company name</label> */}
                                    {servererror.company_name ? <p className='error'>{servererror.company_name}</p>: ''}
                                    <div>
                                </div>                        
                                </div>
                               
                            
                                <div className="relative p-box my-md-none my-2">
                                   <TextField id="outlined-basic" type="text" label="Business title/Category" name='business_title' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="text" id="floating_outlined8" name='business_title' className=" p-input"  />
                                    <label for="floating_outlined8" className="person-label">Business Title</label> */}
                                    {servererror.business_title ? <p className='error'>{servererror.business_title}</p>: ''}
                                
                                </div>

                            </div>

                           <div className="d-md-flex my-2">
                            
                            <div className="relative p-box my-md-none my-2">
                                   <TextField id="outlined-basic" type="text" label="Business location" name='address' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="text" id="floating_outlined9" name='address' className=" p-input"  />
                                    <label for="floating_outlined9" className="person-label">Business Address</label> */}
                                    {servererror.address ? <p className='text-danger md:absolute  inline -2'>{servererror.address}</p>: ''}
                               
                                </div>

                                <div className="relative p-box my-md-none my-2">
                                    <TextField id="outlined-basic" type="text" label="Business website link (option)" name='link' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="text" id="floating_outlined10" name='link'   />
                                    <label for="floating_outlined10" className="person-label">Link(option)</label> */}
                                    {servererror.link ? <p className='error'>{servererror.link}</p>: ''}
                                </div>


                           </div>

                           <div className="d-md-flex my-2">
                            
                               <div className="relative p-box my-md-none mt-3">
                                    <TextField id="outlined-basic" type="text" label="Designation" name='jobpostion' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="text" id="jobpostion" name='jobpostion'  />
                                    <label for="jobpostion" className="person-label">JobPosition</label> */}
                                    {servererror.job_position ? <p className='error'>{servererror.job_position}</p>: ''}
                                </div>


                           </div>

                           

                           <div className="d-md-flex my-3">
                           <div className=" p-box my-md-none my-2">
                           {/* <label for="floating_outlined11" className="">About us</label> */}
                                <textarea type="text" id="floating_outlined11" name='about_us' placeholder="About your business" className=" p-text"  />
                               
                                {servererror.about_us ? <p className='error'>{servererror.about_us}</p>: ''}
                           
                            </div>

                           </div>
                           <div className="d-md-flex my-3">
                           <div className="relative p-box my-md-none my-2">
                           </div>

                           <div className="relative my-md-none ">
                           <button className='btn btn-success btn-sm' >Next</button>
                           <button  onClick={() => Box_change("person")} className='btn btn-sm btn-secondary mx-3' type='button'>Previous</button>
                           <button  onClick={() => Box_change("service")} className='btn btn-sm btn-warning' type='button'>Skip</button>
                           <button onClick={Cancel}  className='btn btn-sm btn-danger ms-md-2 mt-md-0 mt-2' type='button'>Cancel</button>                          
                            </div>                      
                           </div>
                           
                        </div>
                    </div>
                     </form>
    
                    {/* services and products */}
                    <form onSubmit={(e)=>handleServiceSubmit(e)}>
                    <div className={detail.service ? 'borderr mt-5':'borderr mt-5 d-none '}>
                        <h1 className='bordertext2'>Service you provide</h1>
                        <div className='personal-form'>
                            
                            <div className="d-md-flex my-3">
                                <div className="relative p-box my-md-none my-2">
                                <TextField id="outlined-basic" type="text" label="Category title" name='title' className="p-text" variant="outlined" size="small"   />
                                    {servererror.service_title ? <span className='error'>{servererror.service_title}</span>: ''}
                                
                                </div>
                            </div>

                         
                         <div className=' services'>

                            <div className='ms-md-6'>
                            { 
            inputList.map( (x,i)=>{
              return(
                    <>  
                        <div className="d-md-flex my-3">
                          <div className="my-md-none my-2">
                                <textarea type="text" id={i} name={i} className="service-textarea border border-secondary" cols="30" rows="2"  placeholder='Service/Product' onChange={ e=>handleinputchange(e,i) } />
                                {/* <label for={i} className="">Sub Title</label> placeholder={'sub title '+i} */}
                                {servererror.sub_titles ? <div className='error'>please fill all the subtitles field</div>: ''}
                        
                          </div>
                        </div>
                    </>
              );
             } )} 
                            </div>

                            <div className="add-remove-btn float-end me-md-12">
                            <button type="button" className="btn btn-sm btn-danger mx-3" onClick={handleremove} >Remove</button>
                            <button  className="btn btn-sm btn-primary " type='button' onClick={ handleaddclick}>Add new</button>
                            </div>

                         </div>

     

              {/* <div className="d-flex float-end me-md-12">
              <button type="button" className="btn btn-sm btn-danger mx-3" onClick={handleremove} >Remove</button>
               <button  className="btn btn-sm btn-primary" type='button' onClick={ handleaddclick}>Add new</button>
              </div> */}
                    <div className="d-md-flex mt-10">
                    <div className="relative p-box my-md-none ">
                    <button className='btn btn-primary ms-md-3 btn-sm mt-md-0 mt-2'>Next</button>
                    <button  onClick={() => Box_change("company")} className='btn btn-sm btn-success mx-3' type='button'>Previous</button>
                    <button  onClick={() => Box_change("social")} className='btn btn-warning btn-sm' type='button'>Skip</button>
                    <button onClick={Cancel}  className='btn btn-sm btn-danger ms-md-2 mt-md-0 mt-2' type='button'>Cancel</button> 
                    </div>                      
                    </div>
                           
                        </div>
                    </div>
                    </form>

{/* social */}

             
             <form onSubmit={(e)=>handleSocailSubmit(e)}>
             <div className={detail.social ? 'borderr mt-5':'borderr mt-5 d-none '}>
                        <h1 className='bordertext-social'>Social Links </h1>
                        <div className='personal-form'>
                            {/* <p className='text-black ms-md-5 fs-4'>All the field are optional</p> */}
                            
                            <div className="d-md-flex my-3">
                                <div className="relative p-box my-md-none my-3">
                                    {/* <input type="url" id="Facebook" name='facebook' placeholder='optional' />
                                    <label for="Facebook" className="person-label">Facebook</label> */}
                                <TextField id="outlined-basic" type="text" label="Facebook (optional)" name='facebook' className="p-input" variant="outlined" size="small"   />
                                </div>
                            
                                <div className="relative p-box my-md-none my-3">
                                    {/* <input type="url" id="Instagram" name='instagram'  placeholder='optional' />
                                    <label for="Instagram" className="person-label">Instagram</label> */}

                                <TextField id="outlined-basic" type="text" label="Instagram (optional)" name='instagram' className="p-input" variant="outlined" size="small"   />

                                </div>
                            </div>

                            <div className="d-md-flex my-3">
                                <div className="relative p-box my-md-none my-3">
                                <TextField id="outlined-basic" type="text" label="Twitter (optional)" name='twitter' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="url" id="Twitter" name='twitter'  placeholder='optional'/>
                                    <label for="Twitter" className="person-label">Twitter</label> */}
                                </div>
                            
                                <div className="relative p-box my-md-none my-3">
                                <TextField id="outlined-basic" type="text" label="Youtube(optional)" name='youtube' className="p-input" variant="outlined" size="small"   />
                                    {/* <input type="url" id="youtube" name='youtube' className='ms-md-5' placeholder='optional' /> */}
                                    {/* <label for="youtube" className="person-label">Youtube</label> */}
                                    
                                </div>
                            </div>

                           <div className="d-md-flex my-3">
                         
                           <div className="relative p-box my-md-none ">
                           <button className='btn btn-sm btn-primary me-3'>Submit</button>
                           <button  onClick={() => Box_change("service")} className='btn btn-sm btn-warning' type='button'>Previous</button>
                           <button onClick={Cancel}  className='btn btn-sm btn-danger ms-md-2 ' type='button'>Cancel</button> 
                            </div>                      
                           </div>
                           
                        </div>
                    </div>
             </form>

                  
              
                </div>
            </div>
        </div>
        </div>
 

 
        </>
    )
}


export default PersonalDetails;