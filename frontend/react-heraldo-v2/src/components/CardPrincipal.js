import React from 'react';
import './css/styleCard.css'

function CardPrincipal({ title, info, img }) {
    return (
        <a href="#">
            <div className="card text-center">
                <div className="card-body">
                    <div className="col-12 p-0">
                        <h4 className="card-title font-weight-bold">
                            {title}
                        </h4>
                        <p className="card-text text-secondary">
                            {info}
                        </p>
                        <img className="img-fluid rounded" src={img}></img>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default CardPrincipal;