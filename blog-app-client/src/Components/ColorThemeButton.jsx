import {styled, useColorScheme} from '@mui/material/styles';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Tooltip from '@mui/material/Tooltip';

const StyledIconButton = styled(IconButton)(({theme}) => ({
    color: theme.palette.primary.main,
}));

export default function ColorThemeButton() {
    const {mode, setMode} = useColorScheme();
    if (!mode) {
        return null;
    }

    function handleClick() {
       setMode(mode === "light" ? "dark" : "light");
    }

    return (
        <Box>
            <Tooltip title={mode === "light" ? "Turn off the light" : "Turn on the light"} arrow>
                <StyledIconButton onClick={handleClick} size="small" sx={{border: "1px solid", borderRadius: "0.5rem"}}>
                    {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon/>}
                </StyledIconButton>
            </Tooltip>
        </Box>
    );
}