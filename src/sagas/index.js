import { fork } from 'redux-saga/effects'
import students from './students'

function* rootSaga() {
  yield fork(students)
}

export default rootSaga