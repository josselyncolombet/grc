import { combineReducers } from 'redux'
import students from './students'

const appReducer = combineReducers({
    students,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer