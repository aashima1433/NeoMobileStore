import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AddProduct from '../../components/admin/AddProduct/AddProduct';
import { MemoryRouter } from 'react-router-dom';


describe('Admin AddProduct Component', () => {

    const addProduct = render(<MemoryRouter><AddProduct /></MemoryRouter>);

    const addMobileBody = screen.queryByTestId('addMobileBody');
    const mobileName = screen.queryByTestId('mobileName');
    const mobilePrice = screen.queryByTestId('mobilePrice');
    const mobileDescription = screen.queryByTestId('mobileDescription');
    const mobileImageURL = screen.queryByTestId('mobileImageURL');
    const mobileQuantity = screen.queryByTestId('mobileQuantity')
    const addMobileButton = screen.queryByTestId('addMobileButton')

    test('feAdminAddProduct1', () => {
        expect(addMobileBody).toBeTruthy();
        expect(mobileName).toBeTruthy();
        expect(mobilePrice).toBeTruthy();
        expect(mobileDescription).toBeTruthy();
        expect(mobileImageURL).toBeTruthy();
        expect(mobileQuantity).toBeTruthy();
        expect(addMobileButton).toBeTruthy();  
        
        fireEvent.change(mobileName, {target : {value : 'testMobileName'}})
        expect(mobileName.value).toBe('testMobileName');

        fireEvent.change(mobilePrice, {target : {value : '5'}})
        expect(mobilePrice.value).toBe('5');

        fireEvent.change(mobileDescription, {target : {value : 'Mobile Description'}})
        expect(mobileDescription.value).toBe('Mobile Description');

        fireEvent.change(mobileImageURL, {target : {value : 'mobile URL'}})
        expect(mobileImageURL.value).toBe('mobile URL');

        fireEvent.change(mobileQuantity, {target : {value : '120'}})
        expect(mobileQuantity.value).toBe('120');
    })
 
})