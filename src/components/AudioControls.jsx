// src/components/AudioControls.jsx
import React from 'react';
import Character from './Character';
import instrumentCharacterMap from '../hooks/instrumentCharacterMap';

const AudioControls = ({ instruments, toggleInstrument, currentTimes }) => {
  // Générer les chemins des images à partir de la map
  const getImagePath = (character) => `/assets/images/${character}.webp`;

  return (
    <div id="audioControls">
      {Object.keys(instruments).map(instrument => (
        <div className="control" key={instrument}>
          <Character
            imageSrc={getImagePath(instrumentCharacterMap[instrument])} // Utilisation de la map ici
            isActive={instruments[instrument]}
            onClick={() => toggleInstrument(instrument)}
          />
        </div>
      ))}
    </div>
  );
};

export default AudioControls;
