import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function LanguageScreen(props) {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' , flexDirection:'column', width:'1.0', height:'1.0'}}>
                <Box sx={{ flexGrow:1,  display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
                    <Typography fontFamily={"BlinkMacSystemFont"} variant="h4" color="inherit" noWrap>
                        SAQI
                    </Typography>
                    <Typography fontFamily={"BlinkMacSystemFont"} variant="h5" color="inherit" noWrap>Choose Language</Typography>
                </Box>
                <Box sx={{ flexGrow:2, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                    <Button sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                        Hindi
                    </Button>
                    <Button sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                        English
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}