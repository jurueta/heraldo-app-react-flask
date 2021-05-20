import React, { Fragment, useState } from 'react';
import './css/styleLogin.css'
import Register from './Register.jsx'
import axios from 'axios'

// Dirección de la API
const API = process.env.REACT_APP_API

const Login = () => {

    // valores de los inputs del formulario login
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    // Limpiar inputs del form login
    const clearInputs = () => {
        setUser('')
        setPassword('')
    }

    // Función que envía la petición para ingresar a la API
    const loginSubmit = async (e) => {
        e.preventDefault()
        // valores de los inputs del formulario login
        await axios.post(`${API}/auth`, {
            username: user,
            password: password
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data.access_token)
                localStorage.setItem('USER_SESSION', response.data.access_token) // Se crea la sección
                clearInputs()                
            }
        })
    }

    return (
        <Fragment>

            <div className="log-container">
                {/* Tabs*/}
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="log-tab" data-toggle="tab" href="#log" role="tab" aria-controls="log" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="regis-tab" data-toggle="tab" href="#reg" role="tab" aria-controls="reg" aria-selected="false">Registrarse</a>
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
                                    <label htmlFor="user" className="col-sm-3 col-form-label">Usuario:</label>
                                    <div className="col-sm-8">

                                        { /* input de usuario, se identifica como user*/}
                                        <input type="text"
                                            onChange={e => setUser(e.target.value)} value={user}
                                            className="form-control" name="user"
                                            autoFocus required></input>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="pass" className="col-sm-3 col-form-label">Contraseña:</label>
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
                    <div className="tab-pane fade" id="reg" role="tabpanel" aria-labelledby="regis-tab">

                        {/* Form para registrarse*/}
                        <Register />

                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default Login;