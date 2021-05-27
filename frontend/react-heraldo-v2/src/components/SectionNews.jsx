import axios from 'axios';
import React, { Component } from 'react'

import CardsLateralSection from './CardsLateralSection.js';
import CardsMidSection from './CardsMidSection.js';

// Dirección de la API
const API = process.env.REACT_APP_API

class SectionNews extends Component {
    constructor() {
        super()
        this.state = {
            deportes: [],
            politicaSocial: [],
            otros: []
        }
    }

    componentDidMount() {
        axios.get(`${API}/notice`).then(response => {
            if (response.status === 200) {
                response.data.map(notice => {
                    if (notice.categoria === 1 && notice.visible === 1) {
                        this.setState({ deportes: [...this.state.deportes, notice] })
                    } else if ((notice.categoria === 4 || notice.categoria === 7)
                        && notice.visible === 1) {
                        this.setState({ politicaSocial: [...this.state.politicaSocial, notice] })
                    } else if (notice.visible === 1) {
                        this.setState({ otros: [...this.state.otros, notice] })
                    }
                })
            }
        })
    }


    render() {

        return (
            <div className="row">
                <div className="col-md-3 col-sm-12">
                    <CardsLateralSection otros={this.state.otros} />
                </div>
                <div className="col-md-6 col-sm-12">
                    <CardsMidSection politicaSocial={this.state.politicaSocial} />
                </div>
                <div className="col-md-3 col-sm-12">
                    <CardsLateralSection deportes={this.state.deportes} />
                </div>
            </div>
        );
    }
}

export default SectionNews;