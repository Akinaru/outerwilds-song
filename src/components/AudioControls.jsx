// src/components/AudioControls.jsx
import React from 'react';
import Character from './Character';

const AudioControls = ({ instruments, toggleInstrument, currentTimes }) => {
  const instrumentImages = {
    drums: '/assets/images/solanum.webp',
    whistling: '/assets/images/feldspath.webp',
    piano: '/assets/images/gabbro.webp',
    harmonica: '/assets/images/riebeck.webp',
    flute: '/assets/images/esker.webp',
    banjo: '/assets/images/chail.webp',
  };

  return (
    <div id="audioControls">
      {Object.keys(instruments).map(instrument => (
        <div className="control" key={instrument}>
          <Character
            imageSrc={instrumentImages[instrument]}
            isActive={instruments[instrument]}
            onClick={() => toggleInstrument(instrument)}
          />
        </div>
      ))}
    </div>
  );
};

export default AudioControls;
