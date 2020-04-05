import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Enterprise from './views/Enterprise'

import {
	Router,
	Route,
	Switch
} from 'react-router-dom'

import store, { history } from './store/configureStore'
import { saveState } from './store/localStorage';
import { Provider } from 'react-redux';

store.subscribe(() => {
    saveState(store.getState());
})

const Root = () => {
	return (
		
		<Provider store={store}>
			<Router history={history}>
				<Switch>
				<Route exact path='/' component={App} />
				
				</Switch>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<Root store={store} />, document.getElementById('root'));