import { writable, derived } from 'svelte/store'

export const GlobalLanguage = writable('Eng')
export const SpatialLocation = writable('JarodhaKalan')
export const SocialCohort = writable('Academy')
export const IsMuted = writable(false)

const eng = {
    NextPage: "Go to next page",
    AskLocation: "Where do you live",

    JarodhaKalan: "Jarodha kalan",
    Najafgarh: "Najafgarh",
    NangliDairy: "Nangli Dairy",
    SanjayColony: "Sanjay Colony",
    ShaheenBagh: "Shaheen Bagh",
    Tekhand: "Tekhand",

    AcknowledgeLocation: "You have selected",

    AskCohort: "Tell us about yourself",

    Academy: "Academy",
    MotherOfYoungKid: "Mother of Young kid(s)",
    Shopkeeper: "Shopkeeper",
    SocialWorker: "Social Worker",
    Student: "Student",
    Teacher: "Teacher",

    AcknowledgeCohort: "You have selected",

    Next: "show me more",

    WhatAQI: "AQI क्या है?",
    TestQuestion: "What is AQI",
    TestAnswer:
        "The air quality index (AQI) is an index for reporting air quality on a daily basis. It is a measure of how air pollution affects one's health within a short time period. The purpose of the AQI is to help people know how the local air quality impacts their health. The higher the AQI value, the greater the level of air pollution and the greater the health concerns. The concept of AQI has been widely used in many developed countries for over the last three decades. AQI quickly disseminates air quality information in real-time.",

    nextPromptTitle: "what would you like to see next",

    prompt1: "What is the AQI near my place?",
    prompt2: "How is air pollution generated?",
    prompt3: "What is the reason for Air pollution in delhi?",

    lang: "english",

    SplashMessage: "Hello",
    ChooseLanguage: "Choose Language",

    recommendation: "More recommendations",
    question_recommendation: "What should I do?",
    GoBack: "Go back to start"


};
const hin = {
    NextPage: "अगले पेज पर जाएं",
    question_recommendation: "मुझे क्या करना चाहिए?",
    recommendation: "मुझे और सलाह दो",

    AskLocation: "आप कहाँ रहते हैं",

    JarodhaKalan: "झरोदा कलां",
    Najafgarh: "नजफगढ़",
    NangliDairy: "नांगली डेरी",
    SanjayColony: "संजय कॉलोनी",
    ShaheenBagh: "शाहीन बाग",
    Tekhand: "तेखंड",

    AcknowledgeLocation: "आपके द्वारा चयनित स्थान",

    AskCohort: "कृपया अपने बारे मे बताइये",

    Academy: "अकादमी",
    MotherOfYoungKid: "छोटे बच्चों की माँ ",
    Shopkeeper: "दुकानदार",
    SocialWorker: "समाज सेवक",
    Student: "छात्र",
    Teacher: "शिक्षक",

    AcknowledgeCohort1: "आप एक ",
    AcknowledgeCohort2: "आप छोटे बच्चों की माँ हैं",
    AcknowledgeCohort3: "आप अकादमी से जुड़े हुए हैं",

    Next: "कुछ और दिखाइए",

    WhatAQI: "AQI क्या है?",
    TestQuestion: "AQI क्या है?",
    TestAnswer:
        "वायु गुणवत्ता सूचकांक (AQI) दैनिक आधार पर वायु गुणवत्ता की रिपोर्ट करने के लिए एक सूचकांक है। यह इस बात का पैमाना है कि वायु प्रदूषण कम समय में किसी के स्वास्थ्य को कैसे प्रभावित करता है। AQI का उद्देश्य लोगों को यह जानने में मदद करना है कि स्थानीय वायु गुणवत्ता उनके स्वास्थ्य को कैसे प्रभावित करती है। एक्यूआई मान जितना अधिक होगा, वायु प्रदूषण का स्तर उतना ही अधिक होगा और स्वास्थ्य संबंधी चिंताएं भी उतनी ही अधिक होंगी। पिछले तीन दशकों में कई विकसित देशों में AQI की अवधारणा का व्यापक रूप से उपयोग किया गया है। AQI वास्तविक समय में वायु गुणवत्ता की जानकारी को तुरंत प्रसारित करता है।",

    nextPromptTitle: "आप आगे क्या देखना चाहेंगे",
    prompt1: "मेरे घर के पास AQI क्या है?",
    prompt2: "वायु प्रदुषण कैसे उत्पन्न होता है?",
    prompt3: "क्या है दिल्ली में वायु प्रदूषण का कारण?",

    lang: "हिन्दी",

    SplashMessage: "नमस्कार",
    ChooseLanguage: "भाषा चुनें",

    GoBack: "दोबारा शुरू करें"
};

export const Constants = derived(
    GlobalLanguage,
    ($GlobalLanguage) => {
        return $GlobalLanguage == "Eng" ? eng : hin
    }
)