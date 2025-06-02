import { useState, useEffect, useCallback } from 'react';

export type Status = 'idle' | 'listening' | 'processing' | 'responding';

interface UseVoiceAssistantReturn {
  isListening: boolean;
  status: Status;
  statusMessage: string;
  toggleListening: () => void;
}

export const useVoiceAssistant = (): UseVoiceAssistantReturn => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [statusMessage, setStatusMessage] = useState('Looking for a room or professor? Just ask me!');

  useEffect(() => {
    if (!isListening) {
      setStatus('idle');
      setStatusMessage('Looking for a room or professor? Just ask me!');
      return;
    }

    setStatus('listening');
    setStatusMessage('Listening to your request...');

    const processingTimeout = setTimeout(() => {
      setStatus('processing');
      setStatusMessage('Processing your request...');
      
      setTimeout(() => {
        if (isListening) {
          setStatus('listening');
          setStatusMessage('Listening to your request...');
        }
      }, 1500);
    }, 3000);

    return () => {
      clearTimeout(processingTimeout);
    };
  }, [isListening]);

  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
  }, []);

  return {
    isListening,
    status,
    statusMessage,
    toggleListening
  };
};