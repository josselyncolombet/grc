import React, { Component } from 'react';
import './Breadcrumb.scss'
import '../../App.css';


class Breadcrumb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }
    render() {
        return (
            <div className="container-fluid" id="breadcrumb">
                <div className="breadcrumb">
                    <div className="item">
                        <div className="surround">
                            <i class="gg-boy"></i>
                        </div>
                        <p>Prospects / Apprenants </p>
                    </div>
                
            </div>
            </div>
        );
    }
}


export default Breadcrumb;
