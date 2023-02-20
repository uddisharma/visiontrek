import React from 'react'
import { Link } from 'react-router-dom';
import './css/home.css'
export const Home = () => {
  return (
    <>
        <section class="pt-4 pt-md-11">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-5 col-lg-6 order-md-2">

      
          <img src="assets/images/top.jpg" class="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0" alt="..." data-aos="fade-up" data-aos-delay="100" />

        </div>
        <div class="col-12 col-md-7 col-lg-6 order-md-1" data-aos="fade-up">

    
          <h1 class="display-3 text-center text-md-start">
            Welcome to <span class="text-primary">Visiontrek</span> <br/>
            Digital Card .
          </h1>

        
          <p class="lead text-center text-md-start text-muted mb-6 mb-lg-8">
            Build a beautiful and modern card with us and grow your business.
          </p>

       
          <div class="text-center text-md-start">
            <Link to="/user-details" class="btn btn-primary shadow lift me-1">
             Get Started
            </Link>
            
          </div>

        </div>
      </div> 
    </div> 
  </section>
  {/* features */}
  <section class="py-8 py-md-11 border-bottom">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4" data-aos="fade-up">

      
            <div class="icon text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" ><path d="M21 7h-6a1 1 0 0 0-1 1v3h-2V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM8 6h2v2H8V6zM6 16H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V6h2v2zm4 8H8v-2h2v2zm0-4H8v-2h2v2zm9 4h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></svg>            </div>

            <h3>
              Create for business
            </h3>

            <p class="text-muted mb-6 mb-md-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellendus dicta dolor, expedita consectetur quaerat officiis dolore
            </p>

          </div>
          <div class="col-12 col-md-4" data-aos="fade-up" data-aos-delay="50">

           
            <div class="icon text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"></path><path d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"></path><path d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"></path></svg>         </div>
            <h3>
              Designed modern card
            </h3>

           
            <p class="text-muted mb-6 mb-md-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, repellendus dicta dolor, expedita consectetur qu
            </p>

          </div>
          <div class="col-12 col-md-4" data-aos="fade-up" data-aos-delay="100">            
            <div class="icon text-primary mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" ><path d="M5.5 15a3.51 3.51 0 0 0 2.36-.93l6.26 3.58a3.06 3.06 0 0 0-.12.85 3.53 3.53 0 1 0 1.14-2.57l-6.26-3.58a2.74 2.74 0 0 0 .12-.76l6.15-3.52A3.49 3.49 0 1 0 14 5.5a3.35 3.35 0 0 0 .12.85L8.43 9.6A3.5 3.5 0 1 0 5.5 15zm12 2a1.5 1.5 0 1 1-1.5 1.5 1.5 1.5 0 0 1 1.5-1.5zm0-13A1.5 1.5 0 1 1 16 5.5 1.5 1.5 0 0 1 17.5 4zm-12 6A1.5 1.5 0 1 1 4 11.5 1.5 1.5 0 0 1 5.5 10z"></path></svg>        </div>
            <h3>
              Share Anywhere
            </h3>

            <p class="text-muted mb-0">
                rem ipsum dolor sit amet consectetur adipisicing elit. Perspiciase engrem ipsum dolor sit amet consectetur adipisicing elit. Perspicia
            </p>

          </div>
        </div>
      </div>
    </section>
    {/* about us */}

    <section class="pt-8 pt-md-11 bg-gradient-light-white">
      <div class="container">
        <div class="row align-items-center justify-content-between mb-8 mb-md-11">
          <div class="col-12 col-md-6 order-md-2" data-aos="fade-left">

            <h2>
              Why you choose us <br />
              {/* <!-- <span class="text-success">ever created for <span data-typed='{"strings": ["developers.", "founders.", "designers."]}'></span></span> --> */}
            </h2>

            <p class="fs-lg text-muted mb-6">
             Visiontrek provides dolor sit amet consectetur adipisicing elit. Illo architecto eligendi quibusdam harum nesciunt qui adipisci facere illum modi cumque et iusto nemo, fuga sed ullam omnis? Quisquam, harum ipsa.
            </p>

            <div class="row">
              <div class="col-12 col-lg-6">

                <div class="d-flex">

                  <div class="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <p class="text-success">
                    Anytime access/updates
                  </p>

                </div>
                <div class="d-flex">

                  <div class="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                    <i class="fe fe-check"></i>
                  </div>

                  <p class="text-success mb-lg-0">
                    Anywhere access
                  </p>

                </div>

              </div>
              <div class="col-12 col-lg-6 mb-6 mb-md-0">
                <div class="d-flex">

                  <span class="badge badge-rounded-circle bg-success-soft mt-1 me-4">
                    <i class="fe fe-check"></i>
                  </span>

                  <p class="text-success">
                    customer support
                  </p>

                </div>

        
                <div class="d-flex">

                  <div class="badge badge-rounded-circle bg-success-soft me-1 me-4">
                    <i class="fe fe-check"></i>
                  </div>

             
                  <p class="text-success mb-0">
                    your choice bio data
                  </p>

                </div>

              </div>
            </div> 

          </div>
          <div class="col-12 col-md-6 col-lg-5 order-md-1" data-aos="fade-right">
            <div class="card shadow-light-lg lift lift-lg">

              
              <img src="assets/images/choose.jpg.crdownload" alt="..." class="card-img-top" />


            </div>

          </div>
        </div> 
        <div class="row align-items-center">
          <div class="col-12 col-md-7 col-lg-6" data-aos="fade-right">

   
            <h2>
              We have lots of choice field  <br />
              <span class="text-primary">for enter your bio/bussiness data</span>.
            </h2>

        
            <p class="fs-lg text-muted mb-6">
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni explicabo facere inventore.
            </p>

      
            <div class="d-flex">

          
              <div class=" text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg>           </div>

              <div class="ms-5">

            
                <h4 class="mb-1">
                  Lorem ipsum dolor sit amet consectetur.
                </h4>

         
                <p class="text-muted mb-6">
                  ipisicing elit. Magni explicabo facere inventore
                </p>

              </div>

            </div>
            <div class="d-flex">

   
              <div class=" text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8"/>
                </svg>           </div>

              <div class="ms-5">

            
                <h4 class="mb-1">
                 Lorem ipsum dolor sit amet consectetur adipisicing
                </h4>

               
                <p class="text-muted mb-6 mb-md-0">
                  inventore sequi saepe officia possimus non. Repellat incidunt vero seq
                </p>

              </div>

            </div>

          </div>
          <div class="col-12 col-md-5 col-lg-6">

            <div class="w-md-150 w-lg-130 position-relative" data-aos="fade-left">

              

             
              <div class="">

          
                <img src="assets/images/sample.PNG"  alt="..." />

              </div>

            </div>

          </div>
        </div> 
      </div> 
    </section>

    {/* shape */}
    <div class="position-relative mt-n8">
      <div class="shape shape-bottom shape-fluid-x text-gray-200">
        <svg viewBox="0 0 2880 480" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z" fill="currentColor"/></svg>      </div>
    </div>

    <section class="pt-12 pt-md-13 bg-gray-200">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-md-5 col-lg-6 order-md-2">
            

          </div>
          <div class="col-12 col-md-7 col-lg-6 order-md-1">


            <h2>
             Connect with us 
            </h2>


            <p class="fs-lg text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cupiditate ipsa sed neque deserunt perspiciatis in aspernatur, voluptate, sit, unde et. Quis maiores totam quae reiciendis corporis, maxime omnis. Dolorum?
            </p>



          </div>
        </div>
      </div> 
    </section>
    </>
  )
}


export default Home;