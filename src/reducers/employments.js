let initialState = {
    employments: [],
}

const EmploymentsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_EMPLOYMENTS':
            state = {
                ...state,
                employments: action.payload
            }
            return state;
        default:
            return state;
    }
}

export default EmploymentsReducer