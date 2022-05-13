import { Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import {data} from '../data/prompts';

import PromptDisplayScreen from './PromptDisplayScreen';
import SelectPromptScreen from './SelectPromptScreen';
import AQIViewer from './AqiViewer';
import RecommendationDisplayScreen from './RecommendationDisplayScreen';

import {
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { typography } from "@mui/system";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export default function PromptsBase(props) {
    const [userHistory, setUserHistory] = useState([]);
    const [currentPrompts, setCurrentPrompts] = useState([]);
    const [displayPrompt, setDisplayPrompt] = useState({});

    function register_choice(prompt){
        console.log("registered",prompt)
        setDisplayPrompt(prompt)
        let allPrompts = Object.keys(data['AQIFaqs']).concat([
            {
                'type':'AQINearMe',
                'name':'AQINearMe'
            },
            {
                'type':'recommendation',
                'name':'recommendation',
            }
        ])
        let newChoices = []
        let numPrompts = 2+getRandomInt(3)
        for (let i = 0; i < numPrompts; i++) {
            let prompt = data['AQIFaqs'][allPrompts[ allPrompts.length * Math.random() << 0]]
            newChoices.push({
                'type':'AQIFaqs',
                'name':prompt['name']
            })
        }
        setCurrentPrompts(newChoices)
    }

    useEffect(()=>{
        setCurrentPrompts([
            {
                'type':'AQIFaqs',
                'name':'HowToUseApp'
            },
            {
                'type':'AQIFaqs',
                'name':'WhatAirPollution'
            },
            {
                'type':'AQIFaqs',
                'name':'WhatAQI'
            },
            {
                'type':'AQINearMe',
                'name':'AQINearMe'
            },
            {
                'type':'recommendation',
                'name':'recommendation',
            }
        ])
      },[])

    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<SelectPromptScreen 
                    currentPrompts = {currentPrompts}
                    userLanguage={props.userLanguage} 
                    spatialLocation={props.spatialLocation} 
                    socialCohort={props.socialCohort}
                    add_line_to_queue={props.add_line_to_queue}
                    cancel_speech={props.cancel_speech}
                    register_choice={register_choice}
                    />} 
                />
                <Route path="/select" element={<SelectPromptScreen 
                    currentPrompts = {currentPrompts}
                    userLanguage={props.userLanguage} 
                    spatialLocation={props.spatialLocation} 
                    socialCohort={props.socialCohort}
                    add_line_to_queue={props.add_line_to_queue}
                    cancel_speech={props.cancel_speech}
                    register_choice={register_choice}
                    />} 
                />
                <Route path="/show" element={<PromptDisplayScreen 
                    userLanguage={props.userLanguage} 
                    spatialLocation={props.spatialLocation} 
                    socialCohort={props.socialCohort}
                    add_line_to_queue={props.add_line_to_queue}
                    cancel_speech={props.cancel_speech}
                    displayPrompt={displayPrompt}
                  />} 
                />
                <Route path="/aqiViewer" element={<AQIViewer 
                    userLanguage={props.userLanguage} 
                    spatialLocation={props.spatialLocation} 
                    socialCohort={props.socialCohort}
                    add_line_to_queue={props.add_line_to_queue}
                    cancel_speech={props.cancel_speech}
                    displayPrompt={displayPrompt}
                  />} 
                />
                <Route path="/recommendation" element={<RecommendationDisplayScreen 
                    userLanguage={props.userLanguage} 
                    spatialLocation={props.spatialLocation} 
                    socialCohort={props.socialCohort}
                    add_line_to_queue={props.add_line_to_queue}
                    cancel_speech={props.cancel_speech}
                    displayPrompt={displayPrompt}
                  />} 
                />
            </Routes>

        </React.Fragment>
)};