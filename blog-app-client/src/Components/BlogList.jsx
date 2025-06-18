import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useAuthentication} from "../../AuthenticationContext.jsx";
import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Alert from '@mui/material/Alert';
import {LinearProgress} from "@mui/material";

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});


export default function BlogList() {
    const [posts, setPosts] = useState([]);
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

        const fetchPosts = async () => {
            const response = await fetch("/api/posts", {signal: signal});

            if (response.ok) {
                const data = await response.json();
                setPosts(data.posts)
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
        }, 1000) // one-second delay to simulate a loading page

        return () => {
            abortController.abort();
        }
    }, []);


    return (
        <Box display="flex" flexDirection="column"  justifyContent="center">
            <Box sx={{marginBottom: 2}}>
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
            <Typography variant="h5" gutterBottom>
                Posts
            </Typography>
            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={5} height="100%" marginTop={2}>
                {
                    error !== "" && <Alert severity="error" variant="filled">{error}</Alert>
                }

                {
                    isLoading && <LinearProgress color="secondary"/>
                }

                {
                    posts.length > 0 &&
                    posts.map((post) => (
                        <Box key={post.ID}>
                            <Typography gutterBottom variant="caption" component="div">
                                {post.category}
                            </Typography>
                            <Typography gutterBottom  variant="h6">
                                <Link href="#" underline="hover">
                                    {post.title}
                                </Link>
                            </Typography>
                            <StyledTypography variant="body2" color="textSecondary" gutterBottom>
                                {post.content}
                            </StyledTypography>
                            <Box display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography marginTop={0.5} variant="caption">
                                    {new Date(post.CreatedAt).toDateString()}
                                </Typography>
                                <Button sx={{textTransform: "none"}} variant="text" href="#" size="small" endIcon={<NavigateNextIcon />}>
                                    Read more
                                </Button>
                            </Box>
                            <Divider sx={{marginTop: 1.5}}></Divider>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}