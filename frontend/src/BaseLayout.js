import React from 'react';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, createContext } from "react";

export default function BaseLayout(props) {
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center' , flexDirection:'column', width:'1.0', height:'100vh'}}>
                <Link to="/lang" style={{alignSelf:"center"}}>
                    <Button sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                        <Typography variant="h5">Lang</Typography>
                    </Button>
                </Link>
                <br></br>
                <Link to="/splash" style={{alignSelf:"center"}}>
                    <Button sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                        <Typography variant="h5">splash</Typography>
                    </Button>
                </Link>
            </Box>
        </React.Fragment>
    );
}