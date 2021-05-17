import React, { useState } from 'react'
import './css/styleRegister.css'

// Dirección de la API
const API =  process.env.REACT_APP_API

const Register = () => {

    const [allName, setAllName] = useState('')
    const [dir, setDir] = useState('')
    const [phone, setPhone] = useState('')
    const [regUser, setRegUser] = useState('')
    const [regPass, setRegPass] = useState('')
    const [mail, setMail] = useState('')

    // Función que envía la petición para registrarse a la API
    const registerSubmit = (e) => {
        e.preventDefault()
        // aquí va el fetch
    }

    return (
        <div className="log-container">

            <div className="regis text-center">
                <h4>Resgistrarse</h4>

                { /* Form de registrar, envía a /registrar*/}
                <form onSubmit={registerSubmit} className="text-center">

                    <div className="form-group row">
                        <label for="all-name" className="col-sm-3 col-form-label">Nombre completo:</label>
                        <div className="col-sm-8">

                            { /* input de nombre completo, se identifica como all-name*/}
                            <input type="text"
                                onChange={e => setAllName(e.target.value)} value={allName}
                                className="form-control" name="all-name"
                                required></input>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="direction" className="col-sm-3 col-form-label">Dirección:</label>
                        <div className="col-sm-8">

                            { /* input de dirección, se identifica como direction*/}
                            <input type="text"
                                onChange={e => setDir(e.target.value)} value={dir}
                                className="form-control" name="direction"
                                required></input>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="phone" className="col-sm-3 col-form-label">Teléfono:</label>
                        <div className="col-sm-8">

                            { /* input de teléfono, se identifica como phone*/}
                            <input type="text"
                                onChange={e => setPhone(e.target.value)} value={phone}
                                className="form-control" name="phone"
                                required></input>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="user" className="col-sm-3 col-form-label">Usuario:</label>
                        <div className="col-sm-8">

                            { /* input de usuario, se identifica como user*/}
                            <input type="text"
                                onChange={e => setRegUser(e.target.value)} value={regUser}
                                className="form-control" name="user"
                                required></input>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="pass" className="col-sm-3 col-form-label">Contraseña:</label>
                        <div className="col-sm-8">

                            { /* input de password, se identifica como pass*/}
                            <input type="password"
                                onChange={e => setRegPass(e.target.value)} value={regPass}
                                className="form-control" name="pass"
                                required></input>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="mail" className="col-sm-3 col-form-label">Correo:</label>
                        <div className="col-sm-8">

                            { /* input de correo electrónico, se identifica como phone*/}
                            <input type="email"
                                onChange={e => setMail(e.target.value)} value={mail}
                                className="form-control" name="mail"
                                required></input>

                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Registrar</button>

                </form>

            </div>

        </div>

    );

}

export default Register;