import React, { useState } from 'react';
import { IconContext } from 'react-icons'
import { FaPenNib, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import Modal from 'react-modal';
import CreateNews from './CreateNews.jsx'
import './css/styleCreate.css'

Modal.setAppElement('#root')


const AdminNews = () => {
    const [open, setOpen] = useState(false)

    return (

        <IconContext.Provider value={{ style: { margin: '2px 3px 5px' }, size: "1.2em" }}>
            <button type="button"
                onClick={() => { setOpen(true) }}
                className="btn btn-outline-success float-left m-5"><FaPlusCircle />Crear noticia</button>

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


            <div className="table-responsive log-container">
                <table className="table">
                    <thead>
                        <tr className="bg-primary text-center">
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th scope="col" className="col-md-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td className="text-center">
                                <button className="btn btn-primary mr-2" name="edit"><FaPenNib /> Editar</button>
                                <button className="btn btn-danger" name="delete"><FaTrashAlt /> Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </IconContext.Provider>
    );
}

export default AdminNews;