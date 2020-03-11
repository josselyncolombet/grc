import { combineReducers } from 'redux'
import students from './students'
import filters from './filters'

const appReducer = combineReducers({
    students,
    filters
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer