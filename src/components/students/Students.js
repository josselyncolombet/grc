import React, { Component } from 'react';
import './Students.scss'
import '../../App.css';
import { connect } from 'react-redux';
import SlidingPanel from 'react-sliding-side-panel'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment'
import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
    Description
} from 'vertical-timeline-component-react';

import * as fromActions from '../../actions/students'
import Select from 'react-select'

const options = [
    { value: 'BTS SIO', label: 'BTS SIO' },
    { value: 'TIIS', label: 'TIIS' },
    { value: 'Cycle ESI', label: 'Cycle ESI' },
    { value: 'Bachelor RPI', label: 'Bachelor RPI' },
    { value: 'Licence RPI', label: 'Licence RPI' },
    { value: 'Master ESI', label: 'Master ESI' }
]


class Students extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false,
            students: [],
            openPanel: false,
            openCreatePanel: false,
            source: 'Source',
            training: 'Formation souhaitée',
            openhouse: 'Portes ouvertes',
            pp: 'PPE',
            receipt: "Attestation d'inscription",
            coaching: 'Coaching',
            phoning: 'Prospection',
            statut:'Statut',
            student: {}
        }
    }

    componentDidMount = () => {
        let students = this.props.getStudents()
        this.setState({
            students: students
        })
    }

    setOpenPanel = (bool, student) => {
        this.setState({
            openPanel: bool,
            student: student
        })
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

    render() {
        return (
            <div className="container-fluid" id="students">


                <div className="filters">
                    <div className="col-7 d-flex flex-wrap">
                        <select name="source" className={this.state.source != 'Source' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Source</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="statut" className={this.state.statut != 'Statut' ? 'custom-select blue' : 'custom-select'} value={this.state.statut} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Statut</option>
                            <option value="1">Apprenant</option>
                             <option value="2">Prospect</option>
                        </select>
                        <select name="training" className={this.state.training != 'Formation souhaitée' ? 'custom-select blue' : 'custom-select'} value={this.state.training} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Date de contact</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="training" className={this.state.training != 'Formation souhaitée' ? 'custom-select blue' : 'custom-select'} value={this.state.training} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Formation</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="openhouse" className={this.state.openhouse != 'Portes ouvertes' ? 'custom-select blue' : 'custom-select'} value={this.state.openhouse} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Portes ouvertes</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="pp" className={this.state.pp != 'PPE' ? 'custom-select blue' : 'custom-select'} value={this.state.pp} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>PPE</option>
                            <option value="1">PPE : Oui</option>
                             <option value="2">PPE : Non</option>
                        </select>
                        <select name="receipt" className={this.state.receipt != "Attestation d'inscription" ? 'custom-select blue' : 'custom-select'} value={this.state.receipt} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Attestation d'inscription</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="receipt" className={this.state.receipt != "Attestation d'inscription" ? 'custom-select blue' : 'custom-select'} value={this.state.receipt} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Classe</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="coaching" className={this.state.coaching != 'Coaching' ? 'custom-select blue' : 'custom-select'} value={this.state.coaching} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Coaching</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <select name="phoning" className={this.state.phoning != 'Prospection' ? 'custom-select blue' : 'custom-select'} value={this.state.phoning} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Prospection</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary" onClick={() => this.setOpenCreatePanel(true)}> <div className="btn-add-student"><i className="gg-add" /> Creer un étudiant</div></button>
                    </div>
                </div>
                <table className="table table-hover table-striped table-bordered" style={{ padding: '1rem' }}>
                    <thead>
                        <tr>
                            <th scope="col"> Nom </th>
                            <th scope="col"> Statut </th>
                            <th scope="col"> Source </th>
                            <th scope="col"> Date </th>
                            <th scope="col"> Formation souhaitée </th>
                            <th scope="col"> JPO </th>
                            <th scope="col"> Entretien </th>
                            <th scope="col"> PPE </th>
                            <th scope="col"> AI </th>
                            <th scope="col"> Classe </th>
                            <th scope="col"> Coaching </th>
                            <th scope="col"> Prospection </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.props.students.length > 0 ? this.props.students.map(student =>
                                <tr onClick={() => this.setOpenPanel(true, student)}>
                                    <td className='name'> {student.name} {student.firstname}</td>
                                    <td>prospect</td>
                                    <td> {student.source} </td>
                                    <td>16/02/2020</td>
                                    <td> <span className="pills gray">{student.training}</span> <span className="pills yellow">BTS SIO</span>  </td>
                                    <td> {student.openhouse} </td>
                                    <td></td>
                                    <td><i className="dot" /></td>
                                    <td> <i className="dot" /> </td>
                                    <td> <span className="pills gray">BTS SIO 1</span></td>
                                    <td> {student.coaching} </td>
                                    <td> {
                                        student.phoning.map((phoning, id) => {
                                            return (<div>
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 100, hide: 400 }}
                                                    overlay={
                                                        <Popover id="popover-basic">
                                                            <Popover.Title as="h3">{phoning.date}</Popover.Title>
                                                            <Popover.Content className="popover-content">
                                                                {phoning.comment}
                                                            </Popover.Content>
                                                        </Popover>
                                                    }
                                                >
                                                    <i key={id} className="dot-p" />
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 100, hide: 400 }}
                                                    overlay={
                                                        <Popover id="popover-basic">
                                                            <Popover.Title as="h3">{phoning.date}</Popover.Title>
                                                            <Popover.Content className="popover-content">
                                                                {phoning.comment}
                                                            </Popover.Content>
                                                        </Popover>
                                                    }
                                                >
                                                    <i key={id} className="dot-p" />
                                                </OverlayTrigger>
                                                <OverlayTrigger
                                                    placement="left"
                                                    delay={{ show: 100, hide: 400 }}
                                                    overlay={
                                                        <Popover id="popover-basic">
                                                            <Popover.Title as="h3">{phoning.date}</Popover.Title>
                                                            <Popover.Content className="popover-content">
                                                                Marc a été perspicacce au téléphone
                                                            </Popover.Content>
                                                        </Popover>
                                                    }
                                                >
                                                    <i key={id} className="dot-p" />
                                                </OverlayTrigger>
                                                </div>
                                            )
                                        })
                                    }
                                    </td>


                                </tr>
                            ) : null
                        }
                    </tbody>
                </table>
                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openPanel}
                    backdropClicked={() => this.setState({ openPanel: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <div className="details">
                        <div className="name">{this.state.student.name} {this.state.student.firstname}, {moment().diff(this.state.student.birthdate, 'years')}ans</div>

                        <div className="contact">
                            <div className="contact-details">
                                <i className="gg-mail icon" />
                                <span>{typeof this.state.student.contact == 'object' ? this.state.student.contact.email : null}</span>
                            </div>
                            <div className="contact-details">
                                <i className="gg-smartphone-shake icon" style={{ marginRight: '0.7rem' }} />
                                <span>{typeof this.state.student.contact == 'object' ? this.state.student.contact.phone : null}</span>
                            </div>
                            <div className="contact-details">
                                <i className="gg-pin icon" />
                                <span>{this.state.student.driverlicence ? "Permis B" : "Pas de permis"}</span>
                            </div>
                        </div>

                        <div className="documents">
                            <section>
                                <div className="pp">
                                    <div className="group">
                                        <div className="surround orange">
                                            <i className="gg-directory"></i>
                                        </div>
                                        <div className="text">
                                            <p className="title">PPE</p>
                                            <p className="date">16/02/2020</p>
                                        </div>
                                    </div>
                                    <div style={{ alignSelf: 'center' }}>
                                        <i className="gg-arrow-down"></i>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className="pp">
                                    <div className="group">
                                        <div className="surround orange">
                                            <i className="gg-file-document"></i>
                                        </div>
                                        <div className="text">
                                            <p className="title">Attestation d'inscription</p>
                                            <p className="date">16/02/2020</p>
                                        </div>
                                    </div>
                                    <div style={{ alignSelf: 'center' }}>
                                        <i class="gg-arrow-down"></i>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <Timeline>
                            <Content>
                                <ContentYear
                                    startMonth="12"
                                    monthType="number"
                                    startDay="24"
                                    startYear="2020"

                                />
                                <ContentBody title="Prospection">
                                    <Description
                                        text="Retour fiducial Retour fiducial"

                                    />
                                </ContentBody>
                            </Content>
                            <Content>
                                <ContentYear
                                    startMonth="12"
                                    monthType="number"
                                    startDay="24"
                                    startYear="2020"

                                />
                                <ContentBody title="Coaching">
                                    <Description
                                        text="Motivé, dynamique à envoyé plusieurs cv"

                                    />
                                </ContentBody>
                            </Content>
                            <Content>
                                <ContentYear
                                    startMonth="12"
                                    monthType="number"
                                    startDay="24"
                                    startYear="2020"

                                />
                                <ContentBody title="Entretien">
                                    <Description
                                        text="Motivé, recherche une entreprise en dev"
                                    />
                                </ContentBody>
                            </Content>
                            <Content>
                                <ContentYear
                                    startMonth="12"
                                    monthType="number"
                                    startDay="24"
                                    startYear="2020"

                                />
                                <ContentBody title="Portes ouvertes">
                                    <Description
                                        text="Interessé par le cycle ESI"
                                    />
                                </ContentBody>
                            </Content>
                        </Timeline>
                    </div>
                </SlidingPanel>
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
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="name">Nom</label>
                                <input type="text" class="form-control" id="name" placeholder="Nom" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="firstname">Prénom</label>
                                <input type="text" class="form-control" id="firstname" placeholder="Prénom" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Email" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="phone">Téléphone</label>
                                <input type="text" class="form-control" id="phone" placeholder="Téléphone" />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputState">Cursus</label>
                                <select name="source" className={this.state.source != 'Source' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                                    <option defaultValue>Cursus</option>
                                    <option value="Bac G/T - Terminale">Bac G/T - Terminale</option>
                                    <option value="Bac G/T - Premiere">Bac G/T - Premiere</option>
                                    <option value="Bac G/T - Seconde">Bac G/T - Seconde</option>
                                    <option value="Bac Pro">Bac Pro</option>
                                </select>
                            </div>
                            <div class="form-group col-md-6">
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
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="inputState">Formation(s) souhaitée(s)</label>
                                <Select options={options} isMulti placeholder="Formation(s) souhaitée(s)" />
                            </div>
                        </div>
                        <div class="form-row">
                            <button className="btn btn-primary"> <div className="btn-add-student"> Creer un étudiant</div></button>
                        </div>
                    </div>


                </SlidingPanel>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    students: state.students.students
})

// Permet d'envoyer des infos dans le store
const mapDispatchToProps = dispatch => ({
    getStudents: () => dispatch(fromActions.getStudents()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Students)
