import React, { Component } from 'react';
import Select from 'react-select'
import '../../header/Header.scss'
import '../../../App.css';
import { connect } from 'react-redux';
import * as fromActions from '../../../actions'

const options = [
    { value: 'BTS SIO', label: 'BTS SIO' },
    { value: 'TIIS', label: 'TIIS' },
    { value: 'Cycle ESI', label: 'Cycle ESI' },
    { value: 'Bachelor RPI', label: 'Bachelor RPI' },
    { value: 'Licence RPI', label: 'Licence RPI' },
    { value: 'Master ESI', label: 'Master ESI' }
]

class FormEmployment extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            <div>
                <div className="details">
                    <div className="name">Ajouter une offre d'emploi</div>
                </div>
                <div className="form-student">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputState">Entreprise</label>
                            <select name="nameEnterprise" className={this.state.source != 'Entreprise' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                                <option defaultValue>Entreprise</option>
                                <option value="XEFI">XEFI</option>
                                <option value="ORANGE">ORANGE</option>
                                <option value="CAPGEMINI">CAPGEMINI</option>
                                <option value="SNCF">SNCF</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="idEmployment">ID Offre</label>
                            <input type="text" className="form-control form-control-sm" id="idEmployment" name="idEmployment" placeholder="ID Offre" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="job">Poste</label>
                            <input type="text" className="form-control form-control-sm" id="job" name="job" placeholder="Poste" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="date">Date</label>
                            <input type="date" className="form-control form-control-sm" id="date" name="date" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="contractType">Type de contrat</label>
                            <select name="contractType" className={this.state.source != 'Type de contrat' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                                <option defaultValue>Type de contrat</option>
                                <option value="Contrat d'apprentissage">Contrat d'apprentissage</option>
                                <option value="Contrat de professionalisation">Contrat de professionalisation</option>
                                <option value="Stage">Stage</option>
                                <option value="CDI">CDI</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="speciality">Spécialité</label>
                            <select name="speciality" className={this.state.source != 'Spécialité' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                                <option defaultValue>Spécialité</option>
                                <option value="Développement">Développement</option>
                                <option value="Système Réseaux">Système Réseaux</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label for="inputState">Cursus</label>
                            <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} isMulti placeholder="Cursus" />
                        </div>
                    </div>
                    <div className="form-row">
                        <button className="btn btn-primary btn-add-student" onClick={() => this.props.addEmployment({
                            nameEnterprise: this.state.nameEnterprise,
                            idEmployment: this.state.idEmployment,
                            job: this.state.job,
                            date: this.state.date,
                            contractType: this.state.contractType,
                            speciality: this.state.speciality,
                            trainings: this.state.trainings,
                        })}>Créer une offre d'emploi</button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    addEmployment: (employment) => dispatch(fromActions.addEmployment(employment)),

})

export default connect(mapStateToProps, mapDispatchToProps)(FormEmployment)