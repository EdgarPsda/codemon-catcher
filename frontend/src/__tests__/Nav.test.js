import React from 'react';
import { render } from '@testing-library/react';
import Nav from '../components/Nav';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


jest.mock('../hooks/useAuth', () => ({
    __esModule: true, // Simulate module ES6
    default: jest.fn(() => ({ currentUser: null, logout: jest.fn() })),
}));


describe('Nav Component', () => {

    // Clear any mock data stored to avoid errors in futures tests
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render "Home" always and "Login" when user is not logged', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Nav />
            </BrowserRouter>
        );

        expect(getByText(/Home/i)).toBeInTheDocument();
        expect(getByText(/Login/i)).toBeInTheDocument();

    });

    test('should render "Logout" and "My Favorites" when user is logged', () => {
        require('../hooks/useAuth').default.mockReturnValue({
            currentUser: { name: "Edgar" },
            logout: jest.fn()
        });

        const { getByText } = render(
            <BrowserRouter>
                <Nav />
            </BrowserRouter>
        );

        expect(getByText(/My Favorites/i)).toBeInTheDocument();
        expect(getByText(/Logout/i)).toBeInTheDocument();

    });
});