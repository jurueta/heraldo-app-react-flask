import React from 'react';
import './css/styleCard.css'

// Envía un tipo de carta dependiendo del contenido
const cardImg = (title, info, img) => {
    if (img === '') {
        return (
            <div className="col-12">
                <h4 className="card-title font-weight-bold">
                    {title}
                </h4>
                <p className="card-text text-secondary mb-3 fz-13">
                    {info}
                </p>
            </div>
        );
    } else {
        return (
            <React.Fragment>
                <div className="col-12">
                    <h4 className="card-title font-weight-bold">
                        {title}
                    </h4>
                    <p className="card-text text-secondary mb-3 fz-18">
                        {info}
                    </p>
                </div>
                <img className="w-100 img-fluid rounded" src={img} alt={''}></img>
            </React.Fragment>
        );
    }
}

function Card({ title, info, img, id }) {
    return (
        <a href={`notice/${id}`} className="w-100">
            <div className="card text-center">
                <div className="card-body px-2 pt-4">
                    <div className="row mx-0">
                        {cardImg(title, info, img)}
                    </div>
                </div>
            </div>
        </a>
    );
}
export default Card;