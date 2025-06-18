import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import ColorThemeButton from "./ColorThemeButton.jsx";
import {useAuthentication} from "../../AuthenticationContext.jsx";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LogoIcon from "./LogoIcon.jsx";

const SelectTheme = styled("div")({
    position: "fixed",
    top: "1rem",
    right: "2.5rem",
});

const SignInContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
})

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [signInError, setSignInError] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState("");

    const {setUser, setIsLoggedIn} = useAuthentication();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (usernameError || passwordError) {
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("username", username);
                localStorage.setItem("userID", data.userID);

                setUser({username: username, userID: data.userID});
                setIsLoggedIn(true);

                setSignInErrorMessage("")
                setSignInError(false);

                navigate("/")
            } else {
                const error = await response.json();
                const message = response.status + " : " + error.error;

                setSignInErrorMessage(message);
                setSignInError(true);
            }
        } catch (error) {
            setSignInErrorMessage("500 : Internal Server Error. Server not connected");
            setSignInError(true);
        }
    }

    function validateInputs() {
        let isValid = true;

        if (username === "") {
            setUsernameError(true);
            setUsernameErrorMessage("Username name cannot be empty");
            isValid = false;
        } else if (username.length < 6) {
            setUsernameError(true);
            setUsernameErrorMessage("Username must be at least 6 characters long");
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage("")
        }

        if (password === "") {
            setPasswordError(true);
            setPasswordErrorMessage("Password name cannot be empty");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage("Password must be at least 6 characters long");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("")
        }

        return isValid;
    }

    function handleAlertClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setSignInError(false);
    }

    return (
        <SignInContainer>
            <SelectTheme>
                <ColorThemeButton/>
            </SelectTheme>
            <Card sx={{margin: 'auto', padding: 2, width: "25rem", boxShadow: 3}}>
                <CardContent component="form"
                             onSubmit={handleSubmit}
                             noValidate
                             sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
                    <LogoIcon></LogoIcon>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <FormControl>
                        <FormLabel sx={{marginBottom: 1}} htmlFor="username">Username</FormLabel>
                        <TextField id="username"
                                   type="text"
                                   name="username"
                                   placeholder="username"
                                   variant="outlined"
                                   autoFocus
                                   required
                                   fullWidth
                                   value={username}
                                   error={usernameError}
                                   helperText={usernameErrorMessage}
                                   color={usernameError ? "error" : "primary"}
                                   onChange={event => {setUsername(event.target.value)}} />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{marginBottom: 1}} htmlFor="password">Password</FormLabel>
                        <TextField id="password"
                                   type={showPassword ? "text" : "password"}
                                   name="password"
                                   placeholder="•••••••••"
                                   variant="outlined"
                                   autoFocus
                                   required
                                   fullWidth
                                   value={password}
                                   error={passwordError}
                                   helperText={passwordErrorMessage}
                                   color={passwordError ? "error" : "primary"}
                                   onChange={event => {setPassword(event.target.value)}} />
                    </FormControl>
                    <FormControlLabel
                        onChange={() => setShowPassword(!showPassword)}
                        control={<Checkbox/>}
                        label="Show password"
                    />
                    <Button sx={{marginTop: 2, padding: 1.2}} variant="contained"
                            type="submit"
                            fullWidth
                            onClick={validateInputs}>
                        Sign In
                    </Button>
                    <Divider>or</Divider>
                    <Typography sx={{ textAlign: "center" }}>
                        Don't have an account ?{" "}
                        <Link href="/SignUp" sx={{ alignSelf: "center" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </CardContent>
            </Card>

            <Snackbar open={signInError} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert severity="error" variant="filled" onClose={handleAlertClose} sx={{width: "100%"}}>
                    {signInErrorMessage}
                </Alert>
            </Snackbar>
        </SignInContainer>
    );
}