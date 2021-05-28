import React from 'react';
import './css/styleCard.css'

function CardPrincipal({ title, info, img, id }) {
    return (
        <a href={`notice/${id}`}>
            <div className="card text-center">
                <div className="card-body">
                    <div className="col-12 p-0">
                        <h2 className="card-title fz-24 font-weight-bold">
                            {title}
                        </h2>
                        <img className="img-fluid rounded" src={img}></img>
                        <p className="card-text text-secondary mt-2">
                            {info}
                        </p>
                        
                    </div>
                </div>
            </div>
        </a>
    );
}

export default CardPrincipal;