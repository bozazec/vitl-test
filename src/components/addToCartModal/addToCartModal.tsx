import React, {useCallback, useEffect, useState} from 'react'
import {DefaultButton, FontWeights, getTheme, mergeStyleSets, Modal, PrimaryButton} from "@fluentui/react";
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../../store";
import {HomeActionTypes} from "../../pages/home/homeReducer";
import {INutrient} from "../product/product";

const AddToCartModal = () => {
	const dispatch = useDispatch()
	const cartCandidate = useSelector((state: IAppState) => state.home.cartCandidate)
	const tolerableUpperLimits = useSelector((state: IAppState) => state.home.tolerableUpperLimits)
	const cart = useSelector((state: IAppState) => state.home.cart)
	const [exceedLimit, setExceedLimit] = useState<any>(null)

	const addItemToCart = useCallback(() => {
		// TODO add item to cart
		// Update existing cart
		const newCart: any = {...cart}
		if (newCart[cartCandidate.name]) {
			newCart[cartCandidate.name] = {...cartCandidate, quantity: newCart[cartCandidate.name].quantity + 1}
		} else {
			newCart[cartCandidate.name] = {...cartCandidate, quantity: 1}
		}
		dispatch({
			type: HomeActionTypes.SET_CART,
			payload: newCart
		})
		dispatch({
			type: HomeActionTypes.SET_CART_CANDIDATE,
			payload: null
		})
	}, [dispatch, cartCandidate, cart])

	useEffect(() => {
		// Define exceedLimitObj
		const exceedLimitObj = {}

		// Get current amount of ingredients in the cart
		const amounts: any = Object.values(cart).reduce((acc: any, item: any) => {
			const newAcc = {...acc}
			item.nutrients.forEach((n: INutrient) => {
				newAcc[n.id] = (newAcc[n.id] ? newAcc[n.id] : 0) + (n.amount * item.quantity)
			})
			return newAcc
		}, {})

		// Check if item exceed the amount in the cart
		cartCandidate.nutrients.forEach((nutrient: INutrient) => {
			const {id, amount} = nutrient
			if (amount + amounts[id] > tolerableUpperLimits[id].amount) {
				exceedLimitObj[id] = nutrient
			}
		})

		// If exceed open modal to ask for an action, or just add into cart
		if (Object.keys(exceedLimitObj).length) {
			setExceedLimit(exceedLimitObj)
		} else {
			addItemToCart()
		}
	}, [addItemToCart, cart, cartCandidate, tolerableUpperLimits])


	const dismiss = () => {
		dispatch({
			type: HomeActionTypes.SET_CART_CANDIDATE,
			payload: null
		})
	}

	return <Modal
		isOpen={cartCandidate}
		containerClassName={contentModalStyles.container}
	>
		<div className={contentModalStyles.header}>
			<div id={'title'}>Tolerable limit warning</div>
		</div>
		<div className={contentModalStyles.body}>
			<div className={'subtitle'}>Adding {cartCandidate.name} to cart a tolerable upper limit will be exceeded</div>
			<div className={'text'}>Exceeded nutrients:</div>
			<div>{exceedLimit && Object.values(exceedLimit).map((nutrient: any) => <div key={nutrient.id}>{nutrient.id} has daily upper limit of {tolerableUpperLimits[nutrient.id].amount}{tolerableUpperLimits[nutrient.id].unit} </div>)}</div>
		</div>
		<div className={contentModalStyles.controles} style={{padding: '12px 24px 24px 24px'}}>
			<PrimaryButton
				text={'Add anyway'}
				onClick={addItemToCart}
				allowDisabledFocus
			/>
			<DefaultButton
				text={'Cancel'}
				onClick={dismiss}
				allowDisabledFocus
			/>
		</div>
	</Modal>
}

export default AddToCartModal

const theme = getTheme()
export const contentModalStyles = mergeStyleSets({
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'stretch',
	},
	header: [
		theme.fonts.xLarge,
		{
			borderTop: `4px solid ${theme.palette.themePrimary}`,
			color: theme.palette.neutralPrimary,
			display: 'flex',
			alignItems: 'center',
			fontWeight: FontWeights.semibold,
			padding: '12px 24px 14px 24px',
			selectors: {
				'#title': {
					textAlign: 'center',
					width: '100%'
				},
				'#subtitle': {
					fontSize: '18px'
				}
			}
		}
	],
	body: {
		flex: '4 4 auto',
		padding: '0 24px 24px 24px',
		overflowY: 'hidden',
		textAlign: 'center',
		selectors: {
			p: {margin: '14px 0'},
			'p:first-child': {marginTop: 0},
			'p:last-child': {marginBottom: 0},
			'.subtitle': {
				fontSize: '18px',
				marginBottom: '10px'
			},
			'.text': {
				fontSize: '18px',
				marginBottom: '5px'
			}
		}
	},
	controles: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	}
})