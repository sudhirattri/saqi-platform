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
        props.cancel_speech()
        if(props.userLanguage==='hin'){
            props.add_line_to_queue(getTranslated(props.userLanguage,'AcknowledgeLocation')+getTranslated(props.userLanguage,location)+"हैं",props.userLanguage)
        }
        else{
            props.add_line_to_queue(getTranslated(props.userLanguage,'AcknowledgeLocation')+getTranslated(props.userLanguage,location),props.userLanguage)
        }
        props.setSpatialLocation(location)
        navigate('/social', {replace: true});
    }

    const [inProp, setInProp] = useState(false);

    useEffect(()=>{
        setInProp(true)
        props.add_line_to_queue(getTranslated(props.userLanguage,'AskLocation'),props.userLanguage)
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
                            <Typography sx={{padding:2}} fontWeight={600} variant="h4" color="inherit" noWrap>{getTranslated(props.userLanguage,'AskLocation')}</Typography>
                        </Box>
                        <Box sx={{ flexGrow:3, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                                <Button onClick={() => goToNextPage('JarodhaKalan')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'JarodhaKalan')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Najafgarh')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'Najafgarh')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('NangliDairy')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'NangliDairy')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('SanjayColony')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'SanjayColony')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('ShaheenBagh')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'ShaheenBagh')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Tekhand')}  size="medium" variant="text" className='button-choice'>
                                    <Typography variant="button" fontSize={18}>{getTranslated(props.userLanguage,'Tekhand')}</Typography>
                                </Button>

                        </Box>
                    </Box>
                </div>
                )}
            </Transition>
        </React.Fragment>
    );
}