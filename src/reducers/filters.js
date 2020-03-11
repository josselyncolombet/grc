let initialState = {
    source: [],
    statut:[]
}

const FiltersReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_STUDENTS':
            let sources = action.payload.map(student => {
                return student.source
            })  
            let statuts= action.payload.map(student => {
                return student.statut
            }) 
            
            state = {
                ...state,
                source: sources.filter((a, b) => sources.indexOf(a) === b),
                statut: statuts.filter((a, b) => sources.indexOf(a) === b),
            }
            return state;
        default:
            return state;
    }
}

export default FiltersReducer