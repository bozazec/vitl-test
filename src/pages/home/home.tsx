import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../../store";
import {PrimaryButton} from "@fluentui/react";
import {HomeActionTypes} from "./homeReducer";

const Home = () => {
	const dispatch = useDispatch()
	const home = useSelector((state: IAppState) => state.home)
	console.log('home', home)
	const updateRedux = () => {
		dispatch({
			type: HomeActionTypes.UPDATE_AVAILABLE,
			payload: 'asdf'
		})
	}
	return <div>
		<div>Home</div>
		<div><PrimaryButton text={'click'} onClick={updateRedux}/></div>
	</div>
}

export default Home