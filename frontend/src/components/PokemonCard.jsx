import { useState } from "react"
import PokemonDetailsModal from "./PokemonDetailsModal"

const PokemonCard = ({ pokemon, favorite, refreshFavorites, setRefreshFavorites }) => {

    const [showModal, setShowModal] = useState(false);

    const handleModal = (value) => {
        setShowModal(value);
    }

    return (
        <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img src={pokemon.sprite} alt="pokemon sprite" className="h-full w-full object-cover object-center" />
            </div>
            <div className="flex justify-between mt-3 mb-8">
                <h3 className="text-sm text-white">
                    <a
                        href="#"
                        onClick={() => handleModal(true)}
                    >
                        <span className="absolute inset-0"></span>
                        {pokemon.name.toUpperCase()}
                    </a>
                </h3>
                <p className="text-base font-semibold text-white">#{pokemon.poke_id}</p>
            </div>
            {showModal ?
                <PokemonDetailsModal
                    setShowModal={setShowModal}
                    pokemon={pokemon}
                    favorite={favorite}
                    refreshFavorites={refreshFavorites}
                    setRefreshFavorites={setRefreshFavorites}
                ></PokemonDetailsModal> : <></>}
        </div>
    )
}

export default PokemonCard