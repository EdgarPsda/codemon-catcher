import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState("http://localhost:4000/api/pokemons");
    const [prev, setPrev] = useState("");
    const [next, setNext] = useState("");

    useEffect(() => {
        const apiRequest = async () => {
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
            setPrev(result.previous);
            setNext(result.next);
        }

        apiRequest();
    }, [url]);

    const handlePrev = () => {
        setUrl(prev);
    }

    const handleNext = () => {
        setUrl(next);
    }



    return (
        <>
            <div className="bg-gray-600 rounded-xl mx-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-10">
                        <h2 className="text-5xl font-bold text-white">Pokedex</h2>
                        <div>
                            <div className="flex justify-between mt-5">
                                <button
                                    type="button"
                                    className="
                                        text-white 
                                        bg-gradient-to-r 
                                        from-teal-400 
                                        via-teal-500 
                                        to-teal-600 
                                        hover:bg-gradient-to-br 
                                        focus:ring-4 
                                        focus:outline-none 
                                        focus:ring-teal-300 
                                        dark:focus:ring-teal-800 
                                        font-medium 
                                        rounded-lg 
                                        text-sm 
                                        px-5 
                                        py-2.5 
                                        text-center 
                                        me-2 
                                        mb-2
                                        uppercase"
                                    onClick={handlePrev}
                                    disabled={prev ? false : true}
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    className="
                                        text-white
                                        bg-gradient-to-r 
                                        from-teal-400 
                                        via-teal-500 
                                        to-teal-600
                                        hover:bg-gradient-to-br 
                                        focus:ring-4
                                        focus:outline-none
                                        focus:ring-teal-300
                                        dark:focus:ring-teal-800
                                        font-medium
                                        rounded-lg
                                        text-sm
                                        px-5
                                        py-2.5
                                        text-center
                                        me-2
                                        mb-2
                                        uppercase"
                                    onClick={handleNext}
                                    disabled={next ? false : true}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
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