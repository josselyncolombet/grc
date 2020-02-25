let initialState = {
    students: [],
}

const StudentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_STUDENTS':
            state = {
                ...state,
                students: action.students
            }
            return state;
        default:
            return state;
    }
}

export default StudentsReducer