import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';
import {useState} from "react";

const StyledFab = styled(Fab)({
    position: "fixed",
    bottom: 20,
    right: 20,
});

export default function BackToTopButton() {
    const[visible, setVisible] = useState(false);

    function hideButton() {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    window.addEventListener("scroll", hideButton);

    return (
        <Box hidden={!visible}>
            <StyledFab component="button" color="primary" size="small" onClick={scrollToTop}>
                <KeyboardArrowUpIcon />
            </StyledFab>
        </Box>
    );
}

