import React from 'react'
import {useDispatch} from "react-redux";
import {HomeActionTypes} from "../../pages/home/homeReducer";
import {Icon} from "@fluentui/react";
import {IProductProps} from "../product/product";

interface ICartItemProps extends IProductProps{
	config: any
}

const CartItem = (props: ICartItemProps) => {
	const {name, price, quantity = 1, config} = props
	const dispatch = useDispatch()
	const removeItem = (name: string) => {
		dispatch({
			type: HomeActionTypes.REMOVE_CART_ITEM,
			payload: name
		})
	}
	const addItem = (name: string) => {
		dispatch({
			type: HomeActionTypes.ADD_CART_ITEM,
			payload: name
		})
	}
	return <div className={'cartItem'}>
		<div className={'name'}>{name}</div>
		<div data-testid={'qty'} className={'qty'}>
			<Icon iconName={'Remove'} onClick={() => removeItem(name)}/>
			<span data-testid={'quantityTestId'}>{quantity}</span>
			<Icon data-testid={'addItemButton'} iconName={'Add'} onClick={() => addItem(name)}/>
		</div>
		<div className={'price'}>{(price * quantity).toFixed(1)} {config.currency}</div>
	</div>
}

export default CartItem