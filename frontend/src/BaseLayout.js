import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ParticlesBg from 'particles-bg'

import LanguageScreen from './components/LanguageScreen';

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

export default function BaseLayout(props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ mb: 0 }} style={{"height":"100vh"}}>
                <LanguageScreen></LanguageScreen>
            </Container>
            <ParticlesBg num={5} type="square" bg={true} />
        </ThemeProvider>

    );
}