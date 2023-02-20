import React from 'react';
import { useState } from 'react';
import { GetToken } from "../../services/localstoreage";
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Serviceupdate = ()=>{
    // const base_url ="http://127.0.0.1:8000/"
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

  const service_url= base_url+"service/"+id
 
  const [ServiceData,setServiceData]=useState([])


  useEffect(()=>{
    const WorkGetting= async ()=>{
        setloading(true)
    
            try{
                let mydata=await axios.get(service_url,config)
                setServiceData(mydata.data)
                setloading(false)
             
            }
            catch(error){
                setloading(false)
                seterror(error)
            }
      }
      WorkGetting()
  },[counter])
    




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

  

      const handleCompanySubmit = async (e)=>{
        e.preventDefault();
        setloading(true);
        setCounter(counter+1)
        const data = new FormData(e.currentTarget);
        const actualdata = {
            service_title :data.get('service_title'),
        }
        
        let arr=[]
 

     
        if (ServiceData.sub_titles){
            for(let j=0; ServiceData.sub_titles.length > j;j++){
                arr.push(data.get('service_title'+j))
                
            }
        }


        if(inputList.length > 0)
        {
          for (let i = 0; i < inputList.length; i++) {
              
              if (data.get(i)) {
                arr.push(data.get(i))
            }
             }
        }

        actualdata.sub_titles = arr;

             axios.put(service_url,actualdata,config).then(response=>{
                setloading(false);
                setServiceData(response.data)
                setSuccess(true)
                setCounter(counter+1)

                
            })                        
            .catch(error=>{
                console.log(error)
                seterror(error.response.data)
                setloading(false);           
            })    
    
       }

       

       const service_delete = (index) => {
        setloading(true);
        const delete_url = base_url+"service-delete/"+id+"/"+index 
        axios.delete(delete_url,config).then(response=>{
            setloading(false);
            setServiceData(response.data)
            setSuccess(true)
            setCounter(counter+1)
        })                        
        .catch(error=>{
            console.log(error)
            seterror(error.response.data)
            setloading(false);           
        })  
      }


      const Delete_services = (index) => {
        setloading(true);
        const delete_url = base_url+"service/"+id
        axios.delete(delete_url,config).then(response=>{
            setloading(false);
            setServiceData(response.data)
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
                 <Link to="/work-update" className="nav-link"  type="button" >Work</Link>
            </li>
            <li className="nav-item" >
                <button className="nav-link active"  type="button" >Services</button>
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
                     {/* service update */}
                     <div className="d-block" >
                        <h4 className='fs-4 fw-bold'>Service update</h4>
                        {success &&   <div className="alert alert-success" role="alert">
                                  <h4 className='justify-content-center mt-1'>Updated successfully
                              
                                  </h4>
                                </div>}
                        <form className='border pb-3' onSubmit={(e)=>{handleCompanySubmit(e)}}>

                           <div className="d-md-flex ms-md-7 mt-5">
                           <div className="d-block">
                             <label  className="form-label ms-md-8 fs-5">Service Title</label> <br />
                             <textarea type="text" id="floating_outlined11" name='service_title' className="ms-md-7 p-text"  defaultValue={ServiceData.service_title} />
                             {servererror.service_title ? <p className='error'>{servererror.service_title}</p>: ''}
                            </div>
                           </div>

                           {ServiceData.sub_titles ? 
                               <div className="ms-md-7 mt-1" >
                              <p className='ms-md-7 text-black fs-4' >Sub titles</p>
                              {ServiceData.sub_titles.map((text,i) =>
                              
                               <div className="mt-4 " key={i}>
                                 <textarea type="text" name={'service_title'+i} className="ms-md-7 p-text p-2"  defaultValue={text} />
                                 <button className='btn position-absolute bottom-50' type='button'
                                  onClick={() => service_delete(i)}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-trash3" viewBox="0 0 16 16">
                                 <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                 </svg></button>
                               </div>
                               
                           )}
                           
                          </div> :"" }
                            
                          <div className="my-3 ms-md-8">
                                <p className='ms-md-7 fs-4 text-dark'>Add subtitles</p>
                                {/* <div className="p-box my-md-none my-2">
                                    <textarea type="text" id="Sub_Title" name='sub_title' className="p-text" />
                                </div> */}

                            </div>

                        {  inputList.map( (x,i)=>{
                 return(
                     <>  
                        <div className="d-md-flex my-3" key={x}>
                          <div className="relative p-box my-md-none my-2">
                                <textarea type="text" id={i} name={i} className="p-text ms-md-8"  onChange={ e=>handleinputchange(e,i) } />                        
                          </div>
                        </div>
                    </>
              );
             } )} 

              <div className="d-flex float-end me-md-12">
              <button type="button" className="btn btn-sm btn-danger mx-3" onClick={handleremove} >-</button>
               <button  className="btn btn-sm btn-primary" type='button' onClick={ handleaddclick}>+</button>
              </div>                  
                          
                 


                         <div className="d-md-flex ms-md-7 mt-5">
                             <button className='btn btn-sm btn-primary ms-md-7 mb-3' >update</button>

                             <button className='btn btn-sm btn-danger ms-md-5 ms-2 mb-3' type="button"
                              onClick={Delete_services}
                             >Delete all</button>
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
export default Serviceupdate;