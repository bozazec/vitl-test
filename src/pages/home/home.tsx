import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../../store";
import {Spinner, SpinnerSize, useTheme, Text} from "@fluentui/react";
import {HomeActionTypes} from "./homeReducer";
import homeService from "./homeService";
import Product, {IProductProps} from "../../components/product/product";
import './home.scss'
import AddToCartModal from "../../components/addToCartModal/addToCartModal";

const Home = () => {
	const dispatch = useDispatch()
	const theme = useTheme()
	const products = useSelector((state: IAppState) => state.home.products)
	const cartCandidate = useSelector((state: IAppState) => state.home.cartCandidate)

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setError('')
		setLoading(true)
		homeService.getItems()
			.then(res => {
				const {data} = res
				data.config && dispatch({type: HomeActionTypes.SET_CONFIG, payload: data.config})
				data.products && dispatch({type: HomeActionTypes.SET_PRODUCTS, payload: data.products})
			})
			.catch(e => {
				setError(e.message)
			})
			.finally(() => setLoading(false))
	}, [dispatch])
	return <>
		<Text variant={'xxLarge'}>The one supplement for the one you</Text>
		<Text block variant={'medium'}>Get your personalised daily multivitamin tailor-made for you in just 5 minutes.</Text>
		<div className={'products'}>
			{products.map((p: IProductProps, i: number) => <Product key={i} {...p}/>)}
			{error && <div style={{color: theme.palette.red}}>{error}</div>}
		</div>
		<div>{loading && <Spinner size={SpinnerSize.medium}/>}</div>
		{cartCandidate && <AddToCartModal />}
	</>
}

export default Home