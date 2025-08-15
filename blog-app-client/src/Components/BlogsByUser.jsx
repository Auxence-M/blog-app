import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import BackToTopButton from "./BackToTopButton.jsx";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import ListBlogs from "./ListBlogs.jsx";
import {Link as ReactRouterLink} from "react-router-dom";
import Link from "@mui/material/Link";

export default function BlogsByUser() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const params = useParams();
    const userID = parseInt(params.id);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Arrow function to fetch selectedPosts from api
        const fetchPosts = async () => {
            const response = await fetch("/api/posts", {signal: signal});

            if (response.ok) {
                const data = await response.json();
                const posts = data.posts;
                setBlogs(posts.filter((blog) => blog.authorId === userID));

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
        }, 800); // delay to simulate data being fetched

        // Clean-up
        return () => {
            abortController.abort();
        }
    }, []);

    return(
        <Box display="flex" flexDirection="column" justifyContent="center">
            <BackToTopButton></BackToTopButton>
            <Box marginBottom={2}>
                <Typography variant="h6" gutterBottom>
                    Here are all of your posts
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={3} height="100%">
                {
                    error !== "" &&
                    <Alert severity="error" variant="filled">{error}</Alert>
                }

                {
                    isLoading &&
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Loading posts ...
                        </Typography>
                        <LinearProgress sx={{height: 5, borderRadius: 8}} color="secondary"/>
                    </Box>
                }

                {
                    blogs.length > 0 &&
                    <ListBlogs blogPosts={blogs}></ListBlogs>

                }

                {
                    (blogs.length === 0 && !isLoading) &&
                    <Typography gutterBottom>
                        You haven't written anything yet.{" "}
                        <Link component={ReactRouterLink} to="/sign-up" sx={{ alignSelf: "center" }}>
                            Start writing now !
                        </Link>
                    </Typography>
                }
            </Box>
        </Box>
    );
}