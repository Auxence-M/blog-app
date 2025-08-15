import {useAuthentication} from "../../AuthenticationContext.jsx";
import {Navigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";

export default function PrivateRoutes({children}) {
    const {isLoggedIn, loading} = useAuthentication();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (loading === false) {
            setIsLoading(false);
        }
    }, [loading]);

    if (isLoading) {
        return <Box>Loading...</Box>
    }

    if (!isLoggedIn) {
        return <Navigate to="/sign-in" replace/>;
    }

    return children;
}