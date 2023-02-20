import './card.css';
import React ,{  useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios";
import load from './images/loading.gif'
import avtar from './images/avtar.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4 ,
  padding: 2,

};

const Card =()=>{


    const [isloading,setloading] = useState(true)
    let [cardlist,setCardList]= useState([])
    // const base_url ="http://127.0.0.1:8000/"
    // const base_url ="http://38.242.219.47:8005/"

    const base_url ="https://api.cardz.visiontrek.in/"
    const [wopen, wsetOpen] = React.useState(false);

    const whandleClose = () => wsetOpen(false);

    const url=base_url+"personal-detail/"

    const userData = useSelector(state => state.user)
    
    let access_token=localStorage.getItem("access_token")
    const config = {
        headers: {
            "authorization" : `Bearer ${access_token}`
        }
    }

    const [counter,Setcounter]=useState(1)
    useEffect(()=>{
        async function getAllData(){
          try{
            let mydata=await Axios.get(url,config)
            setCardList(mydata.data)
            setloading(false)
          }
          catch(error){
            console.log(error);
            
          }
        }
        getAllData()
      },[isloading,counter])
     

   
    const[deleteId,setDeleteId]=useState("")
   
      const delete_card = async (e)=>{
        setloading(true)
          try{
            await Axios.delete(base_url+"delete-card/"+e,config)
            setloading(false)
            whandleClose()
            Setcounter(counter+1)
          }
          catch(error){
            setloading(false)
          }
        }
        // const [open, setOpen] = useState(false);
        // const handleClickOpen = () => {
        //   setOpen(true);
        // };

        const whandleOpen = async (e) =>{ 
          wsetOpen(true)
          console.log(e)
          setDeleteId(e)
         
        }
        
      function callDelete(){
        delete_card(deleteId)
      }  
      
        const navigate = useNavigate()

        const Update= (card_link)=>{
          localStorage.setItem('update_card_id', card_link) 
          navigate("/update/"+card_link)
        }

      const renderCard=(card,index)=>{
  
        return(
        <>
           <div className="card-list" key={index} >
                {card.profile_img ?  <img src={card.profile_img} className="profile-img2"  alt="" />:
                 <img src={avtar}  alt="" />}
                <div className="card-body">
                <h5 className="card-title text-capitalize fs-5 fw-bold">{card.first_name +" "+ card.last_name}</h5>
                <p className="card-text"> 
              
              <span className='fs-5 text-capitalize'>{card.profession}</span> <br />
                <span>Created on: {card.create_on.split('-').reverse().join('-')}</span>
                </p>           
              
                
                <button className='btn btn-sm btn-secondary me-1 mt-1' type='button' onClick={() => whandleOpen(card.card_link)} >Delete</button> 

                {/* <button className='btn btn-sm btn-secondary me-1 mt-1' type='button' onClick={() => delete_card(card.card_link)}>Delete</button>  */}
                <button className='btn btn-sm btn-success me-1 mt-1' onClick={()=> Update(card.card_link)} >Edit</button> 
                {/* <Link  to={`/select-card/${card.card_link}`} key={card.card_link.toString()}  className="btn btn-primary btn-sm card-button">View</Link> */}
                <button className="btn btn-primary btn-sm card-button" onClick={()=> window.open("https://cardz.visiontrek.in/view-card/"+card.card_link, "_blank")}>Preview</button>
                 
                </div>
                </div>

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
   <p className='d-flex justify-content-center text-danger fs-3'>Are you sure ?</p>
    </Box>
    <div className="mt-3 d-flex justify-content-center">
    <Stack spacing={2} direction="row">   
        <Button variant="contained" color="error" onClick={callDelete}>Yes</Button>
        <Button variant="contained" type="button" onClick={whandleClose}>No</Button>
      </Stack>
    </div>
        </Box>
      </Modal>
             
        </>
        )
      
      }

    return(
        <>

        <div className="card-main">
   
            <div className="container">
                <div className="row">
                    <div className="col">              
        
               
                    <h1>Your cards</h1>
                    {isloading ? <img src={load} className="md:ml-72" alt="" />:
                    <div className="wrapper">
                      {cardlist.length > 0 ? cardlist.map(renderCard):
                      <div><h5 className='text-capitalize'>{userData.first_name+" "+userData.last_name}  you haven't created any card yet.</h5>
                      <Link to="/user-details" className='fs-5'>Create a new card</Link></div>}

                    </div>
                    }    

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Card;