import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';

import getTranslated from '../constants';

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

export default function SpatialLocationScreen(props) {
    const navigate = useNavigate();
    function goToNextPage(location){
        props.setSpatialLocation(location)
        navigate('/social', {replace: true});
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
                            <Typography sx={{padding:2}} fontWeight={5} variant="h4" color="inherit" noWrap>{getTranslated(props.userLanguage,'AskLocation')}</Typography>
                        </Box>
                        <Box sx={{ flexGrow:3, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                                <Button onClick={() => goToNextPage('JarodhaKalan')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'JarodhaKalan')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Najafgarh')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Najafgarh')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('NangliDairy')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'NangliDairy')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('SanjayColony')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'SanjayColony')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('ShaheenBagh')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'ShaheenBagh')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Tekhand')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minwidth":"50vw", "padding":"30px"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Tekhand')}</Typography>
                                </Button>

                        </Box>
                    </Box>
                </div>
                )}
            </Transition>
        </React.Fragment>
    );
}