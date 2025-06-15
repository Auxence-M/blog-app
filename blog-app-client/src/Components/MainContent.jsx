import Link from "@mui/material/Link";
import Box from '@mui/material/Box';
import {useAuthentication} from "../../AuthenticationContext.jsx";
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import {useEffect} from "react";

export default function MainContent() {

    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuthentication();

    useEffect(() => {
        // Using userID as token
        const userID = localStorage.getItem("userID");

        // Keeps the user signed in in case of page refresh
        if (userID) {
            setIsLoggedIn(true);
            const username  = localStorage.getItem("username")
            setUser({username: username, userID: userID});
        }
    }, []);

    return (
        <Box>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                {isLoggedIn ? (
                    <div>
                        Welcome {user.username} !
                    </div>
                ) : (
                    <div>
                        You are Signed out. Please {" "}
                        <Link href="/SignIn">
                            Sign In
                        </Link>
                    </div>
                )}
            </Box>
        </Box>
    )
}