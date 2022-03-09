import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import './App.css';
import Home from "./pages/home/home";
import Page404 from "./pages/page404/page404";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="header">
					Vitl
				</header>
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path={'*'} element={<Page404/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
