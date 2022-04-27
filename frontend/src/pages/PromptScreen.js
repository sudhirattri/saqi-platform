import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

import getTranslated from '../constants';
import MasterPrompt from './../components/MasterPrompt';

import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';
import { Button } from '@mui/material';
const duration = 300;


// import saqi_logo from './../../public/saqi.png';

const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }
  
const transitionStyles = {
entering: { opacity: 1 ,transform: "scale(1.0)"},
entered:  { opacity: 1 ,transform: "scale(1.0)"},
exiting:  { opacity: 0 ,transform: "scale(0.7)"},
exited:  { opacity: 0 ,transform: "scale(0.7)"},
};

export default function PromptScreen(props) {
    const [inProp, setInProp] = useState(false);

    function goToNextPage(){
        console.log("next button pressed")
        // props.setUserLanguage(language)
        // navigate('/spatial', {replace: true});
    }

    useEffect(()=>{
        setInProp(true)
      },[])

    return (
        <React.Fragment>
            <Transition in={inProp} timeout={duration}>
                {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>                
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' , flexDirection:'column', width:'1.0', height:'100vh'}}>
                        <Box sx={{  flexGrow:1,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                            <Typography variant="h4" color="inherit" noWrap>
                            <Link to={'/'}><b style={{color:"black"}}>SAQI</b></Link>
                            </Typography>
                        </Box>
                        <Box sx={{  flexGrow:5,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                            <MasterPrompt sx={{flexGrow:4   }} title="title"></MasterPrompt>
                        </Box>
                        <Box sx={{ flexGrow:1, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                            <Button onClick={() => goToNextPage()}  size="small" variant="outlined" style={{"margin":"10px","height":"3rem","minWidth":"50vw"}}>
                                <Typography variant="h6">{getTranslated(props.userLanguage,'Next')}</Typography>
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
            </Transition>
        </React.Fragment>
    );
}