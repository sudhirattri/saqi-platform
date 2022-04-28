import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import getTranslated from '../constants';

import { Transition } from 'react-transition-group';
const duration = 300;

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

export default function LanguageScreen(props) {
    const navigate = useNavigate();
    function goToNextPage(language){
        props.cancel_speech()
        props.add_line_to_queue(getTranslated(language,'lang'),language)
        props.setUserLanguage(language)
        navigate('/spatial', {replace: true});
    }

    const [inProp, setInProp] = useState(false);

    useEffect(()=>{
        setInProp(true)
        props.add_line_to_queue(getTranslated('eng','ChooseLanguage'),'eng')
        props.add_line_to_queue(getTranslated('hin','ChooseLanguage'),'hin')
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
                        <Box sx={{  flexGrow:2,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                            <Typography variant="h4" color="inherit" noWrap>
                                <Link to={'/'}><b style={{color:"black"}}>SAQI</b></Link>
                            </Typography>
                            <Typography sx={{padding:2}} fontWeight={600} variant="h4" color="inherit" noWrap>Choose Language<br/>भाषा चुनें</Typography>
                        </Box>
                        <Box sx={{ flexGrow:3, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                            <Button onClick={() => goToNextPage('eng')}  size="medium" variant="text" className='button-choice'>
                                <Typography variant="button" fontSize={18}>English</Typography>
                            </Button>

                            <Button onClick={() => goToNextPage('hin')}  size="medium" variant="text" className='button-choice'>
                                <Typography variant="button" fontSize={22}>हिन्दी</Typography>
                            </Button>
                        </Box>
                    </Box>
                </div>
                )}
            </Transition>
        </React.Fragment>
    );
}