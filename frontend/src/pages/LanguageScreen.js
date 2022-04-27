import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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
        props.setUserLanguage(language)
        navigate('/spatial', {replace: true});
    }

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
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' , flexDirection:'column', width:'1.0', height:'100vh'}}>
                        <Box sx={{  flexGrow:2,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                            <Typography variant="h4" color="inherit" noWrap>
                                <Link to={'/'}><b style={{color:"black"}}>SAQI</b></Link>
                            </Typography>
                            <Typography sx={{padding:2}} fontWeight={5} variant="h4" color="inherit" noWrap>Choose Language <br/> भाषा चुनें</Typography>
                        </Box>
                        <Box sx={{ flexGrow:3, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                            <Button onClick={() => goToNextPage('eng')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                <Typography variant="h6">English</Typography>
                            </Button>

                            <Button onClick={() => goToNextPage('hin')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                <Typography variant="h5">हिन्दी</Typography>
                            </Button>
                        </Box>
                    </Box>
                </div>
                )}
            </Transition>
        </React.Fragment>
    );
}