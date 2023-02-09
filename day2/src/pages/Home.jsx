import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Cards />
        </div>
    );
}
