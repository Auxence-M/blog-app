import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAuthentication} from "../../AuthenticationContext.jsx";
import {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import BackToTopButton from "./BackToTopButton.jsx";
import ListBlogs from "./ListBlogs.jsx";


export default function HomePage() {
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuthentication();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Using userID as token
        const userID = localStorage.getItem("userID");

        // Keeps the user signed in in case of page refresh
        if (userID) {
            const username  = localStorage.getItem("username")
            setUser({username: username, userID: userID});
            setIsLoggedIn(true);
        }

        // Arrow function to fetch selectedPosts from api
        const fetchPosts = async () => {
            const response = await fetch("/api/posts", {signal: signal});

            if (response.ok) {
                const data = await response.json();
                const posts = data.posts;
                setAllPosts(posts)

                setIsLoading(false);
            } else {
                const error = await response.json();
                const message = response.status + " : " + error.error;
                setError(message);
                setIsLoading(false);
            }
        }

        setTimeout(() => {
            // Fetch posts from api
            fetchPosts().catch((error) => {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted successfully");
                } else {
                    setError("500: An Unexpected error occurred while fetching the posts. Please try again later.");
                    setIsLoading(false);
                }
            })
        }, 800); // one-second delay to simulate a loading page

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <Box display="flex" flexDirection="column"  justifyContent="center">
            <BackToTopButton></BackToTopButton>
            <Box marginBottom={2}>
                {isLoggedIn ? (
                    <Typography variant="h5" gutterBottom>
                        Welcome {user.username} !
                    </Typography>
                ) : (
                    <Typography variant="h5" gutterBottom>
                        Welcome ...
                    </Typography>
                )}
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={3} height="100%">
                {
                    error !== "" && <Alert severity="error" variant="filled">{error}</Alert>
                }

                {
                    isLoading && <LinearProgress sx={{height: 5, borderRadius: 8}} color="secondary"/>
                }

                {
                    allPosts.length > 0 &&
                    <ListBlogs blogPosts={allPosts}></ListBlogs>
                }
            </Box>
        </Box>
    )
}