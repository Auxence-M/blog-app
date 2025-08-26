import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export const ThemeToggle = styled(Box)({
    position: "fixed",
    top: "1rem",
    right: "2.5rem",
});

export const SignInContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
});

export const BackHomeButton = styled(Button)({
    textTransform: "none",
    paddingLeft: "0",
});