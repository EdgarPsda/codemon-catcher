import { BrowserRouter } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('PokemonList Component', () => {
    test('should render title, searchbar and navigation buttons', () => {

        const { getByText, getByPlaceholderText } = render(
            <BrowserRouter>
                <PokemonList></PokemonList>
            </BrowserRouter>
        );

        expect(getByText('Pokedex')).toBeInTheDocument();
        expect(getByPlaceholderText('Search by Name')).toBeInTheDocument();

    });

    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                count: 1,
                results: [{ pokeId: 1, name: 'Bulbasaur' }],
                previous: null,
                next: null,
            }),
        });

    });

    afterEach(() => {
        // Clearing mocks created
        jest.restoreAllMocks();
    });

    test('should fetch initial data and show pokemon list', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <PokemonList></PokemonList>
            </BrowserRouter>
        );
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/pokemons');
        expect(getByText('Previous')).toBeDisabled();
        expect(getByText('Next')).toBeDisabled();
    });

})
