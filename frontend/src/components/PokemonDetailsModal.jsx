import useAuth from "../hooks/useAuth"
import { useHistory } from "react-router-dom"

const PokemonDetailsModal = ({ setShowModal, pokemon, favorite, refreshFavorites, setRefreshFavorites }) => {
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleFavorites = async (e) => {
        e.preventDefault();
        let method = 'POST';

        if (currentUser) {
            if (favorite) {
                method = 'DELETE';
            }

            try {
                const response = await fetch(`http://localhost:4000/api/users/${currentUser._id}/favorites/${pokemon.id}`, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    setShowModal(false);
                    setRefreshFavorites(!refreshFavorites);
                }

            } catch (error) {
                console.log(error);
            }
        }
        else {
            history.push("/login");
        }
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {pokemon.name.toUpperCase()}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                <img src={pokemon.sprite} alt="pokemon sprite" className="h-full w-full object-cover object-center" />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleFavorites}
                            >
                                {!favorite ? 'Save to Favorites' : 'Remove from Favorites'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default PokemonDetailsModal