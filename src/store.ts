import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {homeReducer, IHomeReducer} from "./pages/home/homeReducer";

let middlewares: any[] = []

const showLogs = true

if (showLogs) {
	middlewares.push(createLogger({
		collapsed: true
	}));
}

export interface IAppState {
	home: IHomeReducer
}

const reducer = combineReducers({
	home: homeReducer
})

export function getStore(preloadedState?: IAppState) {
	return createStore(reducer, preloadedState,
		applyMiddleware(...middlewares)
	);
}
