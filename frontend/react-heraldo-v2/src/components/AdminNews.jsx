import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import {
  FaPenNib,
  FaTrashAlt,
  FaPlusCircle,
  FaRegEyeSlash,
  FaRegEye,
} from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import CreateNews from "./CreateNews.jsx";
import "./css/styleAdmin.css";
import Swal from "sweetalert2";

// configuración para el Modal
Modal.setAppElement("#root");

// Dirección de la API
const API = process.env.REACT_APP_API;

const AdminNews = () => {
  if (!localStorage.getItem("USER_SESSION")) {
    window.location.href = "/login";
  }

  //  hooks para abrir/cerrar modal y lista de noticias
  const [open, setOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [edit, setEdit] = useState({ id: -1, status: false });

  const getNewsList = async () => {
    //Petición de las noticias
    await axios.get(`${API}/notice`).then((response) => {
      if (response.status === 200) {
        // Si se efectua la petición
        setNewsList(response.data);
      }
    });
  };

  // Al renderizar la página admin se ejecuta la función getNewsList()
  useEffect(() => {
    getNewsList();
  }, []);

  //Cerrar modal crear/editar noticias
  const closeModal = () => {
    setOpen(false);
    if (edit.status) {
      // si el estado de editar es true: inhabilita edit
      setEdit({ id: -1, status: false });
    }
  };

  // callBack de noticas creadas
  const insertValue = (noticia) => {
    if (edit.status) {
      // actualiza la noticia editada
      let indexEdit = newsList
        .map((item) => {
          return item.id;
        })
        .indexOf(noticia.id);
      newsList[indexEdit] = noticia;
    } else {
      newsList.push(noticia);
    }
  };

  //Borrar noticia
  const deleteNotice = async (id) => {
    /*   const deleteResponse = window.confirm("¿Estás seguro de que desea borrar esta noticia?") */
    Swal.fire({
      title: "Deleted",
      text: "¿Estás seguro de que desea borrar esta noticia?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${API}/notice/${id}`, {
            headers: {
              Authorization: `JWT ${localStorage.getItem("USER_SESSION")}`,
              "Content-Type": "application/json; charset=utf-8",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              // Si se efectua la petición
              setNewsList(
                newsList.filter(
                  (
                    item // Actualiza la lista de noticias cuando se borra una
                  ) => item.id !== id
                )
              );
            }
          });
      }
    });
  };

  // Edita la visibilización de la notica
  const visibleNoticie = (id, visible) => {
    let parametros = {
      visible: "0",
    };
    if (visible === 0) {
      parametros.visible = "1";
    }

    axios
      .put(`${API}/notice/${id}`, parametros, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("USER_SESSION")}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          getNewsList();
        }
      });
  };

  return (
    <IconContext.Provider
      value={{ style: { margin: "2px 3px 5px" }, size: "1.2em" }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className="btn btn-outline-success float-left btn-create py-3"
      >
        <FaPlusCircle />
        Crear noticia
      </button>

      {/* Modal create*/}
      <Modal
        className="center"
        isOpen={open}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {/* formulario de creación de noticias*/}
        <CreateNews
          noticeCallBack={insertValue}
          closeModal={closeModal}
          edit={edit}
        />
      </Modal>

      <div className="table-responsive news-table">
        <table className="table white">
          <thead>
            <tr className="bg-primary text-center">
              <th scope="col">Título</th>
              <th scope="col">Descripción</th>
              <th scope="col">Resumen</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Invisibilizar</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((notice) => {
              return (
                <tr key={notice.id}>
                  <td>
                    {" "}
                    <textarea
                      className="form-control p-1"
                      rows="4"
                      readOnly
                      value={notice.titulo}
                    ></textarea>
                  </td>
                  <td>
                    {" "}
                    <textarea
                      className="form-control p-1"
                      rows="4"
                      readOnly
                      value={notice.descripcion}
                    ></textarea>{" "}
                  </td>
                  <td>
                    <textarea
                      className="form-control p-1"
                      rows="4"
                      readOnly
                      value={notice.resena}
                    ></textarea>
                  </td>
                  <td className="align-middle">
                    <div className="row mx-0 d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-primary p-0 pr-1 mb-1"
                        name="edit"
                        onClick={() => {
                          setEdit({ id: notice.id, status: true });
                          setOpen(true);
                        }}
                      >
                        <FaPenNib className="fz-30 p-2" />
                      </button>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="row mx-0 d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-danger p-0 pr-1 mb-1"
                        name="delete"
                        onClick={() => deleteNotice(notice.id)}
                      >
                        <FaTrashAlt className="fz-30 p-2" />
                      </button>
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="row mx-0 d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-dark p-0 pr-1"
                        name="visible"
                        onClick={() =>
                          visibleNoticie(notice.id, notice.visible)
                        }
                      >
                        {notice.visible === 0 ? (
                          <FaRegEyeSlash className="fz-30 p-2" />
                        ) : (
                          <FaRegEye className="fz-30 p-2" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </IconContext.Provider>
  );
};

export default AdminNews;
