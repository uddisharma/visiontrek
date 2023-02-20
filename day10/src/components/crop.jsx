import React from "react";
import Avatar from "react-avatar-edit"
import { useEffect,useState } from "react";

const CropImg=()=> {

  const [src,setSrc] = useState(null)
  const [preview,setPreview]= useState(null)
   
  const onClose = ()=>{
    setPreview(null)
  }

  const onClick = view =>{
    setPreview(view)
  }

    return (
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <Avatar
            width={400}
            height={300}
            src={src}
            onCrop={onClick}
            onClose={onClose}
          />

          <img src={preview} alt="" />
        </div>
      </div>
    </div>
    </>
    )
  }

export default CropImg;
