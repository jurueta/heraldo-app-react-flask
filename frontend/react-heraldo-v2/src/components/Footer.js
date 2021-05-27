import React from 'react';
import './css/styleFooter.css';

function Footer() {
    return (
        <footer className="container text-muted text-center">
            <div className="row">
                <div className="col-md-6">
                    <p> Sobre nosotros:</p>
                    <p>Somos Jesus Urueta Cantillo y Duvan Andres Florez Ardila, estudiantes de noveno semestre de ingeniería de sistemas</p>
                </div>

                <div className="col-md-6">
                    <p> Contáctenos:</p>
                    <p>Dirección: Cra X # YZ-AB</p>
                    <p> Teléfono: xx-xxxxxxxxx</p>
                    <p>URL: <a href="/">elheraldoejemplo.com.co</a></p>
                </div>
            </div>

        </footer>
    );
}
export default Footer;