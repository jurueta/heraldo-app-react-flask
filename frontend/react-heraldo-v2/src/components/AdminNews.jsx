import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons'
import { FaPenNib, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Modal from 'react-modal';
import axios from 'axios'
import CreateNews from './CreateNews.jsx'
import './css/styleAdmin.css'

// configuración para el Modal
Modal.setAppElement('#root')

// Dirección de la API
const API = process.env.REACT_APP_API

const AdminNews = () => {

    //  hooks para abrir/cerrar modal y lista de noticias 
    const [open, setOpen] = useState(false)
    const [newsList, setNewsList] = useState([])

    const getNewsList = async () => {

        //Petición de las noticias
        await axios.get(`${API}/notice`
        ).then(response => {
            if (response.status === 200) { // Si se efectua la petición
                setNewsList(response.data)
            }
        })
    }

    useEffect(() => {
        getNewsList()
    }, [])

    return (

        <IconContext.Provider value={{ style: { margin: '2px 3px 5px' }, size: "1.2em" }}>
            <button type="button"
                onClick={() => { setOpen(true) }}
                className="btn btn-outline-success float-left btn-create"><FaPlusCircle />Crear noticia</button>

            {/* Modal create*/}
            <Modal className="center"
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                }>

                {/* formulario de creación de noticias*/}
                <CreateNews />

            </Modal>


            <div className="table-responsive news-table">
                <table className="table">
                    <thead>
                        <tr className="bg-primary text-center">
                            <th scope="col">Título</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Resumen</th>
                            <th scope="col" className="col-md-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map(notice => {
                            return (
                                <tr key= {notice.id}>
                                    <td>{notice.titulo}</td>
                                    <td>{notice.descripcion}</td>
                                    <td>{notice.resena}</td>
                                    <td className="text-center">
                                        <button className="btn btn-primary mr-2" name="edit"><FaPenNib /> Editar</button>
                                        <button className="btn btn-danger" name="delete"><FaTrashAlt /> Eliminar</button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </IconContext.Provider>
    );
}

export default AdminNews;