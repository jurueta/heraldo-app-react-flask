import React from 'react';
import './css/styleCard.css'

// Envía un tipo de carta dependiendo del contenido
const cardImg = (title, info, img) => {
    if (img === '') {
        return (
            <div className="col-12 p-0">
                <h4 className="card-title font-weight-bold">
                    {title}
                </h4>
                <p className="card-text text-secondary">
                    {info}
                </p>
            </div>
        );
    } else {
        return (
            <div className="container-flex">
                <div className="col-7 p-0">
                    <h4 className="card-title font-weight-bold">
                        {title}
                    </h4>
                    <p className="card-text text-secondary">
                        {info}
                    </p>
                </div>
                <img className="col-5 p-0 img-fluid rounded" src={img} alt={''}></img>
            </div>
        );
    }
}

function Card({ title, info, img, id }) {
    return (
        <a href={`notice/${id}`}>
            <div className="card text-center">
                <div className="card-body">
                    <div className="row">
                        {cardImg(title, info, img)}
                    </div>
                </div>
            </div>
        </a>
    );
}
export default Card;