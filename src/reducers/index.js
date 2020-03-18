import { combineReducers } from 'redux'
import students from './students'
import filters from './filters'
import enterprises from './enterprises'
import employments from './employments'

const appReducer = combineReducers({
    students,
    filters,
    enterprises,
    employments
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer