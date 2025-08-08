import {useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@mui/material/Link";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

export default function ListBlogs ({blogPosts}) {
    const [selectedPosts, setSelectedPosts] = useState(blogPosts || []);
    const [isLoading, setIsLoading] = useState(true);
    const allPosts = blogPosts || [];

    const categories = ["All categories", "Company", "Design", "Engineering", "Product"];
    const [filter, setFilter] = useState("All categories");

    const [searchParams, setSearchParams] = useSearchParams();
    const postCategory = searchParams.get("category");
    const location = useLocation();
    const navigate = useNavigate();

    const hasPosts = selectedPosts.length > 0

    function handlePostFilter(category) {
        if (category === filter) return ; // No need to re-filter or navigate if the category is the same
        setFilter(category);
        if (category !== "All categories") {
            setSelectedPosts(allPosts.filter((post) => post.category === category));
            navigate({pathname: location.pathname, search: `category=${category}`});
        } else {
            setSelectedPosts(allPosts);
            navigate("/");
        }
    }

    useEffect(() => {
        setIsLoading(true);

        // Filter selectedPosts on refresh when category is provided in route query parameters
        if (postCategory) {
            setFilter(postCategory);
            setSelectedPosts(blogPosts.filter((post) => post.category === postCategory))
        } else {
            setSelectedPosts(blogPosts);
        }

        setIsLoading(false);
    }, [blogPosts, postCategory]);

    return (
        <Box>
            {isLoading ? (
                <Box>

                </Box>
            ) : (
                <Box display="flex" flexDirection="column" justifyContent="space-between" gap={3} height="100%">
                    {
                        hasPosts > 0 &&
                        <Typography component="h2" variant="h6">
                            Posts{" "}
                            {
                                filter !== "All categories" &&
                                <span>
                                            categorized as {" "}
                                    <Typography component="span" variant="inherit" color="primary" noWrap>{`"${filter}"`}</Typography>
                                        </span>
                            }
                        </Typography>
                    }

                    {
                        hasPosts > 0 &&
                        <Stack paddingBottom={1} overflow="auto" direction="row" spacing={2}>
                            {
                                categories.map((category) => (
                                    <Chip key={category}
                                          label={category}
                                          variant={filter === category ? "filled" : "outlined"}
                                          color={filter === category ? "secondary" : "default"}
                                          onClick={() => handlePostFilter(category)}
                                    ></Chip>
                                ))
                            }
                        </Stack>
                    }

                    {
                        hasPosts > 0 &&
                        <Stack spacing={5}>
                            {
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
                        </Stack>
                    }
                </Box>
            )}
        </Box>
    );
}