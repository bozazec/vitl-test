import React, {useEffect, useState} from 'react'
import logo from "../../assets/images/logo.svg";
import {Icon, PrimaryButton, useTheme} from "@fluentui/react";
import {useDispatch, useSelector} from "react-redux";
import {IAppState} from "../../store";
import {HomeActionTypes} from "../../pages/home/homeReducer";
import CheckoutModal from "./checkoutModal";
import './header.scss'
import CartItem from "../cartItem/cartItem";


const Header = () => {
	const theme = useTheme()
	const dispatch = useDispatch()
	const cart = useSelector((state: IAppState) => state.home.cart)
	const config = useSelector((state: IAppState) => state.home.config)
	const update = useSelector((state: IAppState) => state.home.updateAvailable)
	const [qty, setQty] = useState(0)
	const [showCart, setShowCart] = useState(false)
	const [total, setTotal] = useState(0)

	const [showCheckoutModal, setShowCheckoutModal] = useState(false)

	useEffect(() => {
		let quantity = 0
		let _total = 0
		Object.keys(cart).forEach((key: string) => {
			quantity = quantity + cart[key].quantity
			_total = _total + (cart[key].price * cart[key].quantity)
		})
		setQty(quantity)
		setTotal(_total)
	}, [cart])

	const checkout = () => {
		dispatch({
			type: HomeActionTypes.SET_CART,
			payload: {}
		})
		setShowCheckoutModal(true)
		setTimeout(() => {
			setShowCheckoutModal(false)
		}, 2000)
	}

	// Update the service worker and reload the app
	const updateApp = () => {
		const registrationWaiting = update?.waiting;
		if (registrationWaiting) {
			registrationWaiting.postMessage({type: 'SKIP_WAITING'});
			registrationWaiting.addEventListener('statechange', (e: any) => {
				if (e.target.state === 'activated') {
					window.location.reload();
				}
			});
		}
	}

	return <header className="header" style={{backgroundColor: theme.palette.themePrimary}}>
		<img className={'logo'} src={logo} alt={'vitl'}/>
		{/*Update button*/}
		{update && <Icon iconName={'CloudDownload'} className={'update'} onClick={updateApp}/>}
		{/*Cart button*/}
		<Icon onClick={() => setShowCart(!showCart)} className={'cart'} iconName={'ShoppingCart'} ariaLabel={'cart'}/>

		{/*Badge*/}
		{Object.keys(cart).length > 0 ? <div className={'badge'} onClick={() => setShowCart(!showCart)}>{qty}</div> : null}


		{Object.keys(cart).length > 0 ? <div>
			{/*Cart header*/}
			<div className={`cartContainer ${showCart ? 'open' : ''}`} style={{height: 'fit-content'}}>
				<div className={'cartHeader'}>
					<div className={'name'}>Item</div>
					<div className={'qty'}>Qty</div>
					<div className={'price'}>$</div>
				</div>

				{/*Cart items*/}
				{Object.values(cart).map((item: any) => <CartItem key={item.name} {...item} config={config}/>)}

				{/*Total amount to pay*/}
				<div className={'total'}>
					<div className={'title'}>Total</div>
					<div>{total.toFixed(1)} {config.currency}</div>
				</div>

				{/*Checkout button*/}
				<PrimaryButton text={'Checkout'} onClick={checkout}/>
			</div>
		</div> : null}
		<CheckoutModal isOpen={showCheckoutModal}/>
	</header>
}

export default Header

