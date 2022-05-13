import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate} from "react-router-dom";

import getTranslated from '../constants';
import MasterPrompt from '../components/MasterPrompt';

import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';
import { Button } from '@mui/material';


import Slide from 'react-reveal/Slide';
import parse from 'html-react-parser';
// import saqi_logo from './../../public/saqi.png';
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

export default function RecommendationDisplayScreen(props) {
    const navigate = useNavigate();
    const [inProp, setInProp] = useState(false);
    const [curRecommendation, setCurRecommendation] = useState(false);

    function goToNextPage(){
        console.log("next button pressed")
        // props.setUserLanguage(language)
        navigate('/prompts/select', {replace: true});
    }
    function reloadSamePage(){
        console.log("next button pressed")
        // props.setUserLanguage(language)
        window.location.reload();
        navigate('/prompts/recommendation', {replace: true});
        reloadRecc();
    }
    const coffice = {
        "JarodhaKalan":"Najafgarh-Dhansa Road, Near, Dhansa Bus Stand, Najafgarh, New Delhi, Delhi 110043",
        "Najafgarh":"Najafgarh-Dhansa Road, Near, Dhansa Bus Stand, Najafgarh, New Delhi, Delhi 110043",
        "NangliDairy":"A-99, Bindapur Matiala Rd, Nanhey Park, Uttam Nagar, New Delhi, Delhi 110059",
        "SanjayColony":"G-1/A, Shaheen Bagh, Abul Fazal Enclave-II, Okhla, Phone:  +91 7290033102",
        "ShaheenBagh":"G-1/A, Shaheen Bagh, Abul Fazal Enclave-II, Okhla, Phone:  +91 7290033102",
        "Tekhand":"A, 2/1556, JJ Colony, Madanpur Khadar, New Delhi, Delhi 110076"
    }
    let socialCohort = props.socialCohort;
    if(!socialCohort)
        socialCohort = 'Teacher';
    let spatialLocation = props.spatialLocation;
    if(!spatialLocation)
        spatialLocation = 'Tekhand'
    const recommendations=
    {
        "Academy":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
        ],
        "MotherOfYoungKid":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
            {
                "answer": "जब आपके क्षेत्र में एक्यूआई अधिक हो तो अपने बच्चों को बाहर खेलने न दें।",
                "answer_hin":"Do not let your kids play outside when AQI is high in your area.",
            },
        ],
        "Shopkeeper":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
        ],
        "SocialWorker":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
            {
                "answer": "अपने नजदीकी पार्षद के कार्यालय में जाएँ। आपके पार्षद का कार्यालय यहाँ स्थित है - "+coffice[spatialLocation],
                "answer_hin":"Visit your nearest councillor's office. Your councillor's office is located at -" + coffice[spatialLocation],
            },
        ],
        "Student":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
            {
                "answer": "आपको खराब वायु गुणवत्ता वाले दिनों में इनडोर गेम खेलना पसंद करना चाहिए।",
                "answer_hin":"you should prefer playing indoor games during days with bad air quality.",
            },
        ],
        "Teacher":[
            {
                "answer": "बाहर जाते समय प्रदूषण मास्क पहनें।",
                "answer_hin":"wear pollution masks when going out.",
            },
            {
                "answer": "सुबह या शाम को बाहर न जाएं, बल्कि दोपहर के समय बाहर जाएं।",
                "answer_hin":"Do not go outside in the mornings or the evenings, instead go out during the afternoon.",
            },
            {
                "answer": "हवा की गुणवत्ता खराब होने पर लंबे समय तक और गहन व्यायाम या शारीरिक गतिविधि से बचें।",
                "answer_hin":"avoid prolonged and intensive exercise or physical activity when the air quality bad.",
            },
            {
                "answer": "अपने परिवार और दोस्तों में प्रदूषण और एक्यूआई के बारे में जागरूकता फैलाएं।",
                "answer_hin":"Spread awareness about pollution and AQI to your family and friends.",
            },
            {
                "answer": "जहां तक ​​हो सके पटाखों के प्रयोग से बचें।",
                "answer_hin":"avoid use of fire crackers as much as possible.",
            },
            {
                "answer": "खराब वायु गुणवत्ता वाले दिनों में कक्षाएं रद्द करने पर विचार करें।",
                "answer_hin":"Consider cancelling classes  during days with bad air quality.",
            },
        ]
    }
       
    function reloadRecc(){
        let socialCohort = props.socialCohort;
        if(!socialCohort)
        socialCohort = 'Teacher';
        console.log(recommendations)
        let newChoice = recommendations[socialCohort][ recommendations[socialCohort].length * Math.random() << 0]
        setCurRecommendation(newChoice)
    }
    useEffect(()=>{
        setInProp(true)
        props.cancel_speech()
        console.log("sound prompt")
        props.add_line_to_queue(((props.userLanguage=='hin')?(props.displayPrompt['question_hin']):(props.displayPrompt['question'])),props.userLanguage)
        reloadRecc();
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
                        <React.Fragment>
                            <Box sx={{  flexGrow:1,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                                <Typography sx={{padding:2}} fontWeight={600} variant="h5" color="inherit" ><b>{getTranslated(props.userLanguage,'question_recommendation')}</b></Typography>
                            </Box>
                            <Box sx={{ maxWidth:"50vh", flexGrow:4,  display: 'flex', justifyContent: 'center', flexDirection:'column',alignItems: 'center', textAlign: 'center' }}>
                                <Slide duration={300} right>    
                                    <Typography sx={{padding:2}} fontWeight={600} fontSize={18}  color="inherit">{(props.userLanguage=='hin')?(curRecommendation['answer_hin']):(props.displayPrompt[curRecommendation['answer']])}</Typography>
                                </Slide >
                            </Box>
                            
                        </React.Fragment>
                        </Box>
                        <Box sx={{ flexGrow:1, display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center' }}>
                            <Button onClick={() => goToNextPage()}  size="small" className='button-choice'>
                                <Typography fontSize={16} fontWeight={600} variant="button">{getTranslated(props.userLanguage,'Next')}</Typography>
                            </Button>
                            <Button onClick={() => reloadSamePage()}  size="small" className='button-choice'>
                                <Typography fontSize={16} fontWeight={600} variant="button">{getTranslated(props.userLanguage,'recommendation')}</Typography>
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
            </Transition>
        </React.Fragment>
    );
}