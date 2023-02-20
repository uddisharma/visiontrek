import './cardview.css';
import React, { useState } from 'react';
import avtar from './images/avtar.png'
import email from './images/email.webp'

import facebook from './images/facebook.png'
import youtube from './images/youtube.webp'
import instagram from './images/insta.webp'
import twitter from './images/twitter.png'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import load from './images/loading.gif'
import QRCode from 'qrcode';

import { Helmet } from "react-helmet";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import twitter1 from "./images/twitter1.png"
import what from "./images/whatsapp.png"
import linkedin from "./images/linkedin.png"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import fileDownload from 'js-file-download';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  padding: 4,

};


const CardShared = () => {



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [wopen, wsetOpen] = React.useState(false);
  const whandleOpen = () => wsetOpen(true);
  const whandleClose = () => wsetOpen(false);

  const [isloading, setloading] = useState(true)
  const [name, setName] = useState("")
  const params = useParams()


  const [cardData, setCardData] = useState([])


  const url = "https://api.cardz.visiontrek.in/shared-card/" + params.id

  // const url = "http://127.0.0.1:8000/shared-card/"+params.id

  useEffect(() => {
    async function getData() {
      try {
        let mydata = await axios.get(url)
        setCardData(mydata.data)
        setloading(false)
      }
      catch (error) {
        setloading(false)
      }
    }
    getData()

  }, [])

  const [qrcode, setQr] = useState('')

  useEffect(() => {
    QRCode.toDataURL("https://cardz.visiontrek.in/view-card/" + params.id).then((data) => {
      setQr(data)
    });
  }, [])

  const even = (e) => {
    if (e % 2 === 0) {
      console.log("sure")
    }
  }



  const handleClick = (url, filename) => {
    axios.get(url.replace("http", "https"), {
      responseType: 'blob',
    })
      .then((res) => {
        fileDownload(res.data, filename)
      })
  }


  function cardhandle(card, index) {
    return (
      <>
        <Helmet>
          <title>{card.first_name + " " + card.last_name}-Profile</title>
          <meta property="og:image" content={card.profile_img} />
          <meta property="og:title" content="create a bussiness digital card" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://cardz.visiontrek.in/view-card/17238c7a-5b4d-4874-9913-dfa4ff1493b3" />
        </Helmet>
        <div className="digi-card2">
          {/* <img src={selectus} className="card-bg" alt="" />
                */}
          <div className="bg1">

            <div className="cover_img">{card.background_img ? <img src={card.background_img} alt="bg" /> : <div className="cover_back"></div>}</div>
            <p className='text-white fs-3 fst-italic d-flex justify-content-center'></p>
          </div>
          {card.profile_img ? <img src={card.profile_img} className="profile-img float-end absolute" alt="" /> :
            <img src={avtar} className="profile-img float-end" alt="" />}


          <div className="details">
            <h2 className='username text-capitalize'>{card.first_name + " " + card.last_name}</h2>
            <p className=' text-capitalize sub'>{card.profession}</p>
            {card.work ? <p className=' text-capitalize sub '>{card.work.map((item, i) => <>{item.company_name}</>)}</p> : ""}
          </div>

          <div className="all-btns">
            <div className="shared">
              {/* <button className="contacts-button button" >Add to Contacts</button> */}
              {/* <a download href={"https://api.cardz.visiontrek.in/vcf-file/"+card.card_link} className="contacts-button text-decoration-none text-white" 
                ><span>Add to Contacts</span></a> */}
              <button className="contacts-button text-decoration-none text-white button" onClick={() => handleClick("http://api.cardz.visiontrek.in/vcf-file/" + card.card_link, card.first_name + '.vcf')}>Add To Contacts</button>
              <button type="button" class="share_btn button" onClick={handleOpen}>Share</button>
            </div>
            <div >
              <button className="exchange-button button" onClick={whandleOpen} >Exchange Contacts</button>
              <button type="button" class="whatsapp-button button" onClick={() => window.open("https://api.whatsapp.com/send?text= https://cardz.visiontrek.in/view-card/" + params.id, "_blank")}>Whatsapp</button>
            </div>
          </div>

          

          <div className="contact">
            <div className="d-flex ps-1 pt-1 mb-4">


            </div>
            <div className="contact_icons">
              <a href={'tel:' + card.mobile_number} className="phone text-decoration-none">
              <i class="fa-solid fa-phone text-primary"></i>
                <h2>Phone</h2>
              </a>
              {card.whats_app ? <a href={"https://api.whatsapp.com/send?phone=" + card.whats_app + "&amp;text=Hi!"} target="blank" className="whatapp text-decoration-none">
              <i class="fa-brands fa-square-whatsapp text-success"></i>
                <h2>Whatsapp</h2>
              </a> : ""}


              <a href={'sms:' + card.mobile_number} className="mesage text-decoration-none">
              <i class="fas fa-comments text-primary"></i>
                <h2>Message</h2>
              </a>
              {card.alter_number ? <a href={'tel:' + card.alter_number} className="alter text-decoration-none">
              <i class="fa-solid fa-phone text-info"></i>
                <h2>AlterNo</h2>
              </a> : ""}


              <a href={'mailto:' + card.email} className="email text-decoration-none">
              <i class="fas fa-envelope text-danger"></i>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill='red' viewBox="0 0 24 24"><path d="m18.73 5.41-1.28 1L12 10.46 6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64z"></path></svg> */}
                <h2>Email</h2>
              </a>

              {card.address ?
                <div >
                  <i class="fas fa-map-marker-alt"></i>
                  <h2>Address</h2>
                </div> : ""}

              {/* <div className="google-map" title="This feature coming soon">
                <img src={map} className="contact-img" alt="" />
                <p className='contact-text ms-1'>Direction</p>
                </div> */}


            </div>

            <main>
  <div id="divider"></div>
</main>

            <div className="contact-show">

              <div className="d-flex">
              <i class="fas fa-phone-square-alt"></i>
                {/* <input type="text" className='' value={card.mobile_number} /> */}
                <span className='contact-show-text'>{card.mobile_number}</span>
                <i class="far fa-copy" onClick={() => {navigator.clipboard.writeText(card.mobile_number)}}></i>
              </div>

              <div className="d-flex mt-2">
              <i class="fas fa-envelope"></i>
                {/* <input type="text" className='' value={card.email} /> */}
                <span className='contact-show-text'>{card.email}</span>
                <i class="far fa-copy" onClick={() => {navigator.clipboard.writeText(card.email)}}></i>
              </div>
            </div>
          </div>

          {card.work.map((item, i) => <>{item.company_name ? <div className="compony">
            <h1 className='d-flex justify-content-center fw-bolder fs-3'>Company Profile</h1>

            <div className="d-md-flex mt-2 mx-4">
              <h3 className='size' >Company Name:-</h3>
              <p className='text-capitalize size1 para-1'>{card.work.map((item, i) => <>{item.company_name}</>)}</p>
            </div>

            <div className="d-md-flex  mx-4">
              <h3 className='size' >Job Position:-</h3>
              <p className='text-capitalize size1 para-2'>{card.work.map((item, i) => <>{item.job_position}</>)}</p>
            </div>

            <div className="d-md-flex mx-4">
              <h3 className='size' >Address:-</h3>
              <p className=' size1 text-capitalize para-3'>{card.work.map((item, i) => <>{item.address}</>)}</p>
            </div>

            <div className="d-md-flex mx-4 mt-1">
              <h3 className='size' >Nature of Business:-</h3>
              <p className='size1 text-wrap text-capitalize para-4'>{card.work.map((item, i) => <>{item.business_title}</>)} </p>
            </div>

            {card.work.map((item, i) => item.link ? <div className="d-md-flex mx-4 mt-1">
              <h3 className='size' >More about us:-</h3>
              <p className='size1 text-wrap '>  <a href={card.work.map((item, i) => item.link)} target="_blank" rel=" noreferrer">Click here</a> </p>
            </div> : "")}


            <div className=" mx-4">
              <h3 className='' >Company Bio:-</h3>
              <p className=' text-wrap text-capitalize '>{card.work.map((item, i) => <>{item.about_us}</>)} </p>
            </div>




          </div> : ""}</>)}


          {card.service.map((item, i) => <>{item.service_title ? <div className="compony mt-5">
            <h1 className='d-flex justify-content-center fw-bolder fs-3'>Service/Product</h1>

            <div className="name mt-3">
              <h1 className='fs-5 ms-3 text-capitalize '>{item.service_title}</h1>
              <ul className='ms-3'>
                {item.sub_titles.map((item, i) => <li key={i} className={even}>{i + 1 + ") " + item}</li>)}
              </ul>
            </div>

          </div> : ""}</>)}

          <div className="qr d-flex">
            <img src={qrcode} className="qr-img" alt="" />
            <div className="qr-text">

              
              <a href={qrcode} className="text-decoration-none link-btn" download>Download QR</a>
              <p className='qr-link-text'>Powered by <a href="/" target="_blank">Visiontrek</a></p>
            </div>
          </div>

          <div className="social d-flex justify-content-center">

            {card.facebook ?
              <a href={card.facebook} target="blank"><img src={facebook} className="social-img" alt="" /></a> : ""}

            {card.instagram ?
              <a href={card.instagram} target="blank"><img src={instagram} className="social-img" alt="" /></a> : ""}

            {card.twitter ?
              <a href={card.twitter} target="blank"><img src={twitter} className="social-img" alt="" /></a> : ""}

            {card.youtube ?
              <a href={card.youtube} target="blank"><img src={youtube} className="social-img" alt="" /></a> : ""}
          </div>

        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <span id="modal-modal-title" className='d-flex justify-content-center'>
              Share Profile
            </span>

            <span className='d-flex justify-content-center mb-1'>Share Digital VCard in your network.</span>

            <div className="d-flex justify-content-center ">
              <a href={"mailto:?subject=" + card.first_name + " " + card.last_name + " digital card&body=https://cardz.visiontrek.in/view-card/" + params.id} target="blank">
                <img src={email} alt="" className='contact-img mx-1' />
              </a>

              <div onClick={() => window.open("https://www.facebook.com/sharer/sharer.php?u= https://cardz.visiontrek.in/view-card/" + params.id, "_blank")}>
                <img src={facebook} alt="" className='ft-img' />
              </div>

              <a href={"http://www.twitter.com/share?url=https://cardz.visiontrek.in/view-card/" + params.id} target="blank">
                <img src={twitter1} alt="" className='ft-img' />
              </a>


              <a href={"https://www.linkedin.com/shareArticle?mini=true&url=https%3A//cardz.visiontrek.in/view-card/" + params.id + "&title=" + card.first_name + "%20card&summary=this%20is%20create%20by%20me&source=d"} target="blank">
                <img src={linkedin} alt="" srcset="" className='contact-img' />
              </a>

              <div onClick={() => window.open("https://api.whatsapp.com/send?text=  https://cardz.visiontrek.in/view-card/" + params.id, "_blank")}>
                <img src={what} alt="" srcset="" className='contact-img' />
              </div>

            </div>
          </Box>
        </Modal>

        <Modal
          open={wopen}
          onClose={whandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                width: 500,
                maxWidth: '100%',
              }}
            >
              <TextField fullWidth label="Please Enter Your Name " id="fullWidth" onInput={e => setName(e.target.value)} />
            </Box>
            <div className="mt-3">
              <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={() => window.open("sms:" + card.mobile_number + "?body=Hi My name is " + name + " I got connected to you via your cardz visiontrek Card. Please respond back. Thank you", "_blank")} >Text</Button>
                <Button variant="contained" color="success" type="submit"
                  onClick={() => window.open("https://api.whatsapp.com/send?text= Hi My name is " + name + " I got connected to you via your cardz visiontrek Card. Please respond back. Thank you", "_blank")}>Whatsapp</Button>

              </Stack>
            </div>

            {/* <div className="d-flex ">
            <div  onClick={()=> window.open("https://api.whatsapp.com/send?text= https://38.242.219.47:3004/"+params.id, "_blank")}>
            <img src={what} alt="" srcset="" className='contact-img' />
            </div>
          </div> */}
          </Box>
        </Modal>
      </>
    )
  }

  return (


    <div className="card-main2 pt-md-4 pt-0">
      {isloading ? <img src={load} className="md:ml-72" alt="" /> : cardData.map(cardhandle)}

    </div>

  )
}




export default CardShared;