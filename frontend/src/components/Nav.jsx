import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"

const Nav = () => {

    const { currentUser, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 mb-5">
            <ul className="flex justify-between">
                <li>
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                </li>
                {currentUser ? (
                    <>
                        <li>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login" className="hover:text-gray-400">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Nav