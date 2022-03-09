import {Action} from "redux"

export const HomeActionTypes = {
	SET_ITEMS: 'SET_ITEMS',
	UPDATE_AVAILABLE: 'UPDATE_AVAILABLE'
}

export interface IHomeAction extends Action {
	type: typeof HomeActionTypes.SET_ITEMS |
	typeof HomeActionTypes.UPDATE_AVAILABLE
	payload: any
}

export interface IHomeReducer {
	items: any[]
	updateAvailable: any
}
const initialState: IHomeReducer = {
	items: [],
	updateAvailable: null // here we expect service worker registration once it get update so we can skip waiting and reload the page
}

export function homeReducer(state = initialState, action: IHomeAction) {
	switch(action.type) {
		case HomeActionTypes.SET_ITEMS:
			return Object.assign({}, state, {items: action.payload})
		case HomeActionTypes.UPDATE_AVAILABLE:
			return Object.assign({}, state, {updateAvailable: action.payload})
		default:
			return state
	}
}