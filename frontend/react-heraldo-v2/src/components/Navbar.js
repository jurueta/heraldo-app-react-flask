import React, { Fragment } from 'react';


function Navbar() {
    const cerrarSeccion = () => {
        localStorage.clear()
    }

    const navegacion = () => {
        if (localStorage.getItem('USER_SESSION')) {
            return (
                <Fragment>
                    <li className="nav-item active"><a className="nav-link" href="/admin"> Crear noticia </a></li>
                    <li className="nav-item active"><a className="nav-link" href="/" onClick={cerrarSeccion}> Salir </a></li>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <li className="nav-item active"><a className="nav-link" href="/login"> Ingresar </a></li>
                    <li className="nav-item active"><a className="nav-link" href="/registrarse"> Registrarse </a></li>
                </Fragment>
            );
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <a className="navbar-brand" href="/">Heraldo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item active"><a className="nav-link" href="/"> Noticias </a></li>
                    {navegacion()}
                </ul>
            </div>
        </nav>
    );

}
export default Navbar;