import { BrowserRouter,Route,Routes} from "react-router-dom"
import Navbar from "./components/navbar";
import Home from "./components/home";
import Signin from "./components/login";
import Signup from "./components/Authenticate/signup";
import PersonalDetails from "./components/card/PersonDetails"
import Card from './components/card/card';
import CardView from './components/card/cardview';
import UserVerify from "./components/Authenticate/otpverify";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CropImg from "./components/crop";
import CardShared from "./components/card/cardshare";
import ForgetPassword from "./components/Authenticate/forgetpassword";
import UpdateCard from "./components/card/update";
import Pricing from "./components/pricing/pricing";
import UpdateWork from "./components/card/workupdate";
import Serviceupdate from "./components/card/serviceupdate";
import Socilaupdate from "./components/card/socilaupdate";

function App() {
  const {access_token} =useSelector(state => state.auth)

  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar/>}>
      <Route path="/" element={<Home/>}></Route> 
      <Route path="crop" element={<CropImg/>}></Route>
      <Route path="login" element={access_token ? <Home/>:<Signin/>}></Route> 
      <Route path="signup" element= {access_token ? <Home/>:<Signup/>}></Route>
      <Route path="pricing" element={<Pricing/>}></Route>
      <Route path="work-update"  element={access_token ? <UpdateWork/>:<Signin/>}></Route>
      <Route path="service-update" element={access_token ? <Serviceupdate/>:<Signin/>}></Route>
      <Route path="social-update"  element={access_token ? <Socilaupdate/>:<Signin/>}></Route>
      <Route path="user-details" element= {access_token ? <PersonalDetails/>:<Signin/>}></Route>    
      <Route path="user-card" element= {access_token ? <Card/>:<Signin/>}></Route>
      <Route path="verify" element={<UserVerify/>}></Route> 
      <Route path="select-card" element={<CardView />}>
      <Route path=":id" element={<CardView />} />
    </Route>

      <Route path="update" element={<UpdateCard/>}>
      <Route path=":id" element={<UpdateCard />} />
      </Route>

    
      
    <Route path="*" element={"sorry page not found"}></Route>
    
      </Route>
      <Route path="forgetpassword" element={<ForgetPassword/>}></Route>
    <Route path="view-card" element={<CardShared />}>
      <Route path=":id" element={<CardShared />} />
    </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
 