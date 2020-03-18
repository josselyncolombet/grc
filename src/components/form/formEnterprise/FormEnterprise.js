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

class FormEnterprise extends Component {
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
                    <div className="name">Ajouter une entreprise</div>
                </div>
                <div className="form-student">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Nom de l'entreprise</label>
                            <input type="text" className="form-control form-control-sm" id="name" name="name" placeholder="Nom de l'entreprise" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="firstname">Adresse</label>
                            <input type="text" className="form-control form-control-sm" id="address" name="address" placeholder="Adresse" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="name">Code Postal</label>
                            <input type="text" className="form-control form-control-sm" id="cp" name="cp" placeholder="Code Postal" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="firstname">Ville</label>
                            <input type="text" className="form-control form-control-sm" id="city" name="city" placeholder="Ville" onChange={(e) => this.handleInputChange(e)} />
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
                            <label for="contactFirstName">Prénom du contact</label>
                            <input type="text" className="form-control form-control-sm" id="contactFirstName" name="contactFirstName" placeholder="Prénom du contact" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="contactLastName">Nom du contact</label>
                            <input type="text" className="form-control form-control-sm" id="contactLastName" name="contactLastName" placeholder="Nom du contact" onChange={(e) => this.handleInputChange(e)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <button className="btn btn-primary btn-add-student" onClick={() => this.props.addEnterprise({
                            name: this.state.name,
                            address: this.state.address,
                            cp: this.state.cp,
                            city: this.state.city,
                            email: this.state.email,
                            phone: this.state.phone,
                            contactFirstName: this.state.contactFirstName,
                            contactLastName: this.state.contactLastName,
                        })}>Créer une entreprise</button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    addEnterprise: (entreprise) => dispatch(fromActions.addEnterprise(entreprise)),

})

export default connect(mapStateToProps, mapDispatchToProps)(FormEnterprise)