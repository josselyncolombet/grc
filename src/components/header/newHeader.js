import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FormStudent from './../form/formStudent/FormStudent'
import FormEnterprise from './../form/formEnterprise/FormEnterprise'
import FormEmployment from './../form/formEmployment/FormEmployment'
import SlidingPanel from 'react-sliding-side-panel'
import './Header.scss'
import '../../App.css';
import { connect } from 'react-redux';
import * as fromActions from '../../actions'
import logo from '../../img/logo.png';


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="row" style={{ borderBottom: '2px solid #ececec' }}>
                <div className="col-2">
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '.5rem' }}>
                        <img src={logo} className="img-fluid" style={{ height: '45px' }} />
                    </div>
                </div>
                <div className="col-10">
                    <div className="links">
                        <div className="navitems">
                            <i className="gg-home"></i>
                            Objectifs
                    </div>
                        <div className="navitems">
                            <i className="gg-boy"></i>
                            Prospects
                    </div>
                        <div className="navitems">
                            <i className="gg-organisation"></i>
                            <Link to="/enterprise" style={{ marginLeft: '0.5rem' }} role="button">Entreprises</Link>
                        </div>
                        <div className="navitems">
                            <i className="gg-boy"></i>
                            Hub
                    </div>
                        <div className="navitems">
                            <i className="gg-boy"></i>
                            Retroplanning
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    addStudent: (student) => dispatch(fromActions.addStudent(student)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Header)