import React from 'react'
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div className='navCard'>

            <Link to='/'>
                <h1 style={{ color: 'black' }}>FirstDay</h1>
            </Link>
            <Link to='/'>
                <p>Home </p>
            </Link>
            <Link to='/about'>
                <p>About </p>
            </Link>
            <Link to='/services'>
                <p>Services </p>
            </Link>
            <Link to='/contact'>
                <p>Contact </p>
            </Link>


        </div>
    )
}

export default Navbar