import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const apiRequest = async () => {
            const url = "http://localhost:4000/api/pokemons";
            const res = await fetch(url);
            const result = await res.json();

            const pokemonsArray = result.results.map(pokemon => {
                const obj = {
                    name: pokemon.name,
                    pokeId: pokemon.pokeId,
                    sprite: pokemon.sprites
                }

                return obj;
            });

            setPokemons(pokemonsArray);
        }

        apiRequest();
    }, []);

    return (
        <>
            <div className="bg-gray-600 rounded-xl mx-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                        <h2 className="text-2xl font-bold text-white">Pokedex</h2>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                pokemons.map(pokemon => (
                                    <PokemonCard
                                        pokemon={pokemon}
                                        key={pokemon.pokeId}
                                    >

                                    </PokemonCard>
                                )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonList