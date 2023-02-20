
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useState } from "react";
import OtpInput from 'react-otp-input';
import Axios from "axios";
import './loader.css'
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grid: {
  
    height: "40vh",
    textAlign: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function UserVerify() {
  const classes = useStyles();
 

  const [code, setCode] = useState("");

  const handleChange = (code) => setCode(code);


  const config = {
    headers: {
        "Content-Type" : "application/json"
    }
}
const navigate = useNavigate()
const [servererror,setError] =useState({})
const [loading,setloading] =useState(false)

const base_url = "https://api.cardz.visiontrek.in/"
// const base_url = "http://127.0.0.1:8000/"
const handelverify = ()=>{
    if(!code){
        setError({'status': 'otp required'})
    }
    setloading(true)
    Axios.post(base_url+"verify/",{"otp":code,"email":window.sessionStorage.getItem("email")},config).then(response=>{
        setError(response.data)
        setloading(false)
        navigate("/login")
    })                        
    .catch(error=>{
        setError(error.response.data)
        setloading(false)
        
    })  
}

const resend =()=>{
    setloading(true)
    Axios.get(base_url+"resend/"+window.sessionStorage.getItem("email"),config).then(response=>{
        setError(response.data)
        setloading(false)
    })                        
    .catch(error=>{
     
        setError(error.response.data)
        setloading(false)
        
    }) 
}
  return (
    <Container component="main" className="bg-white"  maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
            {loading &&   <div className="loader"></div>}
           
        <Grid
          container
          style={{ backgroundColor: "white" }}
          className={classes.grid}
          justify="center"
          alignItems="center"
          spacing={3}
        > 
          <Grid item container justify="center">
            <Grid item container alignItems="center" direction="column">
              <Grid item>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Verification Code
                </Typography>
              </Grid>
            </Grid>
          </Grid>
      
          {servererror.status ?
          <div className="alert alert-warning d-flex" role="alert">
          <div>
          <span className="ms-2">{servererror.status}</span>
          </div>
        </div>
           : ""}

          <Grid
            item
            xs={12}
            container
            justify="center"
            alignItems="center"
            direction="column"
            border="gray"
          >
            <OtpInput
        value={code}
        onChange={handleChange}
        numInputs={4}
        separator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          // border: "1px solid transparent",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "19px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue",
          borderRadius:"gray"
        
        }}
        focusStyle={{
          border: "2px solid #CFD3DB",
          outline: "blue"
        }}
      />
        
        <button type="button" onClick={handelverify} className="btn btn-success btn-sm mt-3">Verify</button>

        <button type="button" onClick={resend} className="btn text-decoration-underline text-primary">Resend otp ?</button>
        <p className="mb-md-0 mb-5">Register successful please check your email </p>
          </Grid>
        </Grid>
      </div>

    </Container>
  );
}

