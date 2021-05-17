import React from 'react';
import Navbar from './Navbar.js'
import './css/styleHeader.css';

function Header() {
    return (
        <header>
            <div className="container text-center pt-5 pb-2">
                <h1 id="titulo">El Heraldo</h1>
            </div>

            <Navbar />

        </header>

    );
}
export default Header;