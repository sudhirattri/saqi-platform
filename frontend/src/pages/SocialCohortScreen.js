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

export default function SocialCohortScreen(props) {
    const navigate = useNavigate();
    function goToNextPage(social){
        props.setSocialCohort(social)
        navigate('/prompt', {replace: true});
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
                            <Typography sx={{padding:2}} fontWeight={5} variant="h4" color="inherit" noWrap>{getTranslated(props.userLanguage,'AskCohort')}</Typography>
                        </Box>
                        <Box sx={{ flexGrow:3, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                                <Button onClick={() => goToNextPage('Academy')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Academy')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('MotherOfYoungKid')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'MotherOfYoungKid')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Shopkeeper')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Shopkeeper')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('SocialWorker')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'SocialWorker')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Student')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Student')}</Typography>
                                </Button>

                                <Button onClick={() => goToNextPage('Teacher')} sx={{boxShadow: 5}} size="medium" variant="text" style={{"margin":"20px","height":"4rem","minWidth":"50vw"}}>
                                    <Typography variant="h6">{getTranslated(props.userLanguage,'Teacher')}</Typography>
                                </Button>

                        </Box>
                    </Box>
                </div>
                )}
            </Transition>
        </React.Fragment>
    );
}