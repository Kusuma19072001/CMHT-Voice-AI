import { useState, useEffect } from 'react';

export const useAudioSimulation = (isListening: boolean) => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [detectedSpeech, setDetectedSpeech] = useState(false);

  // Simulate audio level fluctuations when listening
  useEffect(() => {
    if (!isListening) {
      setAudioLevel(0);
      setDetectedSpeech(false);
      return;
    }

    // Simulate initial delay before "speech" is detected
    const speechDetectionTimer = setTimeout(() => {
      setDetectedSpeech(true);
    }, 1500);

    // Simulate fluctuating audio levels during speech
    const interval = setInterval(() => {
      if (detectedSpeech) {
        // Simulate natural speech patterns with random fluctuations
        const baseLevel = 0.3;
        const fluctuation = Math.sin(Date.now() / 300) * 0.3;
        const randomness = Math.random() * 0.2;
        
        // Combine for a somewhat natural audio pattern
        const newLevel = baseLevel + fluctuation + randomness;
        
        // Ensure values stay within reasonable range
        setAudioLevel(Math.max(0.1, Math.min(0.9, newLevel)));
      } else {
        // Background noise level before speech is detected
        setAudioLevel(Math.random() * 0.15);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(speechDetectionTimer);
    };
  }, [isListening, detectedSpeech]);

  return { audioLevel, detectedSpeech };
};