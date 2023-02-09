import * as React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
export default function Home() {
    return (
        <div>
            {/* <Navbar /> */}
            <Hero />
            <Cards />
            <Footer />

        </div>
    );
}
