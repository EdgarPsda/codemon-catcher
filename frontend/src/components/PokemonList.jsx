import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard"
import SearchBar from "./SearchBar";
import { formatData } from "../utils/formatData";

const PokemonList = () => {

    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState("http://localhost:4000/api/pokemons");
    const [prev, setPrev] = useState("");
    const [next, setNext] = useState("");
    const [filterTerm, setFilterTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res;
                let result;

                if (filterTerm !== '') {
                    res = await fetch(`http://localhost:4000/api/pokemons/search?name=${filterTerm}`);
                } else {
                    res = await fetch(url);
                }

                if (!res.ok) {
                    throw new Error("Request data failed.");
                }
                result = await res.json();

                const pokemonsArray = formatData(filterTerm !== '' ? result : result.results);
                setPokemons(pokemonsArray);

                if (filterTerm === '') {
                    setPrev(result.previous);
                    setNext(result.next);
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [filterTerm, url]);

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
                        <SearchBar setFilterTerm={setFilterTerm}></SearchBar>
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