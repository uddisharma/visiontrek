import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
export default function Home() {
    return (
        <div>
            <Navbar />
            {/* <Button variant="contained">Hello World</Button> */}
            <Hero />
        </div>
    );
}
