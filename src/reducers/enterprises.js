let initialState = {
    enterprises: [],
}

const EnterprisesReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_ENTERPRISES':
            state = {
                ...state,
                enterprises: action.payload
            }
            return state;
        default:
            return state;
    }
}

export default EnterprisesReducer