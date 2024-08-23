"use client"
import { useState, useEffect } from 'react';
import Map from '../components/Map';

const HomePage = () => {
  const [geojson, setGeojson] = useState(null);

  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [correctStates, setCorrectStates] = useState([1, 7, 14]); // List of correct states
  
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Fetch GeoJSON data for the selected state
    fetch(`./brazil-states.geojson`)
      .then((response) => response.json())
      .then((data) => setGeojson(data))
      .catch((error) => console.error('Error fetching GeoJSON:', error));
  }, []);

  const handleStateClick = (stateId: number) => {
    setSelectedState(stateId);

    if (correctStates.includes(stateId)) {
      setFeedback('Correct!');
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <div>
      <h1>Brazil Geography.games</h1>

      {feedback && <p>{feedback}</p>}

      {geojson && (
        <Map
          geojson={geojson}
          selectedState={selectedState}
          onStateClick={handleStateClick}
          correctStates={correctStates}
        />
      )}
    </div>
  );
};

export default HomePage;


