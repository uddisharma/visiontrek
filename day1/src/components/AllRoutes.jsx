import React from 'react'
// import { Routes, Route } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import About from '../Pages/About'
import CardDetails from '../Pages/CardDetails'
import Contact from '../Pages/Contact'
import Home from '../Pages/Home'
import Services from '../Pages/Services'
function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<CardDetails />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    )
}

export default AllRoutes