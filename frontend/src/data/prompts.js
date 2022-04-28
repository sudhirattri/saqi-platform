export const data =  {
    'AQIFaqs':[
        {
            "name":"WhatAQI",
            "question":"What is AQI?",
            "question_hin":"AQI क्या है?",
            "answer":"Answer to what is AQI",
            "answer_hin":"AQI क्या है का answer"
        }
    ],
    // Use placeholders for location e.g.   "_location"
    'AQINearMe':
    {
        "sparql_query":"query",
        "endpoint":"url"
    },
    'PlayInteractiveQuiz':
    [
        {
            "name":"WhatAQI",
            "question":"What is AQI?",
            "question_hin":"AQI क्या है?",
            "options":['a','b','c','d'],
            "options_hin":['a','b','c','d'],
            "answer":0
        }
    ],
    // Use placeholders for location e.g. "_location"
    'PollutionSourcesNearMe':
    {
        "sparql_query":"query",
        "endpoint":"url"
    },
    // View AQI Readings
    'ViewAQIReadings':
    {
        "sparql_query":"query",
        "endpoint":"url"
    },
    // View AQI Readings
    'LocalPerceptionNearMe':
    {
        "sparql_query":"query",
        "endpoint":"url"
    },
    // View AQI Readings
    'WhatCanBeDone':
    [
        {
            "name":"Reccommendations",
            "answer":"Visit office nearby",
            "answer_hin":"visit office nearby",
            "special_jump":{
                "type":"LocalPerceptionNearMe",
                "name":"councillor's office list"
            }
        }
    ]
}