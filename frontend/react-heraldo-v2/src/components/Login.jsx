import React, { Fragment, useState } from 'react';
import './css/styleLogin.css'
import Register from './Register.jsx'

// Dirección de la API
const API =  process.env.REACT_APP_API

const Login = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    
    // Función que envía la petición para ingresar a la API
    const loginSubmit = (e) => {
        e.preventDefault()
        // aquí va el método fetch
    }

    return (
        <Fragment>

            <div className="log-container">
                {/* Tabs*/}
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="log-tab" data-toggle="tab" href="#log" role="tab" aria-controls="log" aria-selected="true">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="regis-tab" data-toggle="tab" href="#reg" role="tab" aria-controls="reg" aria-selected="false">Registrarse</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTanContent">

                    {/* Tab del Login*/}
                    <div className="tab-pane fade show active" id="log" role="tabpanel" aria-labelledby="log-tab">
                        <div className="login text-center">
                            <h4>Login</h4>

                            { /* Form del login, envía a /login*/}
                            <form onSubmit={loginSubmit} className="text-center" >

                                <div className="form-group row">
                                    <label for="user" className="col-sm-3 col-form-label">Usuario:</label>
                                    <div className="col-sm-8">

                                        { /* input de usuario, se identifica como user*/}
                                        <input type="text"
                                            onChange={e => setUser(e.target.value)} value={user}
                                            className="form-control" name="user"
                                            autoFocus required></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label for="pass" className="col-sm-3 col-form-label">Contraseña:</label>
                                    <div className="col-sm-8">

                                        { /* input de password, se identifica como pass*/}
                                        <input type="password"
                                            onChange={e => setPassword(e.target.value)} value={password}
                                            className="form-control" name="pass"
                                            required></input>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3">Ingresar</button>

                            </form>
                        </div>
                    </div>

                    {/* Tab del registrarse*/}
                    <div class="tab-pane fade" id="reg" role="tabpanel" aria-labelledby="regis-tab">

                        {/* Form para registrarse*/}
                        <Register />

                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default Login;