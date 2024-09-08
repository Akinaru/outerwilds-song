import React from 'react';

const GlobalVolumeControl = ({ globalVolume, onVolumeChange }) => {
  return (
    <div className="control">
      <label htmlFor="globalVolume">Global Volume:</label>
      <input
        id="globalVolume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={globalVolume}
        onChange={(e) => onVolumeChange(e.target.value)}
      />
    </div>
  );
};

export default GlobalVolumeControl;
