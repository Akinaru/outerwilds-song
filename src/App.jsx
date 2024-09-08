import React, { useState } from 'react';
import useAudioContext from './hooks/useAudioContext';
import AudioControls from './components/AudioControls';
import GlobalVolumeControl from './components/GlobalVolumeControl';
import GlobalControls from './components/GlobalControls';
import "./scss/main.scss";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [globalVolume, setGlobalVolume] = useState(1);
  const [instruments, setInstruments] = useState({
    drums: true,
    whistling: true,
    piano: true,
    harmonica: true,
    flute: true,
    banjo: true,
  });

  const { audioContextRef, audioRefs, gainNodes, smoothToggleVolume } = useAudioContext(instruments, globalVolume);

  const handlePlay = () => {
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    Object.values(audioRefs.current).forEach(audio => {
      if (audio.paused) {
        audio.play();
      }
    });
    setIsPlaying(true);
  };

  const toggleInstrument = (instrument) => {
    setInstruments(prevState => {
      const newState = { ...prevState, [instrument]: !prevState[instrument] };
      smoothToggleVolume(instrument, newState[instrument]);
      return newState;
    });
  };

  const enableAll = () => {
    setInstruments(prevState => {
      Object.keys(prevState).forEach(instrument => {
        smoothToggleVolume(instrument, true);
      });
      return Object.fromEntries(Object.keys(prevState).map(instrument => [instrument, true]));
    });
  };

  const disableAll = () => {
    setInstruments(prevState => {
      Object.keys(prevState).forEach(instrument => {
        smoothToggleVolume(instrument, false);
      });
      return Object.fromEntries(Object.keys(prevState).map(instrument => [instrument, false]));
    });
  };

  const handleGlobalVolumeChange = (value) => {
    setGlobalVolume(value);
    Object.keys(gainNodes.current).forEach(instrument => {
      if (instruments[instrument]) {
        const gainNode = gainNodes.current[instrument];
        const currentTime = audioContextRef.current.currentTime;
        gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
        gainNode.gain.linearRampToValueAtTime(value, currentTime + 0.5);
      }
    });
  };

  return (
    <div>
      <h1>Control the Outer Wilds Instruments</h1>

      {!isPlaying ? (
        <button className="play-button" onClick={handlePlay}>Play Music</button>
      ) : (
        <div>
          <GlobalVolumeControl globalVolume={globalVolume} onVolumeChange={handleGlobalVolumeChange} />
          <AudioControls
            instruments={instruments}
            toggleInstrument={toggleInstrument}
          />
          <GlobalControls enableAll={enableAll} disableAll={disableAll} />
        </div>
      )}
    </div>
  );
}

export default App;
