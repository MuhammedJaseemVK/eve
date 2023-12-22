import React, { useState } from 'react';
import Map from './components/Map';

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat:28.7041,
    lng:77.1025
  })
  return (<Map selectedLocation={selectedLocation} />);
}

export default App;
