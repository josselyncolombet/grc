import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SlidingPanel from 'react-sliding-side-panel'
import Select from 'react-select'
import './Header.scss'
import '../../App.css';
import { connect } from 'react-redux';
import * as fromActions from '../../actions'
import logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const options = [
    { value: 'BTS SIO', label: 'BTS SIO' },
    { value: 'TIIS', label: 'TIIS' },
    { value: 'Cycle ESI', label: 'Cycle ESI' },
    { value: 'Bachelor RPI', label: 'Bachelor RPI' },
    { value: 'Licence RPI', label: 'Licence RPI' },
    { value: 'Master ESI', label: 'Master ESI' }
]

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false,
            openCreatePanel:false
        }
    }

    setOpenCreatePanel = (bool) => {
        this.setState({
            openCreatePanel: bool
        })
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
        let trainings= selectedOptions.map(t => t.value)
        this.setState({ trainings: trainings })
    };

    render() {
        return (

            <div className="col-2 sidebar">
                <div className="links">
                     <div style={{ fontWeight: 'bold', fontSize: '1.2rem', padding: '1.4rem' }}>
                    <img src={logo} className="img-fluid" style={{ height: '45px' }} /> Dashboard
                </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', color: '#6D757D', padding: '1rem' }}>
                        <i className="gg-search" /><input type="text" className="form-control" placeholder="Rechercher..." style={{ border: 'none' }} />
                    </div>
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
                        <class style={{ marginLeft: '0.5rem' }}>Entreprises</class>
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

                <div className="actions">
                    <button className="btn btn-primary btn-block" onClick={() => this.setOpenCreatePanel(true)}> <div className="btn-add-student"><i className="gg-add" /> Créer un étudiant</div></button>
                    <button className="btn btn-export btn-block" onClick={() => this.setOpenCreatePanel(true)}> <div className="btn-add-student"><i className="gg-add" /> Exporter en csv</div></button>
                </div>


                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openCreatePanel}
                    backdropClicked={() => this.setState({ openCreatePanel: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <div className="details">
                        <div className="name">Ajouter un prospect</div>
                    </div>
                    <div className="form-student">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="name">Nom</label>
                                <input type="text" className="form-control form-control-sm" id="name" name="name" placeholder="Nom" onChange={(e) => this.handleInputChange(e)}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="firstname">Prénom</label>
                                <input type="text" className="form-control form-control-sm" id="firstname" name="firstname" placeholder="Prénom" onChange={(e) => this.handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" className="form-control form-control-sm" id="email" name="email" placeholder="Email" onChange={(e) => this.handleInputChange(e)} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="phone">Téléphone</label>
                                <input type="text" className="form-control form-control-sm" id="phone" name="phone" placeholder="Téléphone" onChange={(e) => this.handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="address">Adresse</label>
                                <input type="text" className="form-control form-control-sm" id="address" name="address" placeholder="Adresse" onChange={(e) => this.handleInputChange(e)} />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="city">Ville</label>
                                <input type="text" className="form-control form-control-sm" id="city" name="city" placeholder="Ville" onChange={(e) => this.handleInputChange(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputState">Cursus</label>
                                <select name="cursus" className={this.state.cursus != 'Cursus' ? 'custom-select blue' : 'custom-select'} value={this.state.cursus} onChange={(e) => this.handleInputChange(e)}>
                                    <option defaultValue>Cursus</option>
                                    <option value="Bac G/T - Terminale">Bac G/T - Terminale</option>
                                    <option value="Bac G/T - Premiere">Bac G/T - Premiere</option>
                                    <option value="Bac G/T - Seconde">Bac G/T - Seconde</option>
                                    <option value="Bac Pro">Bac Pro</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputState">Source</label>
                                <select name="source" className={this.state.source != 'Source' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                                    <option defaultValue>Source</option>
                                    <option value="jivochat">Jivochat</option>
                                    <option value="Lyon - Salon de l'étudiant">Lyon - Salon de l'étudiant</option>
                                    <option value="Valence- Salon de l'étudiant">Valence - Salon de l'étudiant</option>
                                    <option value="Grenoble - Salon de l'étudiant">Grenoble - Salon de l'étudiant</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputState">Établissement</label>
                                <select name="institute" className={this.state.institute != 'Établissement' ? 'custom-select blue' : 'custom-select'} value={this.state.institute} onChange={(e) => this.handleInputChange(e)}>
                                    <option defaultValue>Établissement</option>
                                    <option value="Ella Fitzgerald">Ella Fitzgerald</option>
                                    <option value="Chartreux">Chartreux</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputState">Permis</label>
                                <select name="driverLicence" className={this.state.driverLicence != 'Permis' ? 'custom-select blue' : 'custom-select'} value={this.state.driverLicence} onChange={(e) => this.handleInputChange(e)}>
                                    <option defaultValue>Permis</option>
                                    <option value="true">Oui</option>
                                    <option value="false">Non</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label for="inputState">Formation(s) souhaitée(s)</label>
                                <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} isMulti placeholder="Formation(s) souhaitée(s)" />
                            </div>
                        </div>
                        <div className="form-row">
                            <button className="btn btn-primary btn-add-student" onClick={() => this.props.addStudent({
                                name:this.state.name,
                                status:'prospect',
                                firstname:this.state.firstname,
                                contact:{
                                    phone:this.state.phone,
                                    email:this.state.email,
                                    address:this.state.address,
                                    city:this.state.city
                                },
                                driverlicence:this.state.driverLicence,
                                birthdate: '',
                                cursus:this.state.cursus,
                                source:this.state.source,
                                institute:this.state.institute,
                                trainings: this.state.trainings,
                                timestamp: Date.now(),
                                interview:'',
                                pp: '',
                                receipt: ''
                                
                                })}>Creer un étudiant</button>
                        </div>
                    </div>
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