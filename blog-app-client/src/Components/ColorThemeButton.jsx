import {styled, useColorScheme} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import ContrastIcon from '@mui/icons-material/Contrast';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {useState} from "react";
import Box from "@mui/material/Box";

const StyledIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.primary.main,
}));

export default function ColorThemeButton() {
    const[anchorElement, setAnchorElement] = useState();

    const {mode, setMode} = useColorScheme();
    if (!mode) {
        return null;
    }

    function handleClose() {
        setAnchorElement(null);
    }

    function handleClick(event) {
        setAnchorElement(event.currentTarget);
    }

    function handleModeChange(targetMode) {
        if (targetMode === "system") {
            setMode("system");
        } else if (targetMode === "light") {
            setMode("light");
        } else if (targetMode === "dark") {
            setMode("dark");
        }
        setAnchorElement(null);
    }

    return (
        <Box>
            <StyledIconButton onClick={handleClick} size="medium" sx={{border: "1px solid", borderRadius: "0.5rem"}}>
                {mode === "system" && <ContrastIcon />}
                {mode === "light" && <LightModeOutlinedIcon />}
                {mode === "dark" && <DarkModeOutlinedIcon />}
            </StyledIconButton>

            <Menu anchorEl={anchorElement} open={Boolean(anchorElement)} onClose={handleClose}>
                <MenuItem sx={{paddingY: 1.5, borderRadius: "0.5rem"}}
                          selected={mode === "system" }
                          onClick={() => handleModeChange("system")}>
                    <ContrastIcon sx={{marginRight: 1}}/>
                    System
                </MenuItem>
                <MenuItem sx={{paddingY: 1.5, borderRadius: "0.5rem"}}
                          selected={mode === "light"}
                          onClick={() => handleModeChange("light")}>
                    <LightModeOutlinedIcon sx={{marginRight: 1}} />
                    Light
                </MenuItem>
                <MenuItem sx={{paddingY: 1.5, borderRadius: "0.5rem"}}
                          selected={mode === "dark"}
                          onClick={() => handleModeChange("dark")}>
                    <DarkModeOutlinedIcon sx={{marginRight: 1}}/>
                    Dark
                </MenuItem>
            </Menu>
        </Box>
    );
}