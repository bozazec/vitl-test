import React from "react";
import {render, screen, act} from "@testing-library/react";
import {Provider} from "react-redux";
import Product from './product'
import {getStore} from "../../store";

const mockProduct = {
	name: 'product1',
	nutrients: [{
		id: 'vitamin-1',
		amount: 500
	}, {
		id: 'vitamin-2',
		amount: 600
	}, {
		id: 'vitamin-3',
		amount: 700
	}],
	price: 10
}

const mockStore = {
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
		"cart": {},
		"cartCandidate": null,
		"updateAvailable": null
	}
}

const store = getStore(mockStore)

describe('Product', () => {
	// Test using render and screen from @testing-library/react
	test('Rendering', () => {
		render(<Provider store={store}>
			<Product {...mockProduct}/>
		</Provider>)
	})
})

