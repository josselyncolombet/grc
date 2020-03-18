import {
  takeLatest,
  call,
  put,
  takeEvery,
  select,
  fork
} from 'redux-saga/effects'
import * as fromActions from '../actions'
import * as fromApi from '../api/enterprisesApi'

const watchGetEnterprises = function* () {
  try {
    const enterprises = yield fromApi.getEnterprises()
    yield put(fromActions.allEnterprises(enterprises))
  } catch (error) {
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
}

const watchAddEnterprise = function* (action) {
  try{
    const enterprise = yield call(fromApi.addEnterprise, action.payload)
    const enterprises = yield call(fromApi.getEnterprises)
    yield put(fromActions.allEnterprises(enterprises))
  } catch (error){
    yield put({
      type: 'ERROR',
      error: true,
      payload: error.message
    })
  }
   
}

function* rootSaga() {
  yield takeLatest(fromActions.GET_ENTERPRISES_SAGA, watchGetEnterprises)
  yield takeEvery(fromActions.ADD_ENTERPRISE_SAGA, watchAddEnterprise)
}

export default rootSaga
