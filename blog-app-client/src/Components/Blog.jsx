import Box from '@mui/material/Box';
import ResponsiveAppBar from "./ResponsiveAppBar.jsx";
import Container from '@mui/material/Container';
import { Outlet } from "react-router-dom";



export default function Blog() {


    return (
        <Box>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', marginY: 18, gap: 5}}>
                <Outlet />
            </Container>
        </Box>
    )
}