import {Action} from "redux"

export const HomeActionTypes = {
	SET_CONFIG: 'SET_CONFIG',
	SET_PRODUCTS: 'SET_PRODUCTS',
	SET_CART: 'SET_CART',
	SET_CART_CANDIDATE: 'SET_CART_CANDIDATE',
	REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
	ADD_CART_ITEM: 'ADD_CART_ITEM',
	UPDATE_AVAILABLE: 'UPDATE_AVAILABLE'
}

export interface IHomeAction extends Action {
	type: typeof HomeActionTypes.SET_PRODUCTS |
		typeof HomeActionTypes.SET_CONFIG |
		typeof HomeActionTypes.SET_CART |
		typeof HomeActionTypes.SET_CART_CANDIDATE |
		typeof HomeActionTypes.UPDATE_AVAILABLE
	payload: any
}

export interface IHomeReducer {
	config: any
	products: any[]
	tolerableUpperLimits: any
	cart: any
	cartCandidate: any
	updateAvailable: any
}

const initialState: IHomeReducer = {
	config: null,
	products: [],
	tolerableUpperLimits: {},
	cart: {},
	cartCandidate: null,
	updateAvailable: null // here we expect service worker registration once it get update so we can skip waiting and reload the page
}

export function homeReducer(state = initialState, action: IHomeAction) {
	switch (action.type) {
		case HomeActionTypes.SET_CONFIG:
			const tolerableUpperLimits = {}
			action.payload.tolerableUpperLimits.forEach(item => tolerableUpperLimits[item.id] = item)
			return Object.assign({}, state, {config: action.payload, tolerableUpperLimits})
		case HomeActionTypes.SET_PRODUCTS:
			return Object.assign({}, state, {products: action.payload})
		case HomeActionTypes.SET_CART:
			return Object.assign({}, state, {cart: action.payload})
		case HomeActionTypes.SET_CART_CANDIDATE:
			return Object.assign({}, state, {cartCandidate: action.payload})
		case HomeActionTypes.REMOVE_CART_ITEM: {
			const name = action.payload
			const newCart = {...state.cart}
			if (newCart[name].quantity === 1) {
				delete newCart[name]
				return Object.assign({}, state, {cart: newCart})
			} else {
				return Object.assign({}, state, {
					cart: Object.assign({}, state.cart,
						{
							[action.payload]: {
								...state.cart[action.payload],
								quantity: state.cart[action.payload].quantity - 1
							}
						})
				})
			}
		}

		case HomeActionTypes.ADD_CART_ITEM:
			return Object.assign({}, state,
				{
					cart: Object.assign({}, state.cart,
						{
							[action.payload]: {
								...state.cart[action.payload],
								quantity: state.cart[action.payload].quantity + 1
							}
						})
				})
		case HomeActionTypes.UPDATE_AVAILABLE:
			return Object.assign({}, state, {updateAvailable: action.payload})
		default:
			return state
	}
}