import { React, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import aqiData from "../data/aqiAtPlaces.json";
import icon1 from "../marker.png";
const markerIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25],
});

export default function AQIViewer(props) {
  const [aqiAtPlace, setaqiAtPlace] = useState(null);
  return (
    <MapContainer
      center={[20.593683, 78.962883]}
      zoom={10}
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
  );
}
