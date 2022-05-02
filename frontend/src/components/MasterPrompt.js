import { Button, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import getTranslated from '../constants';
// import { useSpring, animated } from 'react-spring'
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
import parse from 'html-react-parser';

export default function MasterPrompt(props) {
    
    // const animation = useSpring({
    //     from: { opacity: 0 },
    //     to: { opacity: 1 }
    // });

    useEffect(()=>{
        props.add_line_to_queue(getTranslated(props.userLanguage,props.title),props.userLanguage)
    },[])

    return (
        <React.Fragment>
            <Box sx={{  flexGrow:1,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{padding:2}} fontWeight={600} variant="h5" color="inherit" noWrap><b>{props.title}</b></Typography>
            </Box>
            <Box sx={{ maxWidth:"50vh", flexGrow:4,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                <Slide duration={300} right>    
                    <Typography sx={{padding:2}} fontWeight={600} fontSize={18}  color="inherit">{parse(props.bodyText)}</Typography>
                </Slide >
            </Box>
            
        </React.Fragment>
    )
}