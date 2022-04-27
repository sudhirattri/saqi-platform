import React, { useEffect, useState } from 'react';
import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ParticlesBg from 'particles-bg'

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
import PromptScreen from './pages/PromptScreen';

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
  const [userLanguage, setUserLanguage] = React.useState(null);

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
                />} />
                <Route path="splash" element={<SplashScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                />} />
                <Route path="lang" element={<LanguageScreen
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  setUserLanguage={changeLang}/>} />
                <Route path="spatial" element={<SpatialLocationScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort}
                  setSpatialLocation={setSpatialLocation}/>} />
                <Route path="social" element={<SocialCohortScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort} 
                  setSocialCohort={setSocialCohort}/>} />
                <Route path="prompt" element={<PromptScreen 
                  userLanguage={userLanguage} 
                  spatialLocation={spatialLocation} 
                  socialCohort={socialCohort} />} />
            </Routes>
        </BrowserRouter>
      </Container>
      <ParticlesBg num={5} type="square" bg={true} />
      
    </ThemeProvider>
  );
}

export default App;
