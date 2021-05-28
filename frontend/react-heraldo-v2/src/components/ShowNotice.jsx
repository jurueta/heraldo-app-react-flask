import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

// Dirección de la API
const API = process.env.REACT_APP_API


const ShowNotice = () => {
    const [noticia, setNoticia] = useState({})

    const { id } = useParams()
    useEffect(() => {
        axios.get(`${API}/notice/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setNoticia(response.data[0])
                }
            })
    }, [])

    return (
        <div className="container bg-white text-center mt-5 mb-5">
            <div className="card m-auto" style={{ maxWidth: "50rem" }}>
                <div className="card">
                    <h1 className="font-weight-bold">{noticia.titulo}</h1>
                    <h4>{noticia.descripcion}</h4>
                </div>
                <div className="card-body">
                    <img className="img-fluid img-thumbnail" src={noticia.imagen} alt={noticia.titulo} />
                </div>
                <p className="font-weight-lighter">Hora de la publicación: {noticia.hora}</p>
                <p className="font-weight-lighter">Autor: {noticia.autor}</p>
                <h5 className="text-left nl-1-4">{noticia.resena}</h5>
            </div>
        </div>
    )
}

export default ShowNotice