import React, { useEffect, useState } from 'react';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VolumeOffOutlined from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlined from '@mui/icons-material/VolumeUpOutlined';

import Box from '@mui/material/Box';

// import VolumeOffIcon from '@mui/icons-material/VolumeOff';

import ParticlesBg from 'particles-bg'
import { useSpeechSynthesis } from 'react-speech-kit';

import BaseLayout from './BaseLayout';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LanguageScreen from './pages/LanguageScreen';
import SplashScreen from './pages/SplashScreen';
import SpatialLocationScreen from './pages/SpatialLocationScreen';
import SocialCohortScreen from './pages/SocialCohortScreen';
import PromptDisplayScreen from './pages/PromptDisplayScreen';
import SelectPromptScreen from './pages/SelectPromptScreen';
import getTranslated from './constants';
import { Button } from '@mui/material';

const theme = createTheme({
  typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
}); 

function App() {
  const [socialCohort, setSocialCohort] = React.useState(null);
  const [spatialLocation, setSpatialLocation] = React.useState(null);
  const [userLanguage, setUserLanguage] = React.useState('hin');
  const [isMuted, setIsMuted] = React.useState(false);

  // const [speechLines, setSpeechLines] = useState([]);
  let speechLines = []
  const onEnd = () => {
    runSpeech()
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });
  
  
  const eng_voice = {
    default: true,
    lang: "en-AU",
    localService: true,
    name: "Karen",
    voiceURI: "Karen",
  }
   
  function changeLang(newLang){
    console.log("changing lang: ",newLang)
    setUserLanguage(newLang)
  }
  useEffect(()=>{
    let social_cohort = localStorage.getItem('SocialCohort');
    let spatial_location = localStorage.getItem('SpatialLocation');
    setSocialCohort(social_cohort)
    setSpatialLocation(spatial_location)
  },[])

  useEffect(()=>{
    if(voices){
      if(voices.length>0){
        console.log("voices loaded",voices)
        add_line_to_queue(getTranslated(userLanguage,'SplashMessage'),userLanguage)
        // runSpeech() 
      }
    }
  },[voices])

  useEffect(()=>{
    if(isMuted){
      cancel()
    }
  },[isMuted])

  let voiceURIs = (26) ['Microsoft David - English (United States)', 'Microsoft Ravi - English (India)', 'Microsoft Heera - English (India)', 'Microsoft Mark - English (United States)', 'Microsoft Zira - English (United States)', 'Microsoft Hemant - Hindi (India)', 'Microsoft Kalpana - Hindi (India)', 'Google Deutsch', 'Google US English', 'Google UK English Female', 'Google UK English Male', 'Google español', 'Google español de Estados Unidos', 'Google français', 'Google हिन्दी', 'Google Bahasa Indonesia', 'Google italiano', 'Google 日本語', 'Google 한국의', 'Google Nederlands', 'Google polski', 'Google português do Brasil', 'Google русский', 'Google 普通话（中国大陆）', 'Google 粤語（香港）', 'Google 國語（臺灣）']
  async function runSpeech(){
    if(speechLines.length==0)
      return;
    if(isMuted){
      clear_speech_lines()
      return
    }
    let hin_voice = voices.find(o => o.voiceURI === 'Microsoft Kalpana - Hindi (India)');
    let eng_voice = voices.find(o => o.voiceURI === 'Microsoft Ravi - English (India)');
    let cur_voice = (speechLines[0]['lang']=='hin')?(hin_voice):(eng_voice)

    if(!cur_voice){
      return
    }
    else{
      let current_line = speechLines[0]['line'];
      speechLines = speechLines.slice(1)
      console.log("speaking :",current_line," voice: ",cur_voice)
      speak({ text: current_line, voice:cur_voice})
    }
  }

  function add_line_to_queue(line,lang){
    // setSpeechLines(oldArray => [...oldArray, line]);
    speechLines = [...speechLines, {line:line,lang:lang}]
    console.log("added :",speechLines)
    runSpeech()
  }

  function clear_speech_lines(){
    // setSpeechLines([]);
    speechLines = []
  }

  const handleChange = (event) => {
    let newLang = event.target.value
    setUserLanguage(event.target.value);
    add_line_to_queue(getTranslated(newLang,'lang'),newLang)
    let uris = voices.map(function(element){
      return element["voiceURI"];
    });
    console.log(uris)
    runSpeech()
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 0, backgroundColor:"rgba(255,255,255,0.8)" }} style={{"height":"100vh"}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SplashScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="splash" element={<SplashScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="lang" element={<LanguageScreen
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  setUserLanguage={changeLang}
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="spatial" element={<SpatialLocationScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  setSpatialLocation={setSpatialLocation}
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="social" element={<SocialCohortScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort} 
                  setSocialCohort={setSocialCohort}
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="prompt" element={<PromptDisplayScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort} 
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
                <Route path="choose" element={<SelectPromptScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort} 
                  add_line_to_queue={add_line_to_queue}
                  cancel_speech={cancel}
                  />} 
                />
            </Routes>
        </BrowserRouter>
      </Container>
      <ParticlesBg num={10} type="square" bg={true} />
      {!isMuted && (
        <Box onClick={() => setIsMuted(true)} style={{position:'fixed', top:'25px', left:'15px', minWidth:'1rem', maxWidth:'4rem'}}>
        <VolumeUpOutlined sx={{ fontSize: 30 }}></VolumeUpOutlined>
      </Box>
      )}

      {isMuted && (
        <Box onClick={() => setIsMuted(false)} style={{position:'fixed', top:'25px', left:'15px', minWidth:'1rem',maxWidth:'4rem'}}>
        <VolumeOffOutlined sx={{ fontSize: 30 }}></VolumeOffOutlined>
      </Box>
      )}

      <Box style={{position:'fixed', top:'10px', right:'10px'}}>
        <FormControl sx={{ m: 1, minWidth: 20 }} variant="standard" size="small">
          {/* <InputLabel id="demo-select-small">lang</InputLabel> */}
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={userLanguage}
            label="lang"
            onChange={handleChange}
            default={'eng'}
          >
            <MenuItem value={'eng'}>eng</MenuItem>
            <MenuItem value={'hin'}>hin</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}

export default App;
