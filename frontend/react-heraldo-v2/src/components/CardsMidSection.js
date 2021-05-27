import React from 'react';
import CardPrincipal from './CardPrincipal.js'


const CardsMidSection = (props) => {
    const noticias = props.politicaSocial

    return (

        <div className="row p-3">
            {
                noticias.map(card => (
                    <div key={card.id}>
                        <CardPrincipal title={card.titulo} info={card.descripcion} img={card.imagen} id={card.id} />
                    </div>
                ))
            }
        </div>

    );
}

export default CardsMidSection;