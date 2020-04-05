import {
  takeLatest,
  call,
  put,
  takeEvery,
  select,
  fork
} from 'redux-saga/effects'
import * as fromActions from '../actions'
import * as fromApi from '../api/'

const watchGetStudents = function* () {
  try {
    const students = yield fromApi.getStudents()
    yield put(fromActions.allStudents(students))
  } catch (error) {
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
}

const watchAddStudent = function* (action) {
  try{
    const student = yield call(fromApi.addStudent, action.payload)
    const students = yield call(fromApi.getStudents)
    yield put(fromActions.allStudents(students))
  } catch (error){
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
   
}

const watchUpdateStudent = function* (action) {
  try{
    const student = yield call(fromApi.updateStudent, action.payload)
    const students = yield call(fromApi.getStudents)
    yield put(fromActions.allStudents(students))
  } catch (error){
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
   
}

const watchDeleteStudent = function* (action) {
  try{
    const student = yield call(fromApi.deleteStudent, action.payload)
    const students = yield call(fromApi.getStudents)
    yield put(fromActions.allStudents(students))
  } catch (error){
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
   
}

function* rootSaga() {
  yield takeLatest(fromActions.GET_STUDENTS_SAGA, watchGetStudents)
  yield takeEvery(fromActions.ADD_STUDENT_SAGA, watchAddStudent)
  yield takeEvery(fromActions.UPDATE_STUDENT, watchUpdateStudent)
  yield takeEvery(fromActions.DELETE_STUDENT, watchDeleteStudent)
}

export default rootSaga
