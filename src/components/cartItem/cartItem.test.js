import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import CartItem from "./cartItem";
import {mockReduxStore} from "../header/header.test";


const mockConfig = {
	"tolerableUpperLimits": [
		{
			"id": "vitamin-a",
			"amount": 1500,
			"unit": "mcg"
		},
		{
			"id": "vitamin-c",
			"amount": 1000,
			"unit": "mg"
		},
		{
			"id": "vitamin-d",
			"amount": 75,
			"unit": "mcg"
		},
		{
			"id": "vitamin-e",
			"amount": 540,
			"unit": "mg"
		},
		{
			"id": "zinc",
			"amount": 25,
			"unit": "mg"
		}
	],
	"currency": "GBP"
}

const mockItemProps = {
	name: 'Vitamin D',
	price: 10,
	quantity: 1,
	config: mockConfig
}

describe('CartItem', () => {
	// Test using render and screen from @testing-library/react
	test('Rendering', () => {
		const {container} = render(<Provider store={mockReduxStore}>
			<CartItem {...mockItemProps}/>
		</Provider>)

		expect(container).toMatchSnapshot()
	})

	test('Add item', async () => {
		jest.useFakeTimers()
		render(<Provider store={mockReduxStore}>
			<CartItem {...mockItemProps}/>
		</Provider>)

		const addItemButton = screen.getByTestId('addItemButton')
		fireEvent.click(addItemButton)
		await act(async () => {
				jest.runOnlyPendingTimers();
			});

		setTimeout(async () => {
			const qty = await screen.findByTestId('quantityTestId')

			expect(qty).toHaveTextContent('2')
		}, 1000)

	})
})