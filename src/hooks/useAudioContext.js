import { useRef, useEffect } from 'react';

const useAudioContext = (instruments, globalVolume) => {
  const audioContextRef = useRef(null);
  const audioRefs = useRef({});
  const gainNodes = useRef({});

  useEffect(() => {
    if (!audioContextRef.current) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const audioFiles = {
        drums: '/assets/songs/drums.mp3',
        whistling: '/assets/songs/whistling.mp3',
        piano: '/assets/songs/piano.mp3',
        harmonica: '/assets/songs/harmonica.mp3',
        flute: '/assets/songs/flute.mp3',
        banjo: '/assets/songs/banjo.mp3',
      };

      Object.keys(audioFiles).forEach(key => {
        const audio = new Audio(audioFiles[key]);
        audio.loop = true;

        const source = audioContext.createMediaElementSource(audio);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = instruments[key] ? globalVolume : 0;

        source.connect(gainNode).connect(audioContext.destination);

        audioRefs.current[key] = audio;
        gainNodes.current[key] = gainNode;
      });
    }
  }, [globalVolume]);

  const smoothToggleVolume = (instrument, enabled) => {
    const gainNode = gainNodes.current[instrument];
    const currentTime = audioContextRef.current.currentTime;
    const fadeTime = 0.5;

    gainNode.gain.cancelScheduledValues(currentTime);
    if (enabled) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(globalVolume, currentTime + fadeTime);
    } else {
      gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
      gainNode.gain.linearRampToValueAtTime(0, currentTime + fadeTime);
    }
  };

  return { audioContextRef, audioRefs, gainNodes, smoothToggleVolume };
};

export default useAudioContext;
