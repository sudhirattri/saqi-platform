import { Button, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getTranslated from '../constants';

export default function MasterPrompt(props) {
    useEffect(()=>{
        props.add_line_to_queue(getTranslated(props.userLanguage,props.title),props.userLanguage)
    },[])

    return (
        <React.Fragment>
            <Box sx={{  flexGrow:1,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{padding:2}} fontWeight={600} variant="h5" color="inherit" noWrap><b>{props.title}</b></Typography>
            </Box>
            <Box sx={{ maxWidth:"50vh", flexGrow:4,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{padding:2}} fontWeight={600} fontSize={18}  color="inherit">{props.bodyText}</Typography>
            </Box>
        </React.Fragment>
    )
}