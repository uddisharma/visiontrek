import React from 'react'
import Home from '../pages/Home'
import Jewelery from '../pages/Jewelery'
import Electronics from '../pages/Electronics'
import { Routes, Route } from 'react-router-dom'
import Details from '../pages/Details'
import Buy from '../pages/Buy'
function AllRoutes() {
    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Details />} />\
            <Route path='/:id/:key' element={<Buy />} />
            <Route path='/jewelery' element={<Jewelery />} />
            <Route path='/electronics' element={<Electronics />} />
        </Routes>
    )
}

export default AllRoutes;