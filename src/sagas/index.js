import { fork } from 'redux-saga/effects'
import students from './students'
import enterprises from './enterprises'
import employments from './employments'

function* rootSaga() {
  yield fork(students)
  yield fork(enterprises)
  yield fork(employments)
}

export default rootSaga