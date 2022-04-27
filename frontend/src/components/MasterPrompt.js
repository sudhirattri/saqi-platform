import { Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import getTranslated from '../constants';

export default function MasterPrompt(props) {
    return (
        <React.Fragment>
            <Box sx={{  flexGrow:1,  display: 'flex', justifyContent: 'flexStart', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{padding:2}} fontWeight={10} variant="h4" color="inherit" noWrap>{getTranslated(props.userLanguage,'WhatAQI')}</Typography>
            </Box>
        </React.Fragment>
    )
}