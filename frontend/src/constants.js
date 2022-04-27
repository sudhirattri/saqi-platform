const eng = {
    "AskLocation":"Where do you live",

    "JarodhaKalan":"Jarodha kalan",
    "Najafgarh":"Najafgarh",
    "NangliDairy":"Nangli Dairy",
    "SanjayColony":"Sanjay Colony",
    "ShaheenBagh":"Shaheen Bagh",
    "Tekhand":"Tekhand",

    "AskCohort":"Tell about yourself",

    "Academy":"Academy",
    "MotherOfYoungKid":"Mother of Young kid(s)",
    "Shopkeeper":"Shopkeeper",
    "SocialWorker":"Social Worker",
    "Student":"Student",
    "Teacher":"Teacher",

    "Next":"Next",

    "WhatAQI":"AQI क्या है?"
}
const hin = {
    "AskLocation":"आप कहाँ रहते हैं",

    "JarodhaKalan":"झरोदा कलां",
    "Najafgarh":"नजफगढ़",
    "NangliDairy":"नांगली डेरी",
    "SanjayColony":"संजय कॉलोनी",
    "ShaheenBagh":"शाहीन बाग",
    "Tekhand":"तेखंड",

    "AskCohort":"कृपया अपने बारे मे बताइये",
    
    "Academy":"अकादमी",
    "MotherOfYoungKid":"छोटे बच्चों की माँ ",
    "Shopkeeper":"दुकानदार",
    "SocialWorker":"समाज सेवक",
    "Student":"छात्र",
    "Teacher":"शिक्षक",

    "Next":"आगे",

    "WhatAQI":"AQI क्या है?"
}
export default function getTranslated(lang, searchKey){
    // console.log("Translation called: ",lang, searchKey)
    if(!(searchKey) in eng)
        return "word not in dict"
    else
        return (lang=='hin')? (hin[searchKey]) : (eng[searchKey])
}