import React from 'react';
import {render, screen, act, fireEvent} from '@testing-library/react';
import Header from './header'
import {initializeIcons} from '@fluentui/react'
import {Provider} from "react-redux";
import {getStore} from "../../store";

initializeIcons(undefined, {disableWarnings: true})

export const mockStoreWithFullCart = {
	home: {
		"config": {
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
		},
		"products": [
			{
				"name": "Vitamin A",
				"price": 6,
				"nutrients": [
					{
						"id": "vitamin-a",
						"amount": 800
					}
				]
			},
			{
				"name": "Vitamin C",
				"price": 4.5,
				"nutrients": [
					{
						"id": "vitamin-c",
						"amount": 500
					}
				]
			},
			{
				"name": "Vitamin D",
				"price": 2.3,
				"nutrients": [
					{
						"id": "vitamin-d",
						"amount": 25
					}
				]
			},
			{
				"name": "Vitamins A, C & E",
				"price": 10,
				"nutrients": [
					{
						"id": "vitamin-a",
						"amount": 800
					},
					{
						"id": "vitamin-c",
						"amount": 500
					},
					{
						"id": "vitamin-e",
						"amount": 500
					}
				]
			},
			{
				"name": "Vitamin C and Zinc",
				"price": 5.6,
				"nutrients": [
					{
						"id": "vitamin-c",
						"amount": 500
					},
					{
						"id": "zinc",
						"amount": 15
					}
				]
			}
		],
		"tolerableUpperLimits": {
			"vitamin-a": {
				"id": "vitamin-a",
				"amount": 1500,
				"unit": "mcg"
			},
			"vitamin-c": {
				"id": "vitamin-c",
				"amount": 1000,
				"unit": "mg"
			},
			"vitamin-d": {
				"id": "vitamin-d",
				"amount": 75,
				"unit": "mcg"
			},
			"vitamin-e": {
				"id": "vitamin-e",
				"amount": 540,
				"unit": "mg"
			},
			"zinc": {
				"id": "zinc",
				"amount": 25,
				"unit": "mg"
			}
		},
		"cart": {
			"Vitamin D": {
				"name": "Vitamin D",
				"price": 2.3,
				"nutrients": [
					{
						"id": "vitamin-d",
						"amount": 25
					}
				],
				"quantity": 1
			},
			"Vitamin C": {
				"name": "Vitamin C",
				"price": 4.5,
				"nutrients": [
					{
						"id": "vitamin-c",
						"amount": 500
					}
				],
				"quantity": 1
			},
			"Vitamin A": {
				"name": "Vitamin A",
				"price": 6,
				"nutrients": [
					{
						"id": "vitamin-a",
						"amount": 800
					}
				],
				"quantity": 1
			}
		},
		"cartCandidate": null,
		"updateAvailable": null
	}
}

export const mockReduxStore = getStore(mockStoreWithFullCart)

describe('Header', () => {
	// Test using render and screen from @testing-library/react
	test('Rendering', () => {
		render(<Provider store={mockReduxStore}><Header/></Provider>)
		act(() => {
			expect(screen.getByTestId('logo')).toBeTruthy()
		})
	})

	test('Snapshot with right 450', () => {
		const {container} = render(<Provider store={mockReduxStore}><Header/></Provider>)

		expect(container).toMatchSnapshot()
	})

	test('Cart click event', () => {
		render(<Provider store={mockReduxStore}><Header/></Provider>)
		const cartButton = screen.getByTestId('cartButton')
		fireEvent.click(cartButton)

		const cartContainer = screen.getByTestId('cartContainer')
		expect(cartContainer.classList.contains('open')).toBeTruthy()
	})

})


