import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            setCurrentUser({ token });
        }
    }, []);

    const login = (data) => {
        localStorage.setItem('userToken', data.token);
        setCurrentUser(data);
    }

    const logout = () => {
        localStorage.removeItem('userToken');
        setCurrentUser(null);
    }


    const value = {
        login,
        logout,
        currentUser
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
export default AuthContext;