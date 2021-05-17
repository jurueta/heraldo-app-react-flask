import React from 'react'

import CardsLeftSection from './CardsLeftSection.js';
import CardsMidSection from './CardsMidSection.js';

const SectionNews = () => {
    return (
        <div className="row">
            <div className="col-md-3 col-sm-12">
                <CardsLeftSection />
            </div>
            <div className="col-md-6 col-sm-12">
                <CardsMidSection />
            </div>
            <div className="col-md-3 col-sm-12">
                <CardsLeftSection />
            </div>
        </div>
    );
}

export default SectionNews;