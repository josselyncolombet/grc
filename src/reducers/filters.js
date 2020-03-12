let initialState = {
    source: [],
    status:[],
    trainingss:[],
    openhouse:[],
    classroom:[],
    institute:[],
    cursus:[]
}

const FiltersReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_STUDENTS':
            let sources = action.payload.map(student => student.source)  
            let status= action.payload.map(student => student.status) 
            let trainings = []
            action.payload.map(student => student.trainings.map(t => trainings.push(t)))
            let openhouse = action.payload.map(student => student.openhouse)
            let classroom = action.payload.map(student => student.classroom)
            let institute = action.payload.map(student => student.institute)
            let cursus = action.payload.map(student => student.cursus)
            
            state = {
                ...state,
                source: sources.filter((a, b) => sources.indexOf(a) === b),
                status: status.filter((a, b) => status.indexOf(a) === b),
                trainings: trainings.filter((a, b) => trainings.indexOf(a) === b),
                openhouse: openhouse.filter((a, b) => openhouse.indexOf(a) === b),
                classroom: classroom.filter((a, b) => classroom.indexOf(a) === b),
                institute: institute.filter((a, b) => institute.indexOf(a) === b),
                cursus: cursus.filter((a, b) => cursus.indexOf(a) === b),
            }
            return state;
        default:
            return state;
    }
}

export default FiltersReducer