import './cardview.css';
import React ,{ Fragment, useState } from 'react';
// import selectus from './images/selectus.png'
import avtar from './images/avtar.png'
import phone from './images/phone.png'
import whatapp from './images/whatsaap.png'
import message from './images/message.png'
import alter from './images/alter.png'
import email from './images/email.webp'
import map from './images/google-map.png'
import copy from './images/copy.png'
import facebook from './images/facebook.webp'
import youtube from './images/youtube.webp'
import instagram from './images/insta.webp'
import twitter from './images/twitter.png'
import { GetToken } from '../../services/localstoreage';
import { useEffect } from 'react';
import axios from 'axios';
import load from './images/loading.gif'
import  QRCode  from 'qrcode';
import home from './images/home.png'
import { useParams } from "react-router-dom";
import "./assets/css/style.css"
import { Link } from 'react-router-dom';

const CardView = ()=>{
    const [isloading,setloading] = useState(true)

    let params = useParams();
   
    const {access_token} = GetToken()
    const [cardData,setCardData]= useState([])
    const config = {
        headers: {
            "authorization" : `Bearer ${access_token}`
        }
    }
    const url = "http://38.242.219.47:8005/card-select/"+params.id
    // const url = "http://127.0.0.1:8000/shared-card/"+params.id
  
    useEffect(()=>{
        async function getData(){
            try{
                let mydata=await axios.get(url,config)
              setCardData(mydata.data)
              console.log(mydata.data)
              setloading(false)
            }
            catch(error){
                console.log("error")
              console.log(error);
            }
          }
          getData()
      
      },[])

      const [qrcode,setQr]=useState('')

      useEffect(()=>{
          QRCode.toDataURL("http://38.242.219.47:3004/view-card/b02ea251-395d-4b07-a449-cfd6943a17a5").then((data)=>{
              setQr(data)
          });
      },[])

      const even=(e)=>{
        if(e%2===0){
            console.log("sure")
        }
      }


      function cardhandle(card,index){
        return(
            <>
          
                <div className="digi-card bg-gray-50 rounded dark:bg-gray-800">
        
                <div className="bg1">
                <p className='text-white fs-3 fst-italic d-flex justify-content-center'></p>
                </div>
                {card.profile_img ?  <img src={card.profile_img} className="profile-img float-end" alt="" />:
                 <img src={avtar} className="profile-img float-end" alt="" />}
    
            <div className="details">
                <p className='username text-capitalize'>{card.first_name+" "+card.last_name}</p>
                <p className=' text-capitalize compony-name'>{card.profession}</p>
                
                {card.work ?  <p className=' text-capitalize compony-name '>{card.work.map((item,i) =><>{item.company_name}</>)}</p>:"" }
           

            </div>

            <div className="contact">
            <div className="contact_icons">
                <a href={'tel:'+card.mobile_number} className="phone ">
                <img src={phone} className="contact-img" alt="" />
                <p className='contact-text ms-2'>phone</p>
                </a>
                {card.whats_app ?  <a href={"https://api.whatsapp.com/send?phone=91"+card.whats_app+"&amp;text=Hi!"} target="blank" className="whatapp">
                <img src={whatapp} className="contact-img" alt="" />
                <p className='contact-text'>whatsapp</p>
                </a>:""}
            
                
                <a href={'sms:'+card.mobile_number} className="mesage">
                <img src={message} className="contact-img" alt="" />
                <p className='contact-text'>Message</p>
                </a>
                {card.alter_number ? <a href={'tel:'+card.alter_number} className="alter ">
                <img src={alter} className="contact-img" alt="" />
                <p className='contact-text'>Alter No</p>
                </a>:""}

                <a href={'mailto:'+card.email} className="alter">
                <img src={email} className="contact-img" alt="" />
                <p className='contact-text ms-2'>Email</p>
                </a>

               {card.country ?
                <div className=" ">
                <img src={home} className="contact-img" alt="" />
                <p className='contact-text ms-1'>Address</p>
                </div>:""}

                <div className="google-map" title="This feature coming soon">
                <img src={map} className="contact-img" alt="" />
                <p className='contact-text ms-1'>Direction</p>
                </div>
                
            </div>
            <div className="contact-show">
               
                <div className="d-flex">
                <img src={phone} className="copy" alt="" />
                <input type="text" className='border rounded ps-2 ms-3' value={card.mobile_number} />
                <img src={copy} className="copy ms-3" alt="" onClick={() => {navigator.clipboard.writeText(card.mobile_number)}} title="copy mobile number" />
                </div>

                <div className="d-flex mt-2">
                <img src={email} className="copy" alt="" />
                <input type="text" className='border rounded ps-2 ms-3' value={card.email}  />
                <img src={copy} className="copy ms-3" onClick={() => {navigator.clipboard.writeText(card.email)}} title="copy email" alt="" />
                </div>
            </div>
            </div>

            {card.work.map((item,i) =><>{item.company_name ?   <div className="compony mt-5">
                <h1 className='d-flex justify-content-center fw-bolder fs-3'>Company Profile</h1>
       
                <div className="name d-flex mt-5">
                <table className="table table-striped ms-4">
                    <tr>
                        <th className='pe-md-4 size' >CompanyName</th>
                        <td className=' size1 text-capitalize'>{card.work.map((item,i) =><>{item.company_name}</>)}</td>
                    </tr>
                    <tr className='bg-white'>
                        <th className='pe-md-4 size' >JobPosition</th>
                        <td className=' size1 text-capitalize'>{card.work.map((item,i) =><>{item.job_position}</>)}</td>
                    </tr>
                    <tr className='my-4'>
                        <th className='pe-md-4 size' >Address</th>
                        <td className=' size1 text-capitalize'>{card.work.map((item,i) =><>{item.address}</>)}</td>
                    </tr>

                    <tr className='bg-white'>
                        <th className='pe-md-4 size d-block' >CompanyBio</th>
                        <td className=' size1 text-wrap'>{card.work.map((item,i) =><>{item.about_us}</>)}</td>
                    </tr>

                </table>
                    
                </div>
     

            </div> :""}</>)}


            {card.service.map((item,i) =><>{item.service_title ? <div className="compony mt-5">
                <h1 className='d-flex justify-content-center fw-bolder fs-3'>Service/Product</h1>
    
                <div className="name mt-3">
                <h1 className='fs-5 ms-3 text-capitalize '>{item.service_title}</h1>
                <ul className='ms-3'>
                {item.sub_titles.map((item,i) =><li key={i}  className={even}>{i+1 + ") " +item}</li>)}
                </ul>
                </div>
     

            </div> :""}</>)}

            <div className="qr d-flex">
                    <img src={qrcode} className="qr-img" alt=""   />
          
                    <div className="qr-text">
                    <p className=''>Powered by Visiontrek Cards</p>
                    <a href={qrcode} className="btn btn-primary btn-sm"  download>Download Qr</a>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                 <h1 className='fs-5 fw-bold mt-1 d-flex'>Social Link</h1>
                 </div>
                <div className="social d-flex justify-content-center">
            

                    {card.facebook ? 
                    <a href={card.facebook}><img src={facebook} className="social-img" alt="" /></a>:""}
                    
                    {card.instagram ? 
                    <a href={card.instagram}><img src={instagram} className="social-img" alt="" /></a>:""}
                
                    {card.twitter ? 
                    <a href={card.twitter}><img src={twitter} className="social-img" alt="" /></a>:""}

                    {card.youtube ? 
                    <a href={card.youtube}><img src={youtube} className="social-img" alt="" /></a>:""}
                </div>

        </div>
            </>
        )
      }
  
    return(
        <>
        <div className="card-view-main">            
    
        {isloading ? <img src={load} className="md:ml-72" alt="" />:<>{cardData.map(cardhandle)}</>}
        </div>


        <div className="container">
            <div className="row">
                <div className="col">
                <h1 className='d-flex justify-content-md-center fw-bolder'>Share Your Card Link / Qr 
              <img src={copy} className="copy ms-3 d-md-none d-block float-end" alt="" onClick={() => {navigator.clipboard.writeText("http://38.242.219.47:3004/view-card/"+params.id)}} title="copy mobile number" />
                </h1>

                <div className="d-flex justify-content-md-center mt-2 bg-white">
                    
                     <p className='bg-gray-100 py-1 px-2 rounded md:ml-20'>http://38.242.219.47:3004/view-card/{params.id}</p>
                     <img src={copy} className="copy ms-3 d-md-block d-none" alt="" onClick={() => {navigator.clipboard.writeText("http://38.242.219.47:3004/view-card/"+params.id)}} title="copy mobile number" />
             </div>
             
                </div>
            </div>
        </div>

        </>
    )
}

export default CardView;