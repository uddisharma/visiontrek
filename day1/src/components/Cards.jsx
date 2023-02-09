import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Navbar.css'

function Cards() {
    const [posts, setPosts] = useState([])
    const handleclick = (e) => {
        console.log('running card', e)

    }
    useEffect(() => {
        fetch('http://localhost:5000/posts')
            .then(res => res.json())
            .then(json => setPosts(json))
    }, [])
    return (
        <div className='cardwrapper'>
            {
                posts.map((e) => (
                    <>

                        <div className='wrapper' key={e.id}>
                            <div className='Card' >
                                <h2 > {e.title}</h2>
                                <img style={{ height: '250px', width: '250px' }} src={e.photo} alt="not found" /> <br />  <br />

                            </div> <br />
                            <Link to={`/${e.id}`} >
                                <button style={{ width: '30%' }} className='btn' onClick={() => handleclick(e)} >know more</button>
                            </Link>
                        </div>

                    </>
                ))
            }
        </div >
    )
}

export default Cards