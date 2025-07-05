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
import LinearProgress from '@mui/material/LinearProgress';
import {useNavigate, useSearchParams} from "react-router-dom";
import BackToTopButton from "./BackToTopButton.jsx";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const categories = ["All categories", "Company", "Design", "Engineering", "Product"]


export default function BlogList() {
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");



    const [filter, setFilter] = useState("All categories");
    const [searchParams, setSearchParams] = useSearchParams();
    const postCategory = searchParams.get("category");


    const {user, setUser, isLoggedIn, setIsLoggedIn} = useAuthentication();

    const navigate = useNavigate();

    function handlePostFilter(category) {
        setFilter(category);
        if (category !== "All categories") {
            setSelectedPosts(allPosts.filter((post) => post.category === category))
            navigate({pathname: "/", search: `category=${category}`});
        } else {
            setSelectedPosts(allPosts);
            navigate("/");
        }
    }

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
                setSelectedPosts(posts)
                setAllPosts(posts)

                // Filter selectedPosts on refresh when category is provided in route
                if (postCategory) {
                    setFilter(postCategory);
                    setSelectedPosts(posts.filter((post) => post.category === postCategory))
                }

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
        }, 1000); // one-second delay to simulate a loading page

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
            <Typography component="h2" variant="h6" gutterBottom>
                Posts{" "}
                {
                    filter !== "All categories" &&
                    <span>
                        categorized as {" "}
                        <Typography component="span" variant="inherit" color="primary" noWrap>{`"${filter}"`}</Typography>
                    </span>
                }
            </Typography>
            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={5} height="100%" marginTop={2}>
                {
                    error !== "" && <Alert severity="error" variant="filled">{error}</Alert>
                }

                {
                    isLoading && <LinearProgress sx={{height: 5, borderRadius: 8}} color="secondary"/>
                }

                {
                    selectedPosts.length > 0 &&
                    <Stack paddingBottom={1} overflow="auto" direction="row" spacing={2}>
                        {
                            categories.map((category) => (
                                <Chip key={category}
                                      label={category}
                                      variant={filter === category ? "filled" : "outlined"}
                                      color={filter === category ? "primary" : "default"}
                                      onClick={() => handlePostFilter(category)}
                                ></Chip>
                            ))
                        }
                    </Stack>
                }

                {
                    selectedPosts.length > 0 &&
                    selectedPosts.map((post) => (
                        <Box key={post.ID}>
                            <Typography gutterBottom variant="caption" component="div">
                                {post.category}
                            </Typography>
                            <Typography gutterBottom  variant="h6">
                                <Link href={`/blogs/${post.ID}`} underline="hover">
                                    {post.title}
                                </Link>
                            </Typography>
                            <StyledTypography variant="body2" color="textSecondary" gutterBottom>
                                {post.content}
                            </StyledTypography>
                            <Box marginTop={1.5} display="flex" flexDirection="row" justifyContent="space-between">
                                <Typography marginTop={0.5} variant="caption">
                                    {new Date(post.CreatedAt).toDateString()}
                                </Typography>
                                <Button component={Link} sx={{textTransform: "none"}} variant="text" href={`/blogs/${post.ID}`} size="small" endIcon={<NavigateNextIcon />}>
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