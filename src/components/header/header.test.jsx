import React from 'react';
import {render, screen} from '@testing-library/react';
import Header from './Header'
import TestRenderer, {act} from 'react-test-renderer'
import {Icon, initializeIcons} from '@fluentui/react'
import {store} from "../../index";
import {Provider} from "react-redux";

initializeIcons(undefined, {disableWarnings: true})


describe('Header', () => {
	// Test using render and screen from @testing-library/react
	test('Rendering', () => {
		render(<Provider store={store}><Header/></Provider>)
		act(() => {
			expect(screen.getByTestId('logo')).toBeTruthy()
		})
	})

	// test('Snapshot with height 0', () => {
	// 	const tree = TestRenderer.create(<AfCollapsible content={'testWord'}/>)
	//
	// 	//Check if height is set to 0
	// 	expect(tree.root.findByProps({'data-testid': 'contentContainer'}).props.style).toEqual({"height": 0});
	//
	// 	// Check initial snapshot
	// 	expect(tree.toJSON()).toMatchSnapshot();
	// })
	//
	// test('Test onChange and height from 0 to auto', () => {
	// 	// Setting mock for setExpand is not necessary for this test case
	// 	// const setExpand = jest.fn();
	// 	// const spy = jest.spyOn(React, 'useState')
	// 	// spy.mockImplementation((expand) => [expand, setExpand])
	//
	// 	// render the component
	// 	let renderer = TestRenderer.create(<AfCollapsible content={'dummy text'}/>)
	// 	const instance = renderer.root
	//
	// 	// Check height to be "0"
	// 	expect(instance.findByProps({'data-testid': 'contentContainer'}).props.style).toEqual({"height": 0});
	// 	// Check snapshot
	// 	expect(renderer.toJSON()).toMatchSnapshot();
	//
	// 	act(() => {
	// 		instance.findByType(Icon).props.onClick()
	// 	})
	//
	// 	// Check is height now "auto"
	// 	expect(instance.findByProps({'data-testid': 'contentContainer'}).props.style).toEqual({"height": "auto"});
	//
	// 	// Check another snapshot with height "auto"
	// 	expect(renderer.toJSON()).toMatchSnapshot();
	// })
})


