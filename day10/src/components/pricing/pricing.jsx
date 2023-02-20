import { React } from "react"
import { Link } from "react-router-dom";

const Pricing = ()=>{


    return(
        <>

<section className="pricing py-5 mt-5">
  <div className="container">
    <div className="row">

      <div className="col-md-4"></div>

      <div className="col-md-4 border rounded">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-muted text-uppercase text-center">Pro</h5>
            <h6 className="card-price text-center fs-4">100% Free</h6>
            <hr/>
            <ul className="fa-ul">
              <li><span className="fa-li"><i className="fas fa-check"></i></span><strong>Unlimited Card</strong>
              </li>
              <li><span className="fa-li"><i className="fas fa-check"></i>Card Update</span></li>
              <li><span className="fa-li"><i className="fas fa-check"></i> Details on your choice </span></li>
              <li><span className="fa-li"><i className="fas fa-check"></i></span>Unlimited 
                users access</li>
             
            </ul>
            <div className="d-grid">
              <Link to="/login" className="btn btn-primary text-uppercase">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        </>
    )

}



export default Pricing;