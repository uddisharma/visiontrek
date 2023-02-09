import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
export default function Home() {
    return (
        <div>
            <Navbar />
            <Button variant="contained">Hello World</Button>
        </div>
    );
}
