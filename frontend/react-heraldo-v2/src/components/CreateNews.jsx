import React, { useState } from 'react'


const CreateNews = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [journalist, setJournalist] = useState('')
    const [image, setImage] = useState('')
    const [abstract, setAbstract] = useState('')


    const createNewsSubmit = (e) => {
        e.preventDefault()
        // fetch
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="text-center mt-2">Creando una noticia</h5>
            </div>
            <div className="card-body">
                <div className="card-text">
                    <form onSubmit={createNewsSubmit} className="form-create">

                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-3 col-form-label">Título:</label>
                            <div className="col-sm-8">

                                { /* input del título de la noticia, se identifica como title*/}
                                <input type="text"
                                    onChange={e => setTitle(e.target.value)} value={title}
                                    className="form-control" name="title"
                                    required></input>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-3 col-form-label">Descripción:</label>
                            <div className="col-sm-8">

                                { /* input de la descripción, se identifica como description*/}
                                <input type="text"
                                    onChange={e => setDescription(e.target.value)} value={description}
                                    className="form-control" name="description"
                                    required></input>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="category" className="col-sm-3 col-form-label">Categoría:</label>
                            <div className="col-sm-8">

                                { /* input de teléfono, se identifica como category*/}
                                <input type="text"
                                    onChange={e => setCategory(e.target.value)} value={category}
                                    className="form-control" name="category"
                                    required></input>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="journalist" className="col-sm-3 col-form-label">Nombre del periodista:</label>
                            <div className="col-sm-8">

                                { /* input del periodista, se identifica como journalist*/}
                                <input type="text"
                                    onChange={e => setJournalist(e.target.value)} value={journalist}
                                    className="form-control" name="journalist"
                                    required></input>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="image" className="col-sm-3 col-form-label">Imagen:</label>
                            <div className="col-sm-8">

                                { /* input de la imagen, se identifica como image*/}
                                <input type="text"
                                    onChange={e => setImage(e.target.value)} value={image}
                                    className="form-control" name="image"
                                    required></input>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="abstract" className="col-sm-3 col-form-label">Resumen:</label>
                            <div className="col-sm-8">

                                { /* input de correo electrónico, se identifica como phone*/}
                                <textarea
                                    onChange={e => setAbstract(e.target.value)} value={abstract}
                                    className="form-control" name="abstract"
                                    rows="3"
                                    required></textarea>

                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-3">Crear</button>

                    </form>

                </div>
            </div>
        </div>

    );
}

export default CreateNews;