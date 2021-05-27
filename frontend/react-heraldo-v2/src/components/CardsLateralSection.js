import React from 'react';
import Card from './Card.js';


function CardsLateralSection(props) {
    const noticias = props.deportes || props.otros
    return (

        <div className="row">
            {
                noticias.map(card => (
                    <div key={card.id}>
                        <Card title={card.titulo} info={card.descripcion} img={card.imagen} id={card.id} />
                    </div>
                ))
            }
        </div>

    );
}

export default CardsLateralSection;