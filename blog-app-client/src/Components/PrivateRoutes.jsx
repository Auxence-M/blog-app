import {useAuthentication} from "../../AuthenticationContext.jsx";
import {Navigate, useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";

export default function PrivateRoutes({children}) {
    const {isLoggedIn, loading} = useAuthentication();
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const pathname = location.pathname;

    function getFeedbackMessage(path) {
        if (path.startsWith("/create")) {
            return ("Please sign-in to create a blog post");
        } else if (path.startsWith("/your-posts")) {
            return ("Please sign in to view your blogs posts");
        }
    }

    useEffect(() => {
        if (loading === false) {
            setIsLoading(false);
        }
    }, [loading]);

    if (isLoading) {
        return <Box>Loading...</Box>
    }

    if (!isLoggedIn) {
        return <Navigate to="/sign-in" state={{feedback: getFeedbackMessage(pathname)}} replace/>;
    }

    return children;
}