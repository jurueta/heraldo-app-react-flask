import React from 'react';
import Card from './Card.js';

const noticias = [
    {
        id: 1,
        title: 'Mayores de 65 años reciben sus primeras dosis en Barranquilla',
        info: '“Caso de trombo no estuvo relacionado con la vacuna”: Minsalud',
        img: ''
    }, {
        id: 2,
        title: 'Inassa advierte sobre situación financiera de la empresa Triple A',
        info: '',
        img: ''
    }, {
        id: 3,
        title: 'Robo de agua tiene en jaque servicio para residentes en Chorrera',
        info: '',
        img: ''
    }, {
        id: 4,
        title: 'El Carnaval ahora tiene su Festival de Artes Escénicas',
        info: 'El evento que se realizará durante este mes busca exaltar las expresiones relacionadas con la teatralidad y las puestas en escena.',
        img: 'https://www.elheraldo.co/sites/default/files/articulo/2021/03/04/chaplin.jpg'
    }
]

function CardsLeftSection() {
    return (
        
        <div className="row">
            {
                noticias.map(card => (
                    <div key={card.id}>
                        <Card title={card.title} info={card.info} img={card.img} />
                    </div>
                ))
            }
        </div>

    );
}

export default CardsLeftSection;