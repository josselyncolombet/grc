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

class FormStudent extends Component {
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
                    <div className="name">Ajouter un prospect</div>
                </div>
                <div className="form-student">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Nom</label>
                            <input type="text" className="form-control form-control-sm" id="name" name="name" placeholder="Nom" onChange={(e) => this.handleInputChange(e)} />
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
                            name: this.state.name,
                            status: 'prospect',
                            firstname: this.state.firstname,
                            contact: {
                                phone: this.state.phone,
                                email: this.state.email,
                                address: this.state.address,
                                city: this.state.city
                            },
                            driverlicence: this.state.driverLicence,
                            birthdate: '',
                            cursus: this.state.cursus,
                            source: this.state.source,
                            institute: this.state.institute,
                            trainings: this.state.trainings,
                            timestamp: Date.now(),
                            interview: '',
                            pp: '',
                            receipt: ''

                        })}>Créer un étudiant</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormStudent)