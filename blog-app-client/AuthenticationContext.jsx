import {createContext, useContext, useEffect, useState} from "react";


const AuthenticationContext = createContext(null);

export default function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const authenticationValue = {user, setUser, isLoggedIn, setIsLoggedIn, loading};

    useEffect(() => {
        // Using userID as token
        const userID = localStorage.getItem("userID");
        const username  = localStorage.getItem("username")

        // Keeps the user signed-in in case of page refresh
        if (userID && username) {
            setUser({username: username, userID: userID});
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        setLoading(false);
    },[]);

    return (
        <AuthenticationContext.Provider value={authenticationValue}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    return useContext(AuthenticationContext);
}