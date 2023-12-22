import React from 'react';
import "leaflet/dist/leaflet.css"
import {MapContainer,TileLayer} from 'react-leaflet';

function Map() {
  return (
    <MapContainer center={[48.8566,2.3522]} zoom={13} style={{height:'100vh'}}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  )
}

export default Map