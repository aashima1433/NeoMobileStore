import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserNavbar from "../components/UserNav/UserNav";
import { MemoryRouter } from 'react-router-dom';

describe('UserNavbar Component', () => {
    
    const userNav = render(<MemoryRouter><UserNavbar /></MemoryRouter>);

    const mobileCartButton = screen.queryByTestId('mobileCartButton');
    const mobileHomeButton = screen.queryByTestId('mobileHomeButton');
    const mobileOrderButton = screen.queryByTestId('mobileOrderButton');
    const logoutButton = screen.queryByTestId('logoutButton');
    const userNavbar = screen.queryByTestId('userNavbar');

    test('feUserNavbar1', () => {
        expect(mobileCartButton).toBeTruthy();
        expect(mobileHomeButton).toBeTruthy();
        expect(mobileOrderButton).toBeTruthy();
        expect(logoutButton).toBeTruthy();
        expect(userNavbar).toBeTruthy();
    });

})