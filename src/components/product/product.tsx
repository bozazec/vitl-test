import React from 'react'
import vitlVitamins from '../../assets/images/vitl-vitamins.png'
import {PrimaryButton} from "@fluentui/react";
import {IAppState} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {HomeActionTypes} from "../../pages/home/homeReducer";
import './product.scss'


export interface INutrient {
	id: string
	amount: number
}

export interface IProductProps {
	name: string
	nutrients: INutrient[]
	price: number
	quantity?: number
}

const Product = (props: IProductProps) => {
	const dispatch = useDispatch()
	const {name, nutrients, price} = props
	const config = useSelector((state: IAppState) => state.home.config)
	const tolerableUpperLimits = useSelector((state: IAppState) => state.home.tolerableUpperLimits)

	const setCartCandidate = () => {
		// Just set item as cart candidate
		dispatch({
			type: HomeActionTypes.SET_CART_CANDIDATE,
			payload: props
		})
	}

	return <div className={'product'}>
		<img src={vitlVitamins} alt={'vitamins'}/>
		<div className={'details'}>
			<div className={'name'}>{name}</div>
			<div className={'nutrients'}>
				<div className={'title'}>Nutrients:</div>
				{nutrients.map((n: INutrient) => <div key={n.id} className={'nutrient'}>
					<div>{n.id} ({n.amount} {tolerableUpperLimits[n.id].unit})</div>
				</div>)}
			</div>

		</div>
		<div>
			<div className={'price'}>{price} {config.currency}</div>
			<PrimaryButton text={'Add to cart'} onClick={setCartCandidate}/>
		</div>
	</div>
}

export default Product