import React, { useEffect, useRef } from 'react';
import FloatingControls from './components/FloatingControls';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { useAudioSimulation } from './hooks/useAudioSimulation';
import { useVapiCall } from './hooks/useVapiCall';

function App() {
  const {
    isListening,
    status,
    statusMessage,
    toggleListening
  } = useVoiceAssistant();
  
  const { audioLevel } = useAudioSimulation(isListening);
  const { isCallActive, startCall, endCall } = useVapiCall();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggleListening = async () => {
    if (!isListening) {
      // Start both local state and Vapi call
      await startCall();
    } else {
      // End both local state and Vapi call
      await endCall();
    }
    toggleListening();
  };

  // Stop assistant after saying "thank you"
  useEffect(() => {
    if (
      statusMessage &&
      statusMessage.toLowerCase().includes("thank you") &&
      isListening
    ) {
      endCall();
      toggleListening();
    }
  }, [statusMessage, isListening, endCall, toggleListening]);

  // Timeout to auto-stop listening after 30 seconds
  useEffect(() => {
    if (isListening) {
      timeoutRef.current = setTimeout(() => {
        endCall();
        toggleListening();
      }, 30000); // 30 seconds
    } else if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isListening, endCall, toggleListening]);

  return (
    <div className="fixed inset-0 flex items-center justify-center text-white bg-black">
      <FloatingControls 
        isListening={isListening}
        status={status}
        statusMessage={statusMessage}
        audioLevel={audioLevel}
        onToggleListening={handleToggleListening}
      />
    </div>
  );
}

export default App;