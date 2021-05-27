import axios from 'axios'
import React, { Component } from 'react'
import { FaTimes } from 'react-icons/fa'

// Dirección de la API
const API = process.env.REACT_APP_API

class CreateNews extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Lista de categorías
            categories: [],

            // inputs del formulario noticia
            title: '',
            description: '',
            category: '',
            journalist: '',
            image: '',
            abstract: '',
            editImage: false
        }

    }


    componentDidMount() {

        // Hace una petición para obtener la lista de categorías 
        axios.get(`${API}/category`
        ).then(response => {
            if (response.status === 200) {// Si se efectua la petición
                console.log(response.data)
                this.setState({ categories: response.data })
            }
        })

        if (this.props.edit.status) {
            console.log(this.props.edit.id)
            axios.get(`${API}/notice/${this.props.edit.id}`, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('USER_SESSION')}`,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(response => {
                if (response.status === 200) {// Si se efectua la petición
                    let data = response.data[0]
                    this.setState(
                        {
                            title: data.titulo,
                            description: data.descripcion,
                            category: data.categoria,
                            journalist: data.autor,
                            image: data.imagen,
                            abstract: data.resena
                        }
                    )
                    document.getElementById("categories").value = data.categoria
                }
            })

        }

    }

    // Guarda la opción seleccionada en la lista de categorías
    categorySelected = (e) => {
        console.log(e.target.value)
        this.setState({ category: e.target.value })
    }


    //Exportaciónde la notica en la base de datos
    createNewsSubmit = async () => {
        // Petición para la creación de la noticia
        if (this.state.category !== '') {
            let parametros = {
                titulo: this.state.title,
                descripcion: this.state.description,
                categoria: this.state.category,
                resena: this.state.abstract,
                imagen: this.state.image,
                autor: this.state.journalist
            }
            await axios.post(`${API}/notice`,
                parametros
                , {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('USER_SESSION')}`,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
            ).then(response => {
                if (response.status === 200) {// Si se efectua la petición
                    const { noticeCallBack } = this.props
                    noticeCallBack(response.data[0])
                    console.log(response.data[0])
                    alert("¡Se creó la noticia con éxito!")
                    this.props.closeModal()
                }
            })
        }
    }


    //Exportación de la edición de noticas en la base de datos
    editNewsSubmit = async () => {

        let parametros = {
            titulo: this.state.title,
            descripcion: this.state.description,
            categoria: this.state.category,
            resena: this.state.abstract,
            imagen: this.state.image,
            autor: this.state.journalist
        }
        if (!this.state.editImage) { // Si no se cambia la imagen, entonces no se envía
            delete parametros.imagen
        }
        console.log(parametros)
        // Petición para la edición de la noticia seleccionada
        if (this.state.category !== '') {
            await axios.put(`${API}/notice/${this.props.edit.id}`,
                parametros
                , {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem('USER_SESSION')}`,
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
            ).then(response => {
                if (response.status === 200) {// Si se efectua la petición
                    const { noticeCallBack } = this.props
                    noticeCallBack(response.data[0])
                    console.log(response.data[0])                    
                    alert("¡Se editó la noticia con éxito!")
                    this.props.closeModal()
                }
            })
        }
    }

    //Crea o edita la noticia
    createOrEdit = async (e) => {
        e.preventDefault()
        if (this.props.edit.status) {
            console.log("editar")
            this.editNewsSubmit()
        } else {
            console.log("crear")
            this.createNewsSubmit()
        }
    }


    // Transforma una imagen a base64
    async encaodeImageFileAsURL() {
        let file = document.getElementById("image").files
        if (file.length >= 0) {
            let fileToLoad = file[0]  // imagen
            let fileReader = new FileReader() //lector de imagenes
            var base64//base64 de la imagen escogida

            fileReader.onload = async (fileLoadedEvent) => {
                let srcData = fileLoadedEvent.target.result
                base64 = srcData.split(",")[1] //base64
                this.setState({ image: base64 })
                console.log(this.state.image)
                if (this.props.edit.status) {
                    this.setState({ editImage: true })
                }
            }

            fileReader.readAsDataURL(fileToLoad)
        }
    }


    render() {


        return (

            < div className="card" >
                <div className="card-header">
                    <button type="button"
                        className="btn float-right" onClick={() => { this.props.closeModal() }}><FaTimes /></button>

                    <h5 className="text-center mt-2">{this.props.edit.status ? 'Editando noticia' : 'Creando noticia'}</h5>

                </div>
                <div className="card-body">
                    <div className="card-text">
                        <form onSubmit={this.createOrEdit} className="form-create">

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-3 col-form-label">Título:</label>
                                <div className="col-sm-8">

                                    { /* input del título de la noticia, se identifica como title*/}
                                    <input type="text"
                                        onChange={e => this.setState({ title: e.target.value })}
                                        value={this.state.title}
                                        className="form-control" name="title"
                                        required></input>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="description" className="col-sm-3 col-form-label">Descripción:</label>
                                <div className="col-sm-8">

                                    { /* input de la descripción, se identifica como description*/}
                                    <input type="text"
                                        onChange={e => this.setState({ description: e.target.value })}
                                        value={this.state.description}
                                        className="form-control" name="description"
                                        required></input>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="category" className="col-sm-3 col-form-label">Categoría:</label>
                                <div className="col-sm-8">

                                    { /* input de teléfono, se identifica como category*/}
                                    <select className="form-control" id="categories" onChange={this.categorySelected} required>
                                        <option value="0"></option>
                                        {this.state.categories.map(cate => {
                                            return (
                                                <option key={cate.id} value={cate.id}>{cate.nombre}</option>
                                            )
                                        })}

                                    </select>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="journalist" className="col-sm-3 col-form-label">Nombre del periodista:</label>
                                <div className="col-sm-8">

                                    { /* input del periodista, se identifica como journalist*/}
                                    <input type="text"
                                        onChange={e => this.setState({ journalist: e.target.value })}
                                        value={this.state.journalist}
                                        className="form-control" name="journalist"
                                        required></input>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="image" className="col-sm-3 col-form-label">Imagen:</label>
                                <div className="col-sm-8">

                                    { /* input de la imagen, se identifica como image*/}
                                    {

                                        this.props.edit.status ? //Si está en edición entonces imprime una imagen
                                            <div className="rows">
                                                {!this.state.editImage &&
                                                    <img className="rounded img-fluid" id="img-notice" src={this.state.image} alt="img-heraldo"></img>
                                                }
                                                <input type="file"
                                                    onChange={e => this.encaodeImageFileAsURL(e.target.value)}
                                                    className="form-control-file mt-2"
                                                    name="image" id="image">
                                                </input>
                                            </div>

                                            : //Si no, entonces imprime un input file
                                            <input type="file"
                                                onChange={e => this.encaodeImageFileAsURL(e.target.value)}
                                                className="form-control-file mt-2"
                                                name="image" id="image"
                                                required></input>

                                    }

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="abstract" className="col-sm-3 col-form-label">Resumen:</label>
                                <div className="col-sm-8">

                                    { /* input de correo electrónico, se identifica como phone*/}
                                    <textarea
                                        onChange={e => this.setState({ abstract: e.target.value })}
                                        value={this.state.abstract}
                                        className="form-control"
                                        name="abstract"
                                        rows="3"
                                        required></textarea>

                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">{this.props.edit.status ? 'Editar' : 'Crear'}</button>

                        </form>

                    </div>
                </div>
            </div >
        )
    }
}

export default CreateNews;