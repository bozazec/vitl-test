import React from 'react'
import {Modal} from "@fluentui/react";
import {contentModalStyles} from "../addToCartModal/addToCartModal";

interface ICheckoutProps {
	isOpen: boolean
}
const CheckoutModal = (props: ICheckoutProps) => {
	const {isOpen} = props
	return <Modal
		isOpen={isOpen}
		containerClassName={contentModalStyles.container}
	>
		<div className={contentModalStyles.header}>
			<div id={'title'}>Fantastic</div>
		</div>
		<div className={contentModalStyles.body}>
			<div className={'subtitle'}>Your order is on the way</div>
		</div>
	</Modal>
}

export default CheckoutModal