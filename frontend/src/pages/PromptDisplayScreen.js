import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate} from "react-router-dom";

import getTranslated from '../constants';
import MasterPrompt from '../components/MasterPrompt';

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

export default function PromptDisplayScreen(props) {
    const navigate = useNavigate();
    const [inProp, setInProp] = useState(false);

    function goToNextPage(){
        console.log("next button pressed")
        // props.setUserLanguage(language)
        navigate('/prompts/select', {replace: true});
    }

    useEffect(()=>{
        setInProp(true)
        props.cancel_speech()
        console.log("sound prompt")
        props.add_line_to_queue(((props.userLanguage=='hin')?(props.displayPrompt['question_hin']):(props.displayPrompt['question'])),props.userLanguage)
        props.add_line_to_queue(((props.userLanguage=='hin')?(props.displayPrompt['answer_hin']):(props.displayPrompt['answer'])),props.userLanguage)
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
                            <MasterPrompt sx={{flexGrow:4   }} 
                                userLanguage={props.userLanguage} 
                                spatialLocation={props.spatialLocation} 
                                socialCohort={props.socialCohort}
                                add_line_to_queue={props.add_line_to_queue}
                                cancel_speech={props.cancel}
                                title={(props.userLanguage=='hin')?(props.displayPrompt['question_hin']):(props.displayPrompt['question'])}
                                bodyText={(props.userLanguage=='hin')?(props.displayPrompt['answer_hin']):(props.displayPrompt['answer'])}
                            ></MasterPrompt>
                        </Box>
                        <Box sx={{ flexGrow:1, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                            <Button onClick={() => goToNextPage()}  size="small" className='button-choice'>
                                <Typography fontSize={16} fontWeight={600} variant="button">{getTranslated(props.userLanguage,'Next')}</Typography>
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
            </Transition>
        </React.Fragment>
    );
}