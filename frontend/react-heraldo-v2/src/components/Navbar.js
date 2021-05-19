import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-brand" href="/">Heraldo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item active"><a className="nav-link" href="/login"> Ingresar </a></li>
                    <li className="nav-item active"><a className="nav-link" href="/registrarse"> Registrarse </a></li>
                </ul>
            </div>
        </nav>
    );

}
export default Navbar;