import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.scss';
import Home from "./pages/home/home";
import Page404 from "./pages/page404/page404";
import Header from "./components/header/header";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<div className={'content'}>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path={'*'} element={<Page404/>}/>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
