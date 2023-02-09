import React from 'react'
import Home from '../pages/Home'
import Jewelery from '../pages/Jewelery'
import Electronics from '../pages/Electronics'
import { Routes, Route } from 'react-router-dom'
function Routes() {
    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Jewelery' element={<Jewelery />} />
            <Route path='/Electronics' element={<Electronics />} />
        </Routes>
    )
}

export default Routes