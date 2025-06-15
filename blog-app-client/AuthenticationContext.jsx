import {createContext, useContext, useState} from "react";


const AuthenticationContext = createContext(null);

export default function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authenticationValue = {user, setUser, isLoggedIn, setIsLoggedIn};

    return (
        <AuthenticationContext.Provider value={authenticationValue}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}