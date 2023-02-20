import React from "react";
import './css/footer.css'

const Foot= ()=>{
    return(
        <>
     
    <div className="footer-dark" id="footer">
        <footer>
            <hr />
        <div>
       <div className="container">
        <div className="row">
          <div className="col-md-4 col-12 my-4">
            <h3>Contact us</h3>
            <ul className="ms-2">
              <li>
                <a href="tel:+918588861588" className="d-flex"  target="blank">+91-8588861588</a>
               </li>
               <li>
                  <a href="mailto:info@visiontrek.in"  target="blank"> info@visiontrek.in</a>
                </li>
            </ul>
          </div>

          <div className="col-md-4 col-12 my-4">
            <h3>Services</h3>
            <ul className="ms-2">
              <li>
                <a href="https://visiontrek.in/python/"  target="blank" className="d-flex">Python</a>
               </li>
               <li>
                  <a href="https://visiontrek.in/react-js/"  target="blank">React Js</a>
                </li>
                <li>
                  <a href="https://visiontrek.in/java/"  target="blank">Java</a>
                </li>
                <li>
                  <a href="https://visiontrek.in/node-js/"  target="blank">Node Js</a>
                </li>
            </ul>
          </div>

          <div className="col-md-4 col-12 my-4 justify-content-center">
            <h3>Company</h3>
            <ul className="ms-2">
              <li>
                <a href="https://visiontrek.in/about-us/"  target="blank" className="d-flex">About</a>
               </li>
               <li>
                  <a href="https://visiontrek.in/"  target="blank">Careers</a>
                </li>
                <li>
                    <a href="https://visiontrek.in/contact-us/"  target="blank">ContactUs</a>
                </li>
            </ul>
          </div>
         
        </div>
      
        <p className="copyright">Visiontrek Communication © 2022</p>
       <div className="d-flex justify-content-center mt-2">
       <a href="/" className=""  target="blank"><img src={require("./images/facebook.png")} style={{width:"35px",height:"35px"}} alt="" /></a>
        <a href="/" className="mx-2"  target="blank">
        <img src={require("./images/instagram.webp")} style={{width:"28px",height:"28px"}} alt="" />
        </a>

        <a href="/" className="mx-2"  target="blank">
        <img src={require("./images/twitter.png")} style={{width:"28px",height:"28px"}} alt="" />
        </a>
        <a href="https://wa.me/+918588861588" className="mx-2" target="blank">
        <img src={require("./images/what.webp")} style={{width:"37px",height:"37px"}} alt="" />
        </a>
       </div>
      </div>
      </div>
    </footer>
  </div>
  
  </>
    )
}


export default Foot;