import './App.css'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import AuthenticationProvider from "../AuthenticationContext.jsx";
import AppRoutes from "./Components/AppRoutes.jsx";

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthenticationProvider>
                <CssBaseline />
                <AppRoutes />
            </AuthenticationProvider>
        </ThemeProvider>

    )
}
export default App
