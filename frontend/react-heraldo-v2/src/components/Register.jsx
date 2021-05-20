import React, { useState } from 'react'
import './css/styleRegister.css'
import axios from 'axios'

// Dirección de la API
const API = process.env.REACT_APP_API

const Register = () => {

    // valores de los inputs del formulario registrar
    const [allName, setAllName] = useState('')
    const [dir, setDir] = useState('')
    const [phone, setPhone] = useState('')
    const [regUser, setRegUser] = useState('')
    const [regPass, setRegPass] = useState('')
    const [mail, setMail] = useState('')

    // función que limpia los inputs después de que se envía la petición
    const clearInputs = () => {
        setAllName('')
        setDir('')
        setPhone('')
        setRegUser('')
        setRegPass('')
        setMail('')
    }

    // Función que envía la petición para registrarse a la API
    const registerSubmit = async (e) => {
        e.preventDefault()

        // axios que envia el formulario registro
        await axios.post(`${API}/user`, {
            nombre: allName,
            direccion: dir,
            telefono: parseInt(phone),
            email: mail,
            username: regUser,
            password: regPass
        }).then(response => {
            if (response.status === 200) { // Si se efectua la petición
                console.log(response)
                clearInputs()
            }
        })

    }

    return (
        <div className="regis text-center">
            <h4>Resgistrarse</h4>

            { /* Form de registrar, envía a /registrar*/}
            <form onSubmit={registerSubmit} className="text-center">

                <div className="form-group row">
                    <label htmlFor="all-name" className="col-sm-3 col-form-label">Nombre completo:</label>
                    <div className="col-sm-8">

                        { /* input de nombre completo, se identifica como all-name*/}
                        <input type="text"
                            onChange={e => setAllName(e.target.value)} value={allName}
                            className="form-control" name="all-name"
                            required></input>

                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="direction" className="col-sm-3 col-form-label">Dirección:</label>
                    <div className="col-sm-8">

                        { /* input de dirección, se identifica como direction*/}
                        <input type="text"
                            onChange={e => setDir(e.target.value)} value={dir}
                            className="form-control" name="direction"
                            required></input>

                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-3 col-form-label">Teléfono:</label>
                    <div className="col-sm-8">

                        { /* input de teléfono, se identifica como phone*/}
                        <input type="text"
                            onChange={e => setPhone(e.target.value)} value={phone}
                            className="form-control" name="phone"
                            required></input>

                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="user" className="col-sm-3 col-form-label">Usuario:</label>
                    <div className="col-sm-8">

                        { /* input de usuario, se identifica como user*/}
                        <input type="text"
                            onChange={e => setRegUser(e.target.value)} value={regUser}
                            className="form-control" name="user"
                            required></input>

                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="pass" className="col-sm-3 col-form-label">Contraseña:</label>
                    <div className="col-sm-8">

                        { /* input de password, se identifica como pass*/}
                        <input type="password"
                            onChange={e => setRegPass(e.target.value)} value={regPass}
                            className="form-control" name="pass"
                            required></input>

                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="mail" className="col-sm-3 col-form-label">Correo:</label>
                    <div className="col-sm-8">

                        { /* input de correo electrónico, se identifica como mail*/}
                        <input type="email"
                            onChange={e => setMail(e.target.value)} value={mail}
                            className="form-control" name="mail"
                            required></input>

                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Registrar</button>

            </form>

        </div>



    );

}

export default Register;