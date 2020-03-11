import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import { loadState } from './localStorage'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'
import rootSaga from '../sagas'

const persistedStore = loadState();
const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory();


export default createStore(
    rootReducer,
    persistedStore,
    applyMiddleware(sagaMiddleware,routerMiddleware(history),logger)
);

sagaMiddleware.run(rootSaga)