import React from 'react';
import Card from './Card.js';
import CardPrincipal from './CardPrincipal.js'

const noticias = [
    {
        id: 1,
        title: 'En 15 días se han reportado más de 30 mil nuevos casos en Barranquilla',
        info: 'Casos coronavirus',
        img: 'https://www.elheraldo.co/sites/default/files/styles/560x336/public/articulo/2021/04/15/whatsapp_image_2021-04-15_at_9.35.26_pm.jpeg?itok=csI-U1pD'
    }, {
        id: 2,
        title: 'Confinamiento en Barranquilla y Atlántico comienza a las 6 p. m.',
        info: 'Toque de queda continuo y ley seca estarán vigentes hasta las 5:00 a. m. del lunes 19 de abril. Establecimientos de comercio podrán vender a domicilio.',
        img: 'https://www.elheraldo.co/sites/default/files/styles/200x113/public/articulo/2021/04/15/whatsapp_image_2021-04-15_at_10.19.31_pm.jpeg?itok=uRIpXN67'
    }, {
        id: 3,
        title: 'Los cinco puntos de la tributaria que impactarían en su bolsillo',
        info: 'El proyecto fue radicado con mensaje de urgencia ¬ Conozca los puntos más destacados del documento.',
        img: 'https://www.elheraldo.co/sites/default/files/styles/200x113/public/articulo/2021/04/15/billetes_reforma_tributaria.jpg?itok=te7tMSjs'
    }, {
        id: 4,
        title: 'Alerta por uso de uniformes de la salud para cometer atracos',
        info: '',
        img: 'https://www.elheraldo.co/sites/default/files/styles/300x168/public/articulo/2021/04/15/robo-boston.jpg?itok=NA8M61f4'
    }
]

// Si es la noticia uno se presenta como principal, sino como noticias normales
const noticiaPrincipal = (id, title, info, img) => {
    switch (id) {
        case 1:
            return (
                <CardPrincipal title={title} info={info} img={img} />
            );

        default:
            return (
                <Card title={title} info={info} img={img} />
            );
    }

}

function CardsMidSection() {
    return (

        <div className="row p-3">
            {
                noticias.map(card => (
                    <div key={card.id}>
                        {noticiaPrincipal(card.id, card.title, card.info, card.img)}
                    </div>
                ))
            }
        </div>

    );
}

export default CardsMidSection;