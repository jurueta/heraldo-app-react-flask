import React, { Fragment } from 'react';
import Navbar from './Navbar.js'
import './css/styleHeader.css';
import logoHeraldo from '../image/el-heraldo-logo.svg';



function Header() {
    
    const date = new Date().toLocaleString();

    return (
        <header>
            <div className="container w-1400 text-center py-3 z-index-9999 bg-white nav-heraldo section" id="header-heraldo" >
                <p className="fw-bold">{date}</p>
                <a href="">
                    <img src={logoHeraldo} alt="Heraldo-logo" className="icon-heraldo"/>
                </a>
            <Navbar />
            </div>
        </header>
    );
}
export default Header;