import React from 'react';
import './css/styleFooter.css';
import logoHeraldo from '../image/el-heraldo-logo.svg';

function Footer() {

    return (
        <footer className="container w-1400 text-muted footer-conter d-flex justify-content-end flex-column flex-1-0-auto pb-3">
            <div className="w-100 border-top-red"></div>
              <img src={logoHeraldo} alt="Heraldo-logo" className="icon-footer mx-auto mt-2"/>
              <p className="fz-15 mt-3 w-800 mx-auto text-center"><b>EL HERALDO S.A.</b> Prohibida la reproducción y utilización, total o parcial, de los contenidos en cualquier forma o modalidad, sin previa, expresa y escrita autorización, incluyendo su mera reproducción y/o puesta a disposición con fines comerciales, directa o indirectamente lucrativos. 2000 - 2021 ©</p>
              <h4 className="fw-bold fz-15 mt-2 text-center">Redes sociales:</h4>
              <div className="d-flex justify-content-center pt-2 pb-2">
                <a href="https://www.facebook.com/fansheraldo"><i className="fab fa-facebook mx-3 fz-22"></i></a>
                <a href="https://twitter.com/elheraldoco"><i className="fab fa-twitter mx-3 fz-22"></i></a>
                <a href="https://www.instagram.com/elheraldoco/"><i className="fab fa-instagram mx-3 fz-22"></i></a>
                <a href="https://www.youtube.com/user/ELHERALDOINTERNET"><i className="fab fa-youtube mx-3 fz-22"></i></a>
              </div>
            <div className="row br-top-gray pt-3">
                <div className="col-md-4 br-right-bot-gray ">
                    <h4 className="fw-bold fz-20 mt-2 mb-4">Sobre nosotros:</h4>
                    <p className="fz-16">Somos Jesus Urueta Cantillo y Duvan Andres Florez Ardila, estudiantes de noveno semestre de ingeniería de sistemas</p>
                </div>
                <div className="col-md-3 br-right-bot-gray">
                <h4 className="fw-bold fz-20 mt-2 mb-4">Contáctenos:</h4>
                    <p className="fz-15 mb-3">Dirección: Cra X # YZ-AB</p>
                    <p className="fz-15 mb-3"> Teléfono: xx-xxxxxxxxx</p>
                    <p className="fz-15 mb-3">URL: <a href="/" className="fz-18">elheraldoejemplo.com.co</a></p>
                </div>
                <div className="col-md-5">
                    <h4 className="fw-bold fz-14 mt-2">Mapa:</h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.8332053631726!2d-74.77805412161933!3d10.938328443731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef5cd5f2b27a42b%3A0x99f4f5ec65e7898f!2sCra.%2041a%20%2333-77%2C%20Soledad%2C%20Atl%C3%A1ntico!5e0!3m2!1sen!2sco!4v1622174979430!5m2!1sen!2sco" width="100%" height="150" allowFullScreen="" loading="lazy" className="border-0"></iframe>
                </div>
            </div>

        </footer>
    );
}
export default Footer;