import { useEffect, useState } from "react"
import PokemonCard from "./PokemonCard";
import { formatData } from "../utils/formatData";

const Favorites = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [favorites, setFavorites] = useState([]);
    const [refreshFavorites, setRefreshFavorites] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/users/${currentUser._id}/favorites`);

                if (!response.ok) {
                    throw new Error("Can't get favorites pokemons.");
                }
                const favoritesData = await response.json();
                const pokemonsArray = formatData(favoritesData);
                setFavorites(pokemonsArray);

            } catch (error) {
                console.log(error);
            }
        }

        fetchFavorites();
    }, [refreshFavorites]);

    return (
        <>
            <div className="bg-gray-600 rounded-xl mx-3">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-10">
                        <h2 className="text-5xl font-bold text-white">Favorites</h2>
                        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                            {
                                favorites.length != 0 ?
                                    favorites.map(pokemon => (
                                        <PokemonCard
                                            pokemon={pokemon}
                                            key={pokemon.poke_id}
                                            favorite={true}
                                            refreshFavorites={refreshFavorites}
                                            setRefreshFavorites={setRefreshFavorites}
                                        >
                                        </PokemonCard>
                                    ))
                                    :
                                    <h1 className="text-white">No favorites</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorites