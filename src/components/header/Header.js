import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Header.scss'
import '../../App.css';

import logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }
    render() {
        return (
            <div className="container-fluid" style={{ background: this.props.white ? '#d2eef9' : 'white' }} id="header">

                <div className="row navb" style={{ background: this.props.white ? '#d2eef9' : 'white' }}>
                    <div className="logo">

                        <img src={logo} height="35" alt="logo" className="logo-img" />

                    </div>
                    <div className="links">
                        <div className="navitems">
                            <i className="gg-home"></i>
                            <p>Accueil</p>
                        </div>
                        <div className="navitems">
                            <i className="gg-boy"></i>
                            <p>Prospects / Apprenants</p>
                        </div>
                        <div className="navitems">
                            <i className="gg-organisation"></i>
                            <p style={{ marginLeft: '1.4rem' }}>Entreprises</p>
                        </div>
                        <div className="navitems">
                            <i className="gg-briefcase"></i>
                            <p>Fiches de poste</p>
                        </div>
                        <div className="navitems">
                            <i className="gg-dribbble"></i>
                            <p>Hub</p>
                        </div>

                    </div>
                    <div>
                        <div className="search">
                            <input type="text" className="form-control searchbar" />
                            <button className="btn btn-primary"> Rechercher</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default Header;
