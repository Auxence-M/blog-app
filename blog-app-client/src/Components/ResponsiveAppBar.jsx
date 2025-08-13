import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {styled} from "@mui/material/styles";
import {useState} from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {useAuthentication} from "../../AuthenticationContext.jsx";
import ColorThemeButton from "./ColorThemeButton.jsx";
import Stack from '@mui/material/Stack';
import LogoIcon from "./LogoIcon.jsx";

const StyledAppBar = styled(AppBar)({
    position: "fixed",
    boxShadow: 0,
    backgroundColor: "transparent",
    border: "none",
    backgroundImage: "none",
    marginTop: "calc(var(--template-frame-height, 0px) + 28px)",
});

const StyledToolBar = styled(Toolbar)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    backdropFilter: "blur(20px)",
    border: "1px solid",
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    borderColor: (theme.vars || theme).palette.divider,
    boxShadow: (theme.vars || theme).shadows[1],
    padding: "8px 15px",
}));

export default function ResponsiveAppBar() {
    const [open, setOpen] = useState(false);

    const {setUser, isLoggedIn, setIsLoggedIn} = useAuthentication();

    function toggleDrawer(state) {
        setOpen(state);
    }

    function handleSignOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
        setUser(null);
        setIsLoggedIn(false);
    }

    return (
        <StyledAppBar elevation={0}>
            <Container maxWidth="lg">
                <StyledToolBar variant="dense" disableGutters>
                    <Box display="flex" flexGrow={1} alignItems="center" paddingX={0}>
                        <LogoIcon></LogoIcon>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Button variant="text" color="info">
                                My posts
                            </Button>
                            <Button variant="text" color="info">
                                Create a post
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, gap: 2, alignItems: "center"}}>
                        <Box display={isLoggedIn ? "block" : "none"}>
                            <Button color="primary" variant="contained" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </Box>
                        <Stack direction="row" spacing={2} display={!isLoggedIn ? "block" : "none"}>
                            <Button color="primary" variant="contained" component={ReactRouterLink} to="/sign-up">
                                Sign Up
                            </Button>
                            <Button color="primary" variant="outlined" component={ReactRouterLink} to="/sign-in">
                                Sign In
                            </Button>
                        </Stack>
                        <ColorThemeButton></ColorThemeButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <ColorThemeButton></ColorThemeButton>
                        <IconButton color="primary" sx={{border: "1px solid", borderRadius: "0.5rem"}} onClick={() => {toggleDrawer(true)}}>
                            <MenuIcon></MenuIcon>
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={() => {toggleDrawer(false)}}>
                            <Box sx={{padding: 2, backgroundColor: 'background.default'}}>
                                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton onClick={() => {toggleDrawer(false)}}>
                                        <CloseRoundedIcon></CloseRoundedIcon>
                                    </IconButton>
                                </Box>
                                <Box>
                                    <MenuItem>My posts</MenuItem>
                                    <MenuItem>Create a post</MenuItem>
                                </Box>
                                <Divider sx={{marginY: 2}}></Divider>
                                <Box display={isLoggedIn ? "block" : "none"}>
                                    <MenuItem>
                                        <Button color="primary" variant="contained" onClick={handleSignOut} fullWidth>
                                            Sign Out
                                        </Button>
                                    </MenuItem>
                                </Box>
                                <Box display={!isLoggedIn ? "block" : "none"}>
                                    <MenuItem>
                                        <Button color="primary" variant="contained" component={ReactRouterLink} fullWidth to="/sign-up" >
                                            Sign Up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button color="primary" variant="outlined" component={ReactRouterLink} fullWidth to="/sign-in" >
                                            Sign In
                                        </Button>
                                    </MenuItem>
                                </Box>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolBar>
            </Container>
        </StyledAppBar>
    );
}