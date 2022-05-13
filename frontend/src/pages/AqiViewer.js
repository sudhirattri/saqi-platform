import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import aqiData from "../data/aqiAtPlaces.json";
import icon1 from "../marker.png";
import { TransitionGroup } from 'react-transition-group'
import { Transition } from 'react-transition-group';
import { Button } from '@mui/material';
import getTranslated from '../constants';
import Box from '@mui/material/Box';
import { Link, useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';
const duration = 300;
const markerIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25],
});
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

export default function AQIViewer(props) {
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
  },[])
  
  const [aqiAtPlace, setaqiAtPlace] = useState(null);
  return (
    <React.Fragment>
      <Transition in={inProp} timeout={duration}>
          {state => (
          <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
          }}>                
            <Box sx={{ display: 'flex', justifyContent: 'space-around' , flexDirection:'column', width:'1.0', height:'100vh'}}>
              <MapContainer
                center={[28.5540811, 77.2950394]}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                  url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />

                {/* <TileLayer 
                      attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
                      url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    /> */}
                {aqiData.map((eachData) => (
                  <Marker
                    key={eachData.Id}
                    position={[eachData.Latitude, eachData.Longitude]}
                    eventHandlers={{
                      click: () => {
                        setaqiAtPlace(eachData);
                      },
                    }}
                    icon={markerIcon}
                  />
                ))}

                {aqiAtPlace && (
                  <Popup
                    position={[aqiAtPlace.Latitude, aqiAtPlace.Longitude]}
                    onClose={() => {
                      setaqiAtPlace(null);
                    }}
                  >
                    <div>
                      <h1>{aqiAtPlace.Location}</h1>
                      <p>PM 1.0 Conc: {aqiAtPlace.PM1_0}</p>
                      <p>PM 2.5 Conc: {aqiAtPlace.PM2_5}</p>
                      <p>PM 10 Conc: {aqiAtPlace.PM10}</p>
                      <p>Temperature: {aqiAtPlace.Temperature}</p>
                      <p>Humidity: {aqiAtPlace.Humidity}</p>
                    </div>
                  </Popup>
                )}
              </MapContainer>
              <Button onClick={() => goToNextPage()}  size="small" className='button-choice'>
                <Typography fontSize={16} fontWeight={600} variant="button">{getTranslated(props.userLanguage,'Next')}</Typography>
              </Button>
            </Box>
          </div>
      )}
      </Transition>
  </React.Fragment>
  );
}
