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
            menu: false,
            openCreateStudentPanel: false,
            openCreateEnterprisePanel: false,
            openCreateEmployment: false,
            openExport: false
        }
    }

    setOpenCreatePanel = (bool) => {
        switch (bool) {
            case "student":
                this.setState({
                    openCreateStudentPanel: true,
                    openCreateEnterprisePanel: false,
                    openCreateEmployment: false,
                    openExport: false
                })
                break;
            case "enterprise":
                this.setState({
                    openCreateStudentPanel: false,
                    openCreateEnterprisePanel: true,
                    openCreateEmployment: false,
                    openExport: false
                })
                break;
            case "employment":
                this.setState({
                    openCreateStudentPanel: false,
                    openCreateEnterprisePanel: false,
                    openCreateEmployment: true,
                    openExport: false
                })
                break;
            case "export":
                this.setState({
                    openCreateStudentPanel: false,
                    openCreateEnterprisePanel: false,
                    openCreateEmployment: false,
                    openExport: true
                })
                break;

            default:
                this.setState({
                    openCreateStudentPanel: false,
                    openCreateEnterprisePanel: false,
                    openCreateEmployment: false,
                    openExport: false
                })
                break;
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

    handleReactSelectChange = selectedOptions => {
        let trainings = selectedOptions.map(t => t.value)
        this.setState({ trainings: trainings })
    };

    render() {
        return (

            <div className="sidebar">
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

                {/*<div className="actions">
                    <button className="btn btn-primary btn-block" onClick={() => this.setOpenCreatePanel("student")}> <div className="btn-add-student"><i className="gg-add" /> Créer un étudiant</div></button>
                    <button className="btn btn-primary btn-block" onClick={() => this.setOpenCreatePanel("enterprise")}> <div className="btn-add-student"><i className="gg-add" /> Créer une entreprise</div></button>
                    <button className="btn btn-primary btn-block" onClick={() => this.setOpenCreatePanel("employment")}> <div className="btn-add-student"><i className="gg-add" /> Créer une offre d'emploi</div></button>
                    <button className="btn btn-export btn-block" onClick={() => this.setOpenCreatePanel("export")}> <div className="btn-add-student"><i className="gg-add" /> Exporter en csv</div></button>
        </div>*/}


                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openCreateStudentPanel}
                    backdropClicked={() => this.setState({ openCreateStudentPanel: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <FormStudent />
                </SlidingPanel>

                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openCreateEnterprisePanel}
                    backdropClicked={() => this.setState({ openCreateEnterprisePanel: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <FormEnterprise />
                </SlidingPanel>

                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openCreateEmployment}
                    backdropClicked={() => this.setState({ openCreateEmployment: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <FormEmployment />
                </SlidingPanel>

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