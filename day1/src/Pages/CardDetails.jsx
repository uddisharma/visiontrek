import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../Styles/Navbar.css'
const CardDetails = () => {
    const [posts, setPosts] = useState([])
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
            .then(res => res.json())
            .then(json => setPosts(json))
    }, [])
    console.log(posts)
    return (
        <div className="details">

            <h1>Details</h1>
            {
                <div key={posts.id}>
                    <img src={posts.photo} alt="" />
                    <h2>Name : {posts.title}</h2>
                    <h2>Location : {posts.location}</h2>
                    <p>{posts.description}</p>
                    <Link to='/'>

                        <button className="btn">Go back</button>
                    </Link>
                    <br /> <br /> <hr /> <hr />
                    <br />
                </div>
            }

        </div>
    )
}
export default CardDetails;