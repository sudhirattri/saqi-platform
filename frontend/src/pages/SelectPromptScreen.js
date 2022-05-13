import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link , useNavigate} from "react-router-dom";

import getTranslated from '../constants';
import MasterPrompt from '../components/MasterPrompt';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';
import Zoom from '@mui/material/Zoom';
import { Button } from '@mui/material';
import {data} from '../data/prompts';
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

export default function SelectPromptScreen(props) {
    const navigate = useNavigate();
    const [inProp, setInProp] = useState(false);
    const [zoomIn, setZoomIn] = React.useState(false);
    
    function goToNextPage(selected){
        props.register_choice(selected)
        console.log("next selected:", selected)
        if(selected['type']==='AQIFaqs'){
            navigate('/prompts/show', {replace: true});
        }
        else if(selected['type']==='AQINearMe'){
            navigate('/prompts/aqiViewer', {replace: true});
        }
        else if(selected['type']==='recommendation'){
            navigate('/prompts/recommendation', {replace: true});
        }
        else{
            navigate('/prompts/show', {replace: true});
        }
    }

    useEffect(()=>{
        props.cancel_speech()
        props.add_line_to_queue(getTranslated(props.userLanguage,'nextPromptTitle'),props.userLanguage)
        setInProp(true)
        setZoomIn(true)
        console.log("props",props)
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
                            <br/>
                            <Typography fontSize={25}>{getTranslated(props.userLanguage,'nextPromptTitle')}</Typography>
                        </Box>
                        <Box sx={{ flexGrow:4, display: 'flex', justifyContent: 'space-around',flexDirection:'column', alignItems: 'center' }}>

                        {props.currentPrompts.map((item,index) => {
                            let currentPrompt = {}
                            if(item['type']==='AQIFaqs'){
                                currentPrompt = data[item['type']][item['name']];
                            }
                            else if(item['type']==='AQINearMe'){
                                currentPrompt = data['AQINearMe'];
                            }
                            else if(item['type']==='recommendation'){
                                currentPrompt = data['recommendation'];
                            }
                            return (
                            <React.Fragment key={index}>
                                <Zoom in={zoomIn} style={{ transitionDelay: Math.min(5000,(index*500)).toString()+'ms' }}>
                                    <Box display="flex" flexDirection="row" justifyContent="space-around"
                                        style={{ margin:"0px",padding:"0",width:"100%",backgroundColor:"transparent"}}
                                    >
                                        {/* <Typography xs={2} gutterBottom variant="h5" component="h2" marginTop={2}>
                                        {index+1}
                                        </Typography>
                                        <Card style={{"width":"90%", "margin-bottom":"10px"}}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="h2">
                                                {(props.userLanguage=='hin')?(currentPrompt['question_hin']):(currentPrompt['question'])}
                                            </Typography>
                                        </CardContent>
                                        </Card> */}
                                        <Button onClick={() => goToNextPage(currentPrompt)}  size="small" variant="outlined" className='button-prompt'>
                                            <Typography fontSize={20}>{(props.userLanguage==='hin')?(currentPrompt['question_hin']):(currentPrompt['question'])}</Typography>
                                        </Button>
                                    </Box>
                                </Zoom>
                                {/* <Divider variant="inset" component="li"/> */}
                            </React.Fragment>
                            );
                        })}
                            {/* <Button onClick={() => goToNextPage()}  size="small" variant="outlined" className='button-prompt'>
                                <Typography fontSize={20}>{getTranslated(props.userLanguage,'prompt1')}</Typography>
                            </Button>
                            <Button onClick={() => goToNextPage()}  size="small" variant="outlined" className='button-prompt'>
                                <Typography fontSize={20}>{getTranslated(props.userLanguage,'prompt2')}</Typography>
                            </Button>
                            <Button onClick={() => goToNextPage()}  size="small" variant="outlined" className='button-prompt'>
                                <Typography fontSize={20}>{getTranslated(props.userLanguage,'prompt3')}</Typography>
                            </Button> */}
                        </Box>
                    </Box>
                </div>
            )}
            </Transition>
        </React.Fragment>
    );
}