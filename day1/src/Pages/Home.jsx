import React from 'react'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import Slider from '../components/Slider'

function Home() {
    return (
        <div>
            {/* <Navbar /> <br /> <br /> */}
            <Slider />
            <Cards /> <br /> <br />
            <Footer />
        </div>
    )
}

export default Home