import React, { Component } from 'react';
import './Students.scss'
import '../../App.css';
import { connect } from 'react-redux';
import * as fromActions from '../../actions'
import SlidingPanel from 'react-sliding-side-panel'
import { Accordion, Card, OverlayTrigger, Popover } from 'react-bootstrap'
import moment from 'moment'
import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
    Description
} from 'vertical-timeline-component-react';

import fuzzy from 'fuzzy-search'
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
            statut: 'Statut',
            classroom: 'Classe',
            institute: 'Etablissement',
            cursus: 'Cursus',
            interview: 'Entretien',
            student: {},
            steps: {
                openhouse: false,
                interview: false,
                pp: false,
                receipt: false,
                coaching: false,
                phoning: false,
                classroom: false
            }
        }
    }

    componentDidMount = async () => {
        await this.props.getStudents()

    }
    componentWillReceiveProps = props => {
        this.setState({
            students: props.students
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

    handleReactSelectChange = selectedOptions => {
        let trainings= selectedOptions.map(t => t.value)
        this.setState({ trainings: trainings })
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let result = this.props.students
        let searcher
        switch (name) {
            case 'statut':
                if (value == 'Statut') {
                    result = this.props.students
                } else {
                    searcher = new fuzzy(this.props.students, ['status'])
                    result = searcher.search(value)
                }
                break;
            case 'source':
                if (value == 'Source') {
                    result = this.props.students
                } else {
                    searcher = new fuzzy(this.props.students, ['source'])
                    result = searcher.search(value)
                }
                break;

            default:
                break;
        }

        this.setState({
            [name]: value,
            students: result
        }, () => console.log(this.state));

    }

    render() {
        return (
            <div className="col-10 students" style={{ overflow: 'auto', maxHeight: '100vh' }}>

                {/*<div className="filters">
                    <div className="d-flex flex-wrap">
                        <select name="statut" className={this.state.statut != 'Statut' ? 'custom-select blue' : 'custom-select'} value={this.state.statut} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Statut</option>
                            {this.props.filters.status.length > 0 ? this.props.filters.status.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="source" className={this.state.source != 'Source' ? 'custom-select blue' : 'custom-select'} value={this.state.source} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Source</option>
                            {this.props.filters.source.length > 0 ? this.props.filters.source.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="training" className={this.state.training != 'Formation souhaitée' ? 'custom-select blue' : 'custom-select'} value={this.state.training} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Formation</option>
                            {this.props.filters.trainings.length > 0 ? this.props.filters.trainings.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="openhouse" className={this.state.openhouse != 'Portes ouvertes' ? 'custom-select blue' : 'custom-select'} value={this.state.openhouse} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>JPO</option>
                            {this.props.filters.openhouse.length > 0 ? this.props.filters.openhouse.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="interview" className={this.state.interview != 'Entretien' ? 'custom-select blue' : 'custom-select'} value={this.state.interview} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Entretien</option>
                            <option value="true">Entretien : Oui</option>
                            <option value="false">Entretien : Non</option>
                        </select>
                        <select name="pp" className={this.state.pp != 'PPE' ? 'custom-select blue' : 'custom-select'} value={this.state.pp} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>PPE</option>
                            <option value="true">PPE : Oui</option>
                            <option value="false">PPE : Non</option>
                        </select>
                        <select name="receipt" className={this.state.receipt != "Attestation d'inscription" ? 'custom-select blue' : 'custom-select'} value={this.state.receipt} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>AI</option>
                            <option value="true">AI : Oui</option>
                            <option value="false">AI : Non</option>
                        </select>
                        <select name="classroom" className={this.state.classroom != "Classe" ? 'custom-select blue' : 'custom-select'} value={this.state.classroom} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Classe</option>
                            {this.props.filters.classroom.length > 0 ? this.props.filters.classroom.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="coaching" className={this.state.coaching != 'Coaching' ? 'custom-select blue' : 'custom-select'} value={this.state.coaching} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Coaching</option>
                            <option value="true">AI : Oui</option>
                            <option value="false">AI : Non</option>
                        </select>
                        <select name="phoning" className={this.state.phoning != 'Prospection' ? 'custom-select blue' : 'custom-select'} value={this.state.phoning} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Prospection</option>
                            <option value="true">AI : Oui</option>
                            <option value="false">AI : Non</option>
                        </select>
                        <select name="institute" className={this.state.institute != 'Etablissement' ? 'custom-select blue' : 'custom-select'} value={this.state.institute} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Etablissement</option>
                            {this.props.filters.institute.length > 0 ? this.props.filters.institute.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                        <select name="cursus" className={this.state.cursus != 'Cursus' ? 'custom-select blue' : 'custom-select'} value={this.state.cursus} onChange={(e) => this.handleInputChange(e)}>
                            <option defaultValue>Cursus</option>
                            {this.props.filters.cursus.length > 0 ? this.props.filters.cursus.map((s, i) => (<option value={s} key={i}>{s}</option>)) : null}
                        </select>
                </div>

        </div>*/}
                <table className="table table-hover" style={{ padding: '1rem' }}>
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
                            this.state.students.length > 0 ? this.state.students.map((student, i) =>
                                <tr key={i} onClick={() => this.setOpenPanel(true, student)}>
                                    <td className='name'> {student.name} {student.firstname}</td>
                                    <td><span className={student.status == 'prospect' ? 'pills purple' : 'pills green'}> {student.status} </span></td>
                                    <td> {student.source} </td>
                                    <td> {moment.unix(student.timestamp / 1000).format("MM-DD-YYYY")}</td>
                                    <td> {student.trainings.map((training, i) => <span key={i} className="pills purple">{training}</span>)}</td>
                                    <td> 11/03/2020 </td>
                                    <td> {student.interview}</td>
                                    <td> {student.pp.length > 0 ? <i className="dot" /> : null}</td>
                                    <td> {student.receipt.length > 0 ? <i className="dot" /> : null} </td>
                                    <td> {student.classroom}</td>
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
                            <div className="contact-details">
                                <i className="gg-pin icon" />
                                <span>Lycée Ella Fitzgerald</span>
                            </div>
                            <div className="contact-details">
                                <i className="gg-pin icon" />
                                <span>Addresse</span>
                            </div>
                        </div>

                        <div className="documents">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>1</p>
                                                    <div className="text">
                                                        <p className="title">Journée portes ouvertes</p>
                                                        <p className="date">Fait le : 16/02/2020</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-green"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Portes ouvertes: </label>
                                                        <select name="statut" className='custom-select blue' value={this.state.jpo}>
                                                            <option defaultValue>11/03/2020</option>
                                                            <option value="08/02/2020">08/02/2020</option>
                                                            <option value="22/02/2020">22/02/2020</option>
                                                        </select>
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', background: 'gray', border: 'none' }} disabled>Enregistrer</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>


                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>2</p>
                                                    <div className="text">
                                                        <p className="title">Entretien</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="who">Réalisé par: </label>
                                                        <select name="who" className='custom-select' value={this.state.interviewer}>
                                                            <option defaultValue>Conseiller </option>
                                                            <option value="08/02/2020">Tayeb</option>
                                                            <option value="22/02/2020">Nicolas</option>
                                                            <option value="22/02/2020">Sandrine</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="name">Commentaires: </label>
                                                        <textarea type="text" className="form-control form-control-sm" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Enregistrer</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>


                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="2">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>3</p>
                                                    <div className="text">
                                                        <p className="title">PPE</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Nom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.name}/>

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Prénom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.firstname}/>

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Téléphone: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Email: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="who">Réalisé par: </label>
                                                        <select name="who" className='custom-select' value={this.state.interviewer}>
                                                            <option defaultValue>Conseiller</option>
                                                            <option value="08/02/2020">Tayeb</option>
                                                            <option value="22/02/2020">Nicolas</option>
                                                            <option value="22/02/2020">Sandrine</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="who">Etablissement: </label>
                                                        <select name="who" className='custom-select' value={this.state.interviewer}>
                                                            <option defaultValue>Etablissement</option>
                                                            <option value="08/02/2020">Ella Fitzgerald</option>
                                                            <option value="22/02/2020">Les Chartreux</option>
                                                            <option value="22/02/2020">La Xaviere</option>
                                                            <option value="22/02/2020">Robin</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="inputState">Formation(s) souhaitée(s): </label>
                                                        <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} isMulti placeholder="Formation(s) souhaitée(s)" />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Objectif de métier:</label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="name">Commentaires:</label>
                                                        <textarea type="text" className="form-control form-control-sm" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Enregistrer</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>4</p>
                                                    <div className="text">
                                                        <p className="title">Attestation d'inscription</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                        <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Nom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.name}/>

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Prénom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.firstname}/>

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Téléphone: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="inputState">Formation(s) souhaitée(s): </label>
                                                        <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} isMulti placeholder="Formation(s) souhaitée(s)" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Enregistrer</button>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date du coaching prévu: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="4">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>5</p>
                                                    <div className="text">
                                                        <p className="title">Coaching</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="4">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="who">Réalisé par: </label>
                                                        <select name="who" className='custom-select' value={this.state.interviewer}>
                                                            <option defaultValue>Personnel</option>
                                                            <option value="08/02/2020">Tayeb</option>
                                                            <option value="22/02/2020">Nicolas</option>
                                                            <option value="22/02/2020">Sandrine</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="name">Commentaires :</label>
                                                        <textarea type="text" className="form-control form-control-sm" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Enregistrer</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="5">

                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>6</p>
                                                    <div className="text">
                                                        <p className="title">Prospection téléphonique</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="5">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="name">Commentaires :</label>
                                                        <textarea type="text" className="form-control form-control-sm" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Ajouter</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="6">

                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0 }}>7</p>
                                                    <div className="text">
                                                        <p className="title">Rentrée</p>
                                                        <p className="date">A faire</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    <i className="dot-red"></i>
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="6">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="text" className="form-control form-control-sm" />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem' }}>Enregistrer</button>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="who">Classe: </label>
                                                        <select name="who" className='custom-select' value={this.state.class}>
                                                            <option defaultValue>Classe</option>
                                                            <option value="22/02/2020">ESI MD5</option>
                                                            <option value="22/02/2020">ESI MR5</option>
                                                            <option value="22/02/2020">ESI MD4</option>
                                                            <option value="22/02/2020">ESI MR4</option>
                                                            <option value="22/02/2020">SIO 1</option>
                                                            <option value="22/02/2020">SIO 2</option>
                                                            <option value="22/02/2020">B1</option>
                                                            <option value="22/02/2020">B2 D</option>
                                                            <option value="22/02/2020">B2 R</option>
                                                            <option value="22/02/2020">B3 D</option>
                                                            <option value="22/02/2020">B3 R</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>



                            </Accordion>






                        </div>
                    </div>
                </SlidingPanel>

            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    students: state.students.students,
    filters: state.filters
})

const mapDispatchToProps = dispatch => ({
    getStudents: () => dispatch(fromActions.getStudentsSaga()),

})

export default connect(mapStateToProps, mapDispatchToProps)(Students)
