import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";

import getTranslated from '../constants';

import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';
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
                    <Link to="/lang">
                        <Box sx={{ display: 'flex', justifyContent: 'center' , flexDirection:'column', width:'1.0', height:'100vh', textAlign:'center'}}>
                            <Typography variant="h4" className='subtitle-text'>Prompts</Typography>
                            <br></br>
                            <Typography variant="h4" className='subtitle-text'>Screen</Typography>
                        </Box>
                    </Link>
                </div>
            )}
            </Transition>
        </React.Fragment>

    );
}