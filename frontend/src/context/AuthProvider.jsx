import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('currentUser'));
        if (localData) {
            setCurrentUser(localData);
        }
    }, []);

    const login = (data) => {
        setCurrentUser(data);
        localStorage.setItem('currentUser', JSON.stringify(data));
    }

    const logout = () => {
        localStorage.removeItem('currentUser');
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