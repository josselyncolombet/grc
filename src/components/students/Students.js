import React, { Component } from 'react';
import './Students.scss'
import '../../App.css';
import { connect } from 'react-redux';
import * as fromActions from '../../actions'
import SlidingPanel from 'react-sliding-side-panel'
import { Accordion, Card, OverlayTrigger, Popover } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf, faCheck, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import MaterialTable from "material-table";
import { TableCell } from '@material-ui/core';
import fuzzy from 'fuzzy-search'
import FormStudent from './../form/formStudent/FormStudent'
import Select from 'react-select'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'
import {
    Timeline,
    Content,
    ContentYear,
    ContentBody,
    Description
} from 'vertical-timeline-component-react';

const options = [
    { value: 'BTS SIO', label: 'BTS SIO' },
    { value: 'TIIS', label: 'TIIS' },
    { value: 'Cycle ESI', label: 'Cycle ESI' },
    { value: 'Bachelor RPI', label: 'Bachelor RPI' },
    { value: 'Licence RPI', label: 'Licence RPI' },
    { value: 'Master ESI', label: 'Master ESI' }
]

const MyDoc = () => (
    <Document>
        <Page>
            <Text>
                AWS S3 Error please contact support
            </Text>
        </Page>
    </Document>
)

const data1 = {
    datasets: [{
        data: [4, 0],
        backgroundColor: [
            '#235EE7',
            '#36A2EB'
        ]
    }],
    labels: [
        'Prospects',
        'Apprenants',
    ]
};

const data2 = {
    datasets: [{
        data: [1, 1, 3, 2],
        backgroundColor: [
            '#235EE7',
            '#0F206A',
            '#eb4d4b',
            '#f0932b'
        ]
    }],
    labels: [
        'BTS SIO',
        'Cycle ESI',
        'Bachelor RPI',
        'TIIS'
    ]
};

const data3 = {
    datasets: [{
        data: [4, 0],
        backgroundColor: [
            '#235EE7',
            '#36A2EB',
        ]
    }],
    labels: [
        'Disponible',
        'En Entreprise',
    ]
};


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
            today: Date.now(),
            steps: {
                openhouse: false,
                interview: false,
                pp: false,
                receipt: false,
                coaching: false,
                phoning: false,
                classroom: false
            },
            columns: [
                { title: 'Nom', field: 'name', cellStyle: { padding: "0rem 0rem 0rem 0.35rem" }, render: rowData => <span> <b>{rowData.name}</b> {rowData.firstname} </span> },
                { title: 'Statut', field: 'status', cellStyle: { padding: 0 }, render: rowData => <span className={rowData.status == 'prospect' ? 'pills purple' : 'pills green'}> {rowData.status} </span> },
                { title: 'Source', field: 'source' },
                { title: 'Date', field: 'timestamp', cellStyle: { padding: 0 }, render: rowData => <span> {moment.unix(rowData.timestamp / 1000).format('DD/MM/YYYY')} </span> },
                {
                    title: 'Formation souhaitée', field: 'trainings', cellStyle: { padding: 0 }, render: rowData => rowData.trainings.map((t, id) =>
                        <span key={id} className={t == 'BTS SIO' ? 'pills purple' : t == "Cycle ESI" ? 'pills darkblue' : t == "Bachelor RPI" ? 'pills pink' : 'pills orange'}> {t} </span>
                    ),
                    editComponent: props => (<Select options={options} onChange={(e) => this.handleReactSelectChange(e)} isMulti placeholder="Formation(s) souhaitée(s)" />)
                },
                { title: 'JPO', field: 'openhouse', cellStyle: { padding: 0 }, render: rowData => <span style={{ textAlign: 'center' }}> {rowData.openhouse.openhouseDate} </span> },
                { title: 'Entretien', field: 'interview', cellStyle: { padding: 0 }, render: rowData => <span> {rowData.interview.interviewDate} </span> },
                { title: 'PPE', field: 'pp', cellStyle: { padding: 0 }, render: rowData => <span> {rowData.pp.value == 'done' ? <i className="dot" /> : null} </span> },
                { title: 'AI', field: 'receipt', cellStyle: { padding: 0 }, render: rowData => <span> {rowData.receipt.value == 'done' ? <i className="dot" /> : null} </span> },
                { title: 'Classe', field: 'classroom', cellStyle: { padding: 0 }, render: rowData => <span style={{ textAlign: 'center' }}> {rowData.scolarship.scolarshipClassroom} </span> },
                { title: 'Coaching', field: 'coaching', cellStyle: { padding: 0 }, render: rowData => <span style={{ textAlign: 'center' }}> {rowData.coaching.coachingDate} </span> },
                { title: 'Prospection', field: 'phoning', cellStyle: { padding: 0 }, render: rowData => rowData.phoning.sessions.map((s, id) =>
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 100, hide: 400 }}
                            overlay={
                                <Popover id="popover-basic">
                                    <Popover.Title as="h3">{s.date}</Popover.Title>
                                    <Popover.Content className="popover-content">
                                        {s.comment}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <i key={id} className="dot-p" />
                        </OverlayTrigger>
                    )
                },
            ]


        }
    }

    componentDidMount = async () => {
        await this.props.getStudents()
        let today = new Date()
        let date = today.setDate(today.getDate() + 3)
        this.setState({
            today: date
        })

    }
    componentWillReceiveProps = props => {
        this.setState({
            students: props.students.reverse()
        })
    }
    setOpenPanel = (bool, student) => {
        this.setState({
            openPanel: bool,
            student: student,
            trainings: student.trainings
        })
    }

    setOpenCreatePanel = (bool) => {
        this.setState({
            openCreatePanel: bool
        })
    }

    handleReactSelectChange = selectedOptions => {
        let trainings = selectedOptions.map(t => t.value)
        this.setState({ trainings: trainings })
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => console.log(this.state));

    }

    _setOpenhouse = openhouse => {

    }

    render() {
        return (
            <div className="container-fluid" style={{ padding: 0 }}>
                <div className="row" style={{ borderBottom: '1px solid #ececec' }}>
                    <div className="col-12 students" style={{ overflow: 'auto', maxHeight: '100vh' }}>
                        {/* <div className="filters">
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
                        <MaterialTable
                            icons={{
                                Add: () => '+'
                            }}
                            actions={[
                                {
                                    icon: 'add',
                                    onClick: (event, rowData) => {
                                        this.setOpenCreatePanel(!this.state.openCreatePanel)
                                    },
                                    isFreeAction: true,
                                    tooltip: 'Ajouter',
                                }
                            ]}
                            title="Prospects et Apprenants"
                            columns={this.state.columns}
                            data={this.state.students}
                            localization={{
                                body: {

                                    editTooltip: "Modifier",
                                    deleteTooltip: "Supprimer",
                                    editRow: {
                                        saveTooltip: "Sauvegarder",
                                        cancelTooltip: "Annuler",
                                        deleteText: "Supprimer",
                                    },
                                    filterRow: {
                                        filterTooltip: "Filtre"
                                    },
                                    emptyDataSourceMessage: 'Aucune donnée disponible'
                                },
                                pagination: {
                                    firstTooltip: "Première page",
                                    previousTooltip: "Page précédente",
                                    nextTooltip: "Page suivante",
                                    lastTooltip: "Dernière page",
                                    labelRowsSelect: "lignes"
                                },
                                toolbar: {
                                    searchTooltip: "Rechercher",
                                    searchPlaceholder: "Rechercher"
                                }
                            }}
                            onRowClick={(event, rowData) => this.setOpenPanel("panel", rowData)}
                            options={{ actionsCellStyle: { padding: 0 }, filtering: true }}
                            editable={{
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                resolve();
                                                this.props.deleteStudent(oldData._id);
                                            }
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                        />
                    </div>
                </div>

                <div className="row" style={{ borderBottom: '1px solid #ececec' }}>
                    <div className="col-4" style={{ padding: '2rem' }}>
                        <p>Apprenants / Prospects</p>
                        <Doughnut data={data1} />
                    </div>
                    <div className="col-4" style={{ borderRight: '1px solid #ececec', borderLeft: '1px solid #ececec', padding: '2rem' }}>
                        <p>Repartition par formation</p>
                        <Doughnut data={data2} />
                    </div>
                    <div className="col-4" style={{ padding: '2rem' }}>
                        <p>Disponible / En entreprise</p>
                        <Doughnut data={data3} />
                    </div>

                </div>

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
                                <span>{this.state.student.institute}</span>
                            </div>
                            <div className="contact-details">
                                <i className="gg-pin icon" />
                                <span>{typeof this.state.student.contact == 'object' ? this.state.student.contact.address + ', ' + this.state.student.contact.city : null}</span>
                            </div>
                        </div>

                        <div className="documents">
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <section>
                                            <div className="pp">
                                                <div className="group">
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>1</p>
                                                    <div className="text">
                                                        <p className="title">Journée portes ouvertes</p>
                                                        <p className="date">{typeof this.state.student.openhouse == 'object' && this.state.student.openhouse.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.openhouse.date / 1000).format('DD/MM/YYYY') : 'A faire'}</p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.openhouse == 'object' && this.state.student.openhouse.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="openhouse">Portes ouvertes: </label>
                                                        <input type="date" className="form-control form-control-sm" name="openhouseDate" value={this.state.student.hasOwnProperty('openhouse') ? this.state.student.openhouse.openhouseDate : null} onChange={(e) => this.handleInputChange(e)} disabled={this.state.student.hasOwnProperty('openhouse') && this.state.student.openhouse.value == 'done' ? true : false} />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                            let student = this.state.student
                                                            student.openhouse = {
                                                                value: 'done',
                                                                openhouseDate: this.state.openhouseDate,
                                                                date: Date.now()
                                                            }
                                                            console.log(student)
                                                            this.props.updateStudent(student)
                                                        }} >Enregistrer</button>
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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>2</p>
                                                    <div className="text">
                                                        <p className="title">Entretien</p>
                                                        <p className="date"> <p className="date">{typeof this.state.student.interview == 'object' && this.state.student.interview.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.interview.date / 1000).format('DD/MM/YYYY') : 'A faire'}</p>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.interview == 'object' && this.state.student.interview.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
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
                                                        <input type="date" className="form-control form-control-sm" name="interviewDate" value={this.state.student.hasOwnProperty('interview') ? this.state.student.interview.interviewDate : null} onChange={(e) => this.handleInputChange(e)} disabled={this.state.student.hasOwnProperty('interview') && this.state.student.interview.value == 'done' ? true : false} />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="interviewer">Réalisé par: </label>
                                                        <select name="interviewer" className='custom-select' value={this.state.student.hasOwnProperty('interview') ? this.state.student.interview.interviewer : null} onChange={(e) => this.handleInputChange(e)} disabled={this.state.student.hasOwnProperty('interview') && this.state.student.interview.value == 'done' ? true : false}>
                                                            <option value="Tayeb">Tayeb</option>
                                                            <option value="Nicolas">Nicolas</option>
                                                            <option value="Sandrine">Sandrine</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="name">Commentaires: </label>
                                                        <textarea type="text" className="form-control form-control-sm" name="interviewComment" value={this.state.student.hasOwnProperty('interview') ? this.state.student.interview.interviewComment : null} onChange={(e) => this.handleInputChange(e)} disabled={this.state.student.hasOwnProperty('interview') && this.state.student.interview.value == 'done' ? true : false} />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                            let student = this.state.student
                                                            student.interview = {
                                                                value: 'done',
                                                                interviewDate: this.state.interviewDate,
                                                                interviewer: this.state.interviewer,
                                                                interviewComment: this.state.interviewComment,
                                                                date: Date.now()
                                                            }
                                                            console.log(student)
                                                            this.props.updateStudent(student)
                                                        }} >Enregistrer</button>
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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>3</p>
                                                    <div className="text">
                                                        <p className="title">PPE</p>
                                                        <p className="date">{typeof this.state.student.pp == 'object' && this.state.student.pp.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.pp.date / 1000).format('DD/MM/YYYY') : 'A faire'} </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.pp == 'object' && this.state.student.pp.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
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
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.name} disabled />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Prénom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.firstname} disabled />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Téléphone: </label>
                                                        <input type="text" className="form-control form-control-sm" value={typeof this.state.student.contact == 'object' ? this.state.student.contact.phone : null} disabled />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Email: </label>
                                                        <input type="text" className="form-control form-control-sm" value={typeof this.state.student.contact == 'object' ? this.state.student.contact.email : null} disabled />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Date: </label>
                                                        <input type="date" className="form-control form-control-sm" name="ppDate" value={this.state.student.hasOwnProperty('pp') ? this.state.student.pp.ppDate : null} onChange={(e) => this.handleInputChange(e)} />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="interviewer">Réalisé par: </label>
                                                        <input type="text" name="interviewer" className='form-control form-control-sm' value={typeof this.state.student.interview == "object" ? this.state.student.interview.interviewer : this.state.interviewer} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="institute">Etablissement: </label>
                                                        <input type="text" name="institute" className='form-control form-control-sm' value={this.state.student.institute} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="inputState">Formation(s) souhaitée(s): </label>
                                                        <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} defaultValue={this.state.student.hasOwnProperty('trainings') ? this.state.student.trainings.map(t => ({ value: t, label: t })) : null} isMulti placeholder="Formation(s) souhaitée(s)" />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="job">Objectif de métier:</label>
                                                        <input type="text" name="job" className="form-control form-control-sm" value={this.state.student.hasOwnProperty('pp') ? this.state.student.pp.ppJob : null} onChange={(e) => this.handleInputChange(e)} />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="ppComment">Commentaires:</label>
                                                        <textarea type="text" className="form-control form-control-sm" name="ppComment" value={this.state.student.hasOwnProperty('pp') ? this.state.student.pp.ppComment : null} onChange={(e) => this.handleInputChange(e)} />
                                                        <div className="row">
                                                            <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                                let student = this.state.student
                                                                student.pp = {
                                                                    value: 'done',
                                                                    ppDate: this.state.ppDate,
                                                                    ppInterviewer: this.state.interviewer,
                                                                    ppComment: this.state.ppComment,
                                                                    ppTrainings: this.state.trainings,
                                                                    ppJob: this.state.job,
                                                                    date: Date.now()
                                                                }
                                                                student.trainings = this.state.trainings
                                                                console.log(student)
                                                                this.props.updateStudent(student)
                                                            }} >Enregistrer</button>

                                                            <PDFDownloadLink document={<MyDoc />} fileName={this.state.student.hasOwnProperty('name') ? this.state.student.name + '-' + this.state.student.firstname + '-PPE.pdf' : 'error.pdf'} >
                                                                {({ blob, url, loading, error }) => (loading ? <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', marginLeft: '1rem' }}>Generer</button> : <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', marginLeft: '1rem' }}>Telecharger le pdf</button>)}
                                                            </PDFDownloadLink>
                                                        </div>
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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>4</p>
                                                    <div className="text">
                                                        <p className="title">Attestation d'inscription</p>
                                                        <p className="date">{typeof this.state.student.receipt == 'object' && this.state.student.receipt.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.receipt.date / 1000).format('DD/MM/YYYY') : 'A faire'} </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.receipt == 'object' && this.state.student.receipt.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
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
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.name} disabled />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Prénom: </label>
                                                        <input type="text" className="form-control form-control-sm" value={this.state.student.firstname} disabled />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="name">Téléphone: </label>
                                                        <input type="text" className="form-control form-control-sm" value={typeof this.state.student.contact == 'object' ? this.state.student.contact.phone : null} disabled />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="receiptDate">Date: </label>
                                                        <input type="date" name="receiptDate" className="form-control form-control-sm" value={this.state.student.hasOwnProperty('receipt') ? this.state.student.receipt.receiptDate : null} onChange={(e) => this.handleInputChange(e)} />

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="inputState">Formation(s) souhaitée(s): </label>
                                                        <Select options={options} onChange={(e) => this.handleReactSelectChange(e)} defaultValue={this.state.student.hasOwnProperty('trainings') ? this.state.student.trainings.map(t => ({ value: t, label: t })) : null} isMulti placeholder="Formation(s) souhaitée(s)" />



                                                        <div className="row">
                                                            <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                                let student = this.state.student
                                                                student.receipt = {
                                                                    value: 'done',
                                                                    receiptCoachingDate: this.state.receiptCoachingDate,
                                                                    receiptDate: this.state.receiptDate,
                                                                    receiptTrainings: this.state.trainings,
                                                                    date: Date.now()
                                                                }
                                                                student.trainings = this.state.trainings
                                                                console.log(student)
                                                                this.props.updateStudent(student)
                                                            }} >Enregistrer</button>

                                                            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                                                                {({ blob, url, loading, error }) => (loading ? <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', marginLeft: '1rem' }}>Generer</button> : <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', marginLeft: '1rem' }}>Telecharger le pdf</button>)}
                                                            </PDFDownloadLink>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="receiptCoachingDate">Date du coaching prévu: </label>
                                                        <input type="date" name="receiptCoachingDate" className="form-control form-control-sm" value={this.state.student.hasOwnProperty('receipt') ? this.state.student.receipt.receiptCoachingDate : null} onChange={(e) => this.handleInputChange(e)} />

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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>5</p>
                                                    <div className="text">
                                                        <p className="title">Coaching</p>
                                                        <p className="date">{typeof this.state.student.coaching == 'object' && this.state.student.coaching.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.coaching.date / 1000).format('DD/MM/YYYY') : 'A faire'} </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.coaching == 'object' && this.state.student.coaching.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="4">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="coachingDate">Date: </label>
                                                        <input type="date" className="form-control form-control-sm" name="coachingDate" value={this.state.student.hasOwnProperty('coaching') ? this.state.student.coaching.coachingDate : null} onChange={(e) => this.handleInputChange(e)} />

                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="interviewer">Réalisé par: </label>
                                                        <select name="interviewer" className='custom-select' onChange={(e) => this.handleInputChange(e)}>
                                                            <option defaultValue>{this.state.student.hasOwnProperty('coaching') && this.state.student.coaching.coachingInterviewer != 'undefined' ? this.state.student.coaching.coachingInterviewer : 'Conseiller'}</option>
                                                            <option value="Tayeb">Tayeb</option>
                                                            <option value="Nicolas">Nicolas</option>
                                                            <option value="Sandrine">Sandrine</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="coachingComment">Commentaires :</label>
                                                        <textarea type="text" className="form-control form-control-sm" name="coachingComment" value={this.state.student.hasOwnProperty('coaching') ? this.state.student.coaching.coachingComment : null} onChange={(e) => this.handleInputChange(e)} />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                            let student = this.state.student
                                                            student.coaching = {
                                                                value: 'done',
                                                                coachingDate: this.state.coachingDate,
                                                                coachingInterviewer: this.state.interviewer,
                                                                coachingComment: this.state.coachingComment,
                                                                date: Date.now()
                                                            }
                                                            console.log(student)
                                                            this.props.updateStudent(student)
                                                        }} >Enregistrer</button>
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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>6</p>
                                                    <div className="text">
                                                        <p className="title">Prospection téléphonique</p>
                                                        <p className="date">{typeof this.state.student.phoning == 'object' && this.state.student.phoning.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.phoning.date / 1000).format('DD/MM/YYYY') : 'A faire'} </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.phoning == 'object' && this.state.student.phoning.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="5">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <Timeline>
                                                        {typeof this.state.student.phoning == 'object' && this.state.student.phoning.sessions.length > 0 ? this.state.student.phoning.sessions.reverse().map(s => {
                                                            console.log(moment(s.date, 'YYYY-MM-DD').date())
                                                            return (
                                                                <Content>
                                                                    <ContentYear
                                                                        startMonth={moment(s.date, 'YYYY-MM-DD').month() == 13 ? moment(s.date, 'YYYY-MM-DD').month()
                                                                            - 1 : moment(s.date, 'YYYY-MM-DD').month() + 1}
                                                                        monthType="text"
                                                                        startDay={moment(s.date, 'YYYY-MM-DD').date()}
                                                                        startYear={moment(s.date, 'YYYY-MM-DD').year()}
                                                                    />
                                                                    <ContentBody title="Prospection">
                                                                        <Description
                                                                            text={s.comment}
                                                                        />
                                                                    </ContentBody>
                                                                </Content>)
                                                        }) : null}
                                                    </Timeline>

                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="phoningDate">Date: </label>
                                                        <input type="date" name="phoningDate" className="form-control form-control-sm" onChange={(e) => this.handleInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-12">
                                                        <label for="phoningComment">Commentaires :</label>
                                                        <textarea type="text" name="phoningComment" className="form-control form-control-sm" onChange={(e) => this.handleInputChange(e)} />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                            let student = this.state.student
                                                            student.phoning = {
                                                                value: 'done',
                                                                sessions: [...this.state.student.phoning.sessions, { date: this.state.phoningDate, comment: this.state.phoningComment }],
                                                                date: Date.now()
                                                            }
                                                            console.log(student)
                                                            this.props.updateStudent(student)
                                                        }} >Ajouter</button>
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
                                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>7</p>
                                                    <div className="text">
                                                        <p className="title">Rentrée</p>
                                                        <p className="date">{typeof this.state.student.scolarship == 'object' && this.state.student.scolarship.value.length > 0 ? 'Fait le : ' + moment.unix(this.state.student.scolarship.date / 1000).format('DD/MM/YYYY') : 'A faire'} </p>
                                                    </div>
                                                </div>
                                                <div style={{ alignSelf: 'center' }}>
                                                    {typeof this.state.student.scolarship == 'object' && this.state.student.scolarship.value.length > 0 ? <i className="dot-green"></i> : <i className="dot-red"></i>}
                                                </div>
                                            </div>
                                        </section>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="6">
                                        <Card.Body>
                                            <div className="form-student">
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label for="scolarshipDate">Date: </label>
                                                        <input type="date" name="scolarshipDate" className="form-control form-control-sm" value={this.state.student.hasOwnProperty('scolarship') ? this.state.student.scolarship.scolarshipDate : null} onChange={(e) => this.handleInputChange(e)} />
                                                        <button className="btn btn-primary btn-add-student" style={{ marginTop: '2rem', border: 'none' }} onClick={() => {
                                                            let student = this.state.student
                                                            student.scolarship = {
                                                                value: 'done',
                                                                scolarshipDate: this.state.scolarshipDate,
                                                                scolarshipClassroom: this.state.scolarshipClassroom,
                                                                date: Date.now()

                                                            }
                                                            student.status = 'apprenant'
                                                            console.log(student)
                                                            this.props.updateStudent(student)
                                                        }} >Enregistrer</button>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label for="scolarshipClassroom">Classe: </label>
                                                        <select name="scolarshipClassroom" className='custom-select' onChange={(e) => this.handleInputChange(e)} value={typeof this.state.student.scolarship == "object" ? this.state.student.scolarship.scolarshipClassroom : this.state.scolarshipClassroom}>
                                                            <option defaultValue>Classe</option>
                                                            <option value="TIIS 1">TIIS 1</option>
                                                            <option value="TIIS 2">TIIS 2</option>
                                                            <option value="TIIS XEFI">TIIS XEFI</option>
                                                            <option value="BTS SIO 1">BTS SIO 1</option>
                                                            <option value="BTS SIO 2">BTS SIO 2</option>
                                                            <option value="B1 RPI">B1 RPI</option>
                                                            <option value="B2 RPI D">B2 RPI D</option>
                                                            <option value="B2 RPI R">B2 RPI R</option>
                                                            <option value="B3 R">B3 R</option>
                                                            <option value="B3 D">B3 D</option>
                                                            <option value="RPI D">RPI D</option>
                                                            <option value="RPI R">RPI R</option>
                                                            <option value="ESI 4 D">ESI 4 D</option>
                                                            <option value="ESI 4 R">ESI 4 R</option>
                                                            <option value="ESI 5">ESI 5</option>
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

                <SlidingPanel
                    type={'right'}
                    isOpen={this.state.openCreatePanel}
                    backdropClicked={() => this.setState({ openCreatePanel: false })}
                    panelClassName="panel-student"
                    size={40}
                >
                    <FormStudent />
                </SlidingPanel>
            </div >


        );
    }
}


const mapStateToProps = (state) => ({
    students: state.students.students,
    filters: state.filters
})

const mapDispatchToProps = dispatch => ({
    getStudents: () => dispatch(fromActions.getStudentsSaga()),
    updateStudent: student => dispatch(fromActions.updateStudent(student)),
    deleteStudent: student => dispatch(fromActions.deleteStudent(student))

})

export default connect(mapStateToProps, mapDispatchToProps)(Students)
