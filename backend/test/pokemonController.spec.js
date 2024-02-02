const pokemons = require("../controller/pokemonController");
const Pokemon = require("../models/Pokemon.js");

// Mock del modelo Pokemon
jest.mock('../models/Pokemon', () => ({
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockImplementation(() => Promise.resolve([{ name: 'Pikachu', pokeId: 25 }])),
    countDocuments: jest.fn().mockResolvedValue(100),
}));

describe('Endpoints', () => {
    describe('pokemons', () => {
        describe('get', () => {
            it('return pokemons json', async () => {

                const res = {
                    json: jest.fn()
                }

                const req = {
                    query: {
                        page: 1,
                        pageSize: 10
                    },
                    protocol: 'http',
                    get: jest.fn().mockReturnValue('localhost'),
                    baseUrl: '/api/pokemons'
                }

                // Configuring mocks to return specific data
                Pokemon.countDocuments.mockResolvedValue(100);

                await pokemons.pokemons(req, res);

                expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                    count: 100,
                    next: 'http://localhost/api/pokemons?page=2&pageSize=10',
                    previous: null,
                    results: expect.any(Array)
                }));

                expect(Pokemon.countDocuments).toHaveBeenCalled();
                expect(Pokemon.find).toHaveBeenCalled();
            });
        })
    })
});