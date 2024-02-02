
const PokemonCard = ({ pokemon }) => {
    return (
        <div className="group relative">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img src={pokemon.sprite} alt="pokemon sprite" className="h-full w-full object-cover object-center" />
            </div>
            <div className="flex justify-between mt-3 mb-8">
                <h3 className="text-sm text-white">
                    <a href="#">
                        <span className="absolute inset-0"></span>
                        {pokemon.name.toUpperCase()}
                    </a>
                </h3>
                <p className="text-base font-semibold text-white">#{pokemon.pokeId}</p>

            </div>
        </div>
    )
}

export default PokemonCard