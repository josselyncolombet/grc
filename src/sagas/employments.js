import {
  takeLatest,
  call,
  put,
  takeEvery,
  select,
  fork
} from 'redux-saga/effects'
import * as fromActions from '../actions'
import * as fromApi from '../api/employmentsApi'

const watchGetEmployments = function* () {
  try {
    const employments = yield fromApi.getEmployments()
    yield put(fromActions.allEmployments(employments))
  } catch (error) {
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
}

const watchAddEmployment = function* (action) {
  try{
    const employment = yield call(fromApi.addEmployment, action.payload)
    const employments = yield call(fromApi.getEmployments)
    yield put(fromActions.allEmployments(employments))
  } catch (error){
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
   
}

function* rootSaga() {
  yield takeLatest(fromActions.GET_EMPLOYMENTS_SAGA, watchGetEmployments)
  yield takeEvery(fromActions.ADD_EMPLOYMENT_SAGA, watchAddEmployment)
}

export default rootSaga
