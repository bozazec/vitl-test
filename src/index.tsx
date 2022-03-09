import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorkerRegistration';
import {getStore} from "./store";
import {HomeActionTypes} from "./pages/home/homeReducer";
import {Provider} from "react-redux";
import {initializeIcons} from "@fluentui/react";
import '@fluentui/react/dist/sass/Fabric.scss';

// Initiliaze Fabric icons
initializeIcons()

export const store = getStore()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorker.register({
	onUpdate: registration => {
		store.dispatch({
			type: HomeActionTypes.UPDATE_AVAILABLE,
			payload: registration
		})
	}
});
