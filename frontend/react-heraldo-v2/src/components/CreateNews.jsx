import axios from 'axios'
import React, { Component } from 'react'

// Dirección de la API
const API = process.env.REACT_APP_API

class CreateNews extends Component {
    constructor() {
        super()
        this.state = {
            // Lista de categorías
            categories: [],

            // inputs del formulario noticia
            title: '',
            description: '',
            category: '',
            journalist: '',
            image: '',
            abstract: ''
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
    }

    // Guarda la opción seleccionada en la lista de categorías
    categorySelected = (e) => {
        console.log(e.target.value)
        this.setState({ category: e.target.value })
    }

    createNewsSubmit = (e) => {
        e.preventDefault()
        // Petición para la creación de la noticia
        if (this.state.category !== '') {
            axios.post(`${API}/notice`, {
                titulo: this.state.title,
                descripcion: this.state.description,
                categoria: this.state.category,
                resena: this.state.abstract,
                imagen: this.state.image,
                autor: this.state.journalist
            }, {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('USER_SESSION')}`,
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
            ).then(response => {
                console.log(response.data)
            })
        }
    }

    // Transforma una imagen a base64
    async encaodeImageFileAsURL() {
        let file = document.getElementById("image").files
        if (file.length > 0) {
            let fileToLoad = file[0] // imagen
            let fileReader = new FileReader() //lector de imagenes
            var base64 //base64 de la imagen escogida

            fileReader.onload = async (fileLoadedEvent) => {
                let srcData = fileLoadedEvent.target.result
                base64 = srcData.split(",")[1] //base64
                this.setState({ image: base64 })
                console.log(this.state.image)
            }

            fileReader.readAsDataURL(fileToLoad)
        }
    }


    render() {

        return (

            < div className="card" >
                <div className="card-header">
                    <h5 className="text-center mt-2">Creando una noticia</h5>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <form onSubmit={this.createNewsSubmit} className="form-create">

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
                                    <select className="form-control" onChange={this.categorySelected} required>
                                        <option></option>
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
                                    <input type="file"
                                        onChange={e => this.encaodeImageFileAsURL(e.target.value)}
                                        className="form-control-file mt-2"
                                        name="image" id="image"
                                        required></input>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="abstract" className="col-sm-3 col-form-label">Resumen:</label>
                                <div className="col-sm-8">

                                    { /* input de correo electrónico, se identifica como phone*/}
                                    <textarea
                                        onChange={e => this.setState({ abstract: e.target.value })}
                                        value={this.state.abstract}
                                        className="form-control" name="abstract"
                                        rows="3"
                                        required></textarea>

                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary mt-3">Crear</button>

                        </form>

                    </div>
                </div>
            </div >
        )
    }
}

export default CreateNews;